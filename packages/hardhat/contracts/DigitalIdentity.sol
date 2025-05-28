// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract DigitalIdentity {
    // --- Roles & State ---
    address public constant issuer = 0xfa65490C296Bfc0A053EA828EA3069718f4478b6;
    uint256 private nextRequestId;

    constructor() {
        nextRequestId = 1;
    }

    enum RequestStatus { Pending, Approved, Rejected }

    struct Request {
        uint256 id;
        address citizen;
        string fullName;
        uint256 dateOfBirth;
        string citizenship;
        RequestStatus status;
    }

    // Mappings for requests
    mapping(uint256 => Request) public requests;
    mapping(address => uint256[]) public citizenRequestIds;

    // Mapping for issued identities
    struct Identity {
        string fullName;
        uint256 dateOfBirth;
        uint256 dateOfExpiry;
        string citizenship;
        bool exists;
    }
    mapping(address => Identity) private identities;

    // --- Events ---
    event RequestSubmitted(uint256 indexed requestId, address indexed citizen);
    event RequestApproved(uint256 indexed requestId, address indexed citizen);
    event RequestRejected(uint256 indexed requestId, address indexed citizen);
    event IdentityCreated(address indexed citizen, string fullName);

    // --- Modifiers ---
    modifier onlyIssuer() {
        require(msg.sender == issuer, "Caller is not the authorized issuer");
        _;
    }

    // --- Request Workflow ---

    /// @notice Citizen submits a new request for ID issuance
    function submitRequest(
        string calldata fullName,
        uint256 dateOfBirth,
        string calldata citizenship
    ) external {
        uint256 requestId = nextRequestId++;
        requests[requestId] = Request({
            id: requestId,
            citizen: msg.sender,
            fullName: fullName,
            dateOfBirth: dateOfBirth,
            citizenship: citizenship,
            status: RequestStatus.Pending
        });
        citizenRequestIds[msg.sender].push(requestId);
        emit RequestSubmitted(requestId, msg.sender);
    }

    /// @notice Issuer views all pending requests (IDs only)
    function getPendingRequests() external view returns (uint256[] memory) {
        uint256[] memory temp = new uint256[](nextRequestId - 1);
        uint256 count = 0;
        for (uint256 i = 1; i < nextRequestId; i++) {
            if (requests[i].status == RequestStatus.Pending) {
                temp[count++] = i;
            }
        }
        uint256[] memory pending = new uint256[](count);
        for (uint256 j = 0; j < count; j++) {
            pending[j] = temp[j];
        }
        return pending;
    }

    /// @notice Issuer approves a request and issues an identity
    function approveRequest(uint256 requestId, uint256 dateOfExpiry) external onlyIssuer {
        Request storage req = requests[requestId];
        require(req.status == RequestStatus.Pending, "Request not pending");
        req.status = RequestStatus.Approved;

        identities[req.citizen] = Identity({
            fullName: req.fullName,
            dateOfBirth: req.dateOfBirth,
            dateOfExpiry: dateOfExpiry,
            citizenship: req.citizenship,
            exists: true
        });

        emit RequestApproved(requestId, req.citizen);
        emit IdentityCreated(req.citizen, req.fullName);
    }

    /// @notice Issuer rejects a request
    function rejectRequest(uint256 requestId) external onlyIssuer {
        Request storage req = requests[requestId];
        require(req.status == RequestStatus.Pending, "Request not pending");
        req.status = RequestStatus.Rejected;
        emit RequestRejected(requestId, req.citizen);
    }

    // --- Identity Access ---

    function identityExists(address user) external view returns (bool) {
        return identities[user].exists;
    }

    function getMyIdentity() external view returns (Identity memory) {
        require(identities[msg.sender].exists, "Identity does not exist");
        return identities[msg.sender];
    }

    function getIdentity(address user) external view returns (Identity memory) {
        require(identities[user].exists, "Identity does not exist");
        return identities[user];
    }
}
