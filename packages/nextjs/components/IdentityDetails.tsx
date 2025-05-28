'use client';

import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
export default function IdentityDetails() {
    const testUserAddress = "0x50278E3357f748298df487C96De4C5072142a073";
  
    const { data: identity, isLoading } = useScaffoldReadContract({
      contractName: "DigitalIdentity",
      functionName: "getIdentity",
      args: [testUserAddress],
    });
  
    if (isLoading) return <div>Loading identity...</div>;
    if (!identity) return <div>No identity found.</div>;
  
    return (
      <div className="space-y-2">
        <p><strong>Name and Lastname: </strong> {identity.fullName}</p>
        <p><strong>Birth date: </strong> {new Date(Number(identity.dateOfBirth) * 1000).toLocaleDateString()}</p>
        <p><strong>Valid trough: </strong> {new Date(Number(identity.dateOfExpiry) * 1000).toLocaleDateString()}</p>
        {/* <p><strong>Fotografija:</strong></p>
        <img
          src={`https://ipfs.io/ipfs/${identity.ipfsPhotoHash}`}
          alt="Fotografija lične karte"
          className="w-32 h-32 rounded-lg shadow"
        /> */}
        <p><strong>Citizenship: </strong>{identity.citizenship}</p>
      </div>
    );
  }
  