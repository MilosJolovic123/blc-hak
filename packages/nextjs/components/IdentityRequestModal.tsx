'use client';

import { useState } from "react";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export function IdentityRequestModal() {
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [citizenship, setCitizenship] = useState('Serbian');

  const { writeContractAsync, isPending } = useScaffoldWriteContract("DigitalIdentity");

  const handleSubmit = async () => {
    try {
      await writeContractAsync({
        functionName: "submitRequest",
        args: [
          fullName,
          BigInt(Math.floor(new Date(dateOfBirth).getTime() / 1000)),
          citizenship,
        ],
      });
    } catch (e) {
      console.error("Greška pri slanju zahteva:", e);
    }
  };

  return (
    <>
      <label htmlFor="identity-request-modal" className="btn btn-primary">
        Submit a request for an ID card
      </label>

      <input type="checkbox" id="identity-request-modal" className="modal-toggle" />
      <label htmlFor="identity-request-modal" className="modal cursor-pointer">
        <label className="modal-box relative">
          <h3 className="font-bold text-lg">Submit a request for an ID card</h3>

          <input
            type="text"
            placeholder="Name and Lastname"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            className="input input-bordered w-full mt-4"
          />

          <input
            type="date"
            value={dateOfBirth}
            onChange={e => setDateOfBirth(e.target.value)}
            className="input input-bordered w-full mt-4"
          />

          <input
            type="text"
            placeholder="Citizenship"
            value={citizenship}
            onChange={e => setCitizenship(e.target.value)}
            className="input input-bordered w-full mt-4"
          />

          <button
            className="btn btn-accent w-full mt-6"
            onClick={handleSubmit}
            disabled={isPending}
          >
            {isPending ? 'Pending...' : 'Submit a request'}
          </button>

          <label
            htmlFor="identity-request-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
        </label>
      </label>
    </>
  );
}
