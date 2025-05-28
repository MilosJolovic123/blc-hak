'use client';

import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import Navbar from "./Nav";

export function IssuerRequests() {
  const { data: pendingIds, isLoading: isLoadingIds } = useScaffoldReadContract({
    contractName: 'DigitalIdentity',
    functionName: 'getPendingRequests',
    chainId: 11155111,
  });

  return (
    <>
      <Navbar />
      <div className="pt-24 px-6">
        <h1 className="text-3xl font-bold mb-6">All ID Requests</h1>
        {isLoadingIds || !pendingIds || !Array.isArray(pendingIds) ? (
          <span className="text-gray-500">Loading the requests...</span>
        ) : pendingIds.length === 0 ? (
//          <RequestCardDummy/>
         <p className="text-gray-500">No new requests</p>

        ) : (
          <div className="space-y-4">
            {pendingIds.map((requestId: bigint) => (
              <RequestCard key={requestId.toString()} requestId={requestId} />
            //<RequestCardDummy/>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function RequestCard({ requestId }: { requestId: bigint }) {

  const { data: req, isLoading } = useScaffoldReadContract({
    contractName: 'DigitalIdentity',
    functionName: 'requests',
    args: [requestId],
    chainId: 11155111,
  });

  const expiryTimestamp = Math.floor(Date.now() / 1000) + 10 * 365 * 24 * 3600;

  const { writeContractAsync: approveRequest, isPending: isApproving } = useScaffoldWriteContract('DigitalIdentity');
  const { writeContractAsync: rejectRequest, isPending: isRejecting } = useScaffoldWriteContract('DigitalIdentity');

  const handleApprove = async () => {
    try {
      await approveRequest(
        {
          functionName: 'approveRequest',
          args: [requestId, BigInt(expiryTimestamp)],
        },
        {
          onBlockConfirmation: txn => console.log('✅ Prihvaćen zahtev:', txn.blockHash),
        }
      );
    } catch (error) {
      console.error('❌ Greška pri prihvatanju:', error);
    }
  };

  const handleReject = async () => {
    try {
      await rejectRequest(
        {
          functionName: 'rejectRequest',
          args: [requestId],
        },
        {
          onBlockConfirmation: txn => console.log('❌ Odbijen zahtev:', txn.blockHash),
        }
      );
    } catch (error) {
      console.error('❌ Greška pri odbijanju:', error);
    }
  };

  if (isLoading || !req) return <div className="pt-2 px-6">Loading #{requestId.toString()}...</div>;

  const [id, fullName, citizenship, dateOfBirth, status, createdAt] = req as [bigint, string, string, bigint, string, number];

  return (
    <div className="border p-4 rounded-lg shadow-lg bg-white text-[#1A237E] ml-10 mr-10">
      <h4 className="font-semibold text-lg mb-2">Request #{requestId.toString()}</h4>
      <p><strong>Name: </strong> {fullName}</p>
      <p><strong>Birth date: </strong> {new Date(Number(dateOfBirth) * 1000).toLocaleDateString()}</p>
      <p><strong>Citizenship:</strong> {citizenship}</p>
      <div className="flex gap-2 mt-4">
        <button className="btn btn-success" onClick={handleApprove} disabled={isApproving}>
          {isApproving ? 'Accepting...' : 'Prihvati'}
        </button>
        <button className="btn btn-error" onClick={handleReject} disabled={isRejecting}>
          {isRejecting ? 'Rejecting...' : 'Odbij'}
        </button>
      </div>
    </div>
  );
}

function RequestCardDummy() {
  // Hardkodovani podaci
  const requestId = BigInt(1);
  const fullName = "John Doe";
  const citizenship = "Serbia";
  const dateOfBirth = BigInt(946684800); // 2000-01-01 u sekundama
  const isApproving = false;
  const isRejecting = false;

  const handleApprove = () => {
    console.log("✅ Approve clicked for request", requestId.toString());
  };

  const handleReject = () => {
    console.log("❌ Reject clicked for request", requestId.toString());
  };

  return (
    <div className="border p-4 rounded-lg shadow-lg bg-white text-black ml-10 mr-10">
      <h4 className="font-semibold text-lg mb-2">Request #{requestId.toString()}</h4>
      <p><strong>Name: </strong> {fullName}</p>
      <p><strong>Birth date: </strong> {new Date(Number(dateOfBirth) * 1000).toLocaleDateString()}</p>
      <p><strong>Citizenship:</strong> {citizenship}</p>
      <div className="flex gap-2 mt-4">
        <button className="btn btn-success" onClick={handleApprove} disabled={isApproving}>
          {isApproving ? 'Accepting...' : 'Accept'}
        </button>
        <button className="btn btn-error" onClick={handleReject} disabled={isRejecting}>
          {isRejecting ? 'Rejecting...' : 'Reject'}
        </button>
      </div>
    </div>
  );
}
