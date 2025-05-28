'use client';

import React, { useState, useTransition, type JSX } from "react";
import {
  IdentificationIcon,
  GlobeEuropeAfricaIcon,
  DocumentTextIcon,
  HomeIcon,
  ChevronRightIcon,
  UserIcon,
  CheckBadgeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import Navbar from "./Nav";
import { Requests } from "./Requests";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import IdentityDetails from "./IdentityDetails";
import { IdentityRequestModal } from "./IdentityRequestModal";

const documents = [
  { name: "ID Card", icon: IdentificationIcon },
  { name: "Passport", icon: GlobeEuropeAfricaIcon },
  { name: "Driver's licence", icon: DocumentTextIcon },
  { name: "Proof of residence", icon: HomeIcon },
];

const documentDetails: Record<string, JSX.Element> = {
  "ID Card": <IdentityDetails />,
  "Passport": (
    <>
      <p>
        <strong>Ime:</strong> Miloš Jovanović
      </p>
      <p>
        <strong>Broj pasoša:</strong> 123456789
      </p>
      <p>
        <strong>Država:</strong> Srbija
      </p>
      <p>
        <strong>Datum isteka:</strong> 15.06.2031
      </p>
      <p>
        <strong>Izdato:</strong> 15.06.2021
      </p>
    </>
  ),
  "Driver's licence": (
    <>
      <p>
        <strong>Ime:</strong> Miloš Jovanović
      </p>
      <p>
        <strong>Broj dozvole:</strong> SRB987654
      </p>
      <p>
        <strong>Kategorije:</strong> B
      </p>
      <p>
        <strong>Važi do:</strong> 01.01.2030
      </p>
      <p>
        <strong>Izdato od:</strong> MUP Srbije
      </p>
    </>
  ),
  "Proof of residence": (
    <>
      <p>
        <strong>Ime:</strong> Miloš Jovanović
      </p>
      <p>
        <strong>Adresa:</strong> Nemanjina 4, Beograd
      </p>
      <p>
        <strong>Grad:</strong> Beograd
      </p>
      <p>
        <strong>Poštanski broj:</strong> 11000
      </p>
      <p>
        <strong>Izdata:</strong> 01.02.2024
      </p>
    </>
  ),
};

function EcoBadge() {
  return (
    <div className="absolute top-20 right-6 bg-white rounded-full px-4 py-2 shadow flex items-center gap-2 text-sm text-lime-700 font-semibold">
      <CheckBadgeIcon className="w-5 h-5 text-lime-600" />
      0,04 kg
    </div>
  );
}

export default function Dashboard() {
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const testUserAddress = "0x50278E3357f748298df487C96De4C5072142a073";

  const { data: identity, isLoading } = useScaffoldReadContract({
    contractName: "DigitalIdentity",
    functionName: "getIdentity",
    args: [testUserAddress],
  });

  return (
    <div className="min-h-screen bg-[#ECEFF1] relative px-4 py-6">
      <Navbar />
      <EcoBadge />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 pt-20 items-start">
        {/* LEVA KOLONA – Dokumenti */}
        <div className="bg-white p-6 rounded-2xl shadow-lg max-h-screen overflow-auto">
          <div className="text-xl font-semibold text-[#1A237E] mb-4 text-center">
            Welcome, citizen.
          </div>

          <div className="text-[#1A237E] text-base font-medium mb-4">
            My documents
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {documents.map(({ name, icon: Icon }) => (
              <div
                key={name}
                onClick={() => startTransition(() => setSelectedDoc(name))}
                className="bg-[#90CAF9] rounded-xl p-4 h-36 flex flex-col items-center justify-center text-[#1A237E] hover:bg-[#64B5F6] transition-colors cursor-pointer"
              >
                <Icon className="w-8 h-8 mb-2 text-[#1A237E]" />
                <span className="text-sm font-medium text-center leading-tight">
                  {name}
                </span>
              </div>
            ))}
          </div>

          {/* <div className="flex items-center justify-between p-4 bg-lime-50 rounded-xl cursor-pointer mb-4">
            <span className="text-base text-lime-800 font-medium">Zahtevi za deljenje</span>
            <ChevronRightIcon className="w-5 h-5 text-lime-600" />
          </div> */}

          <div className="p-6">
            {/* Modal komponenta */}
            <IdentityRequestModal />
          </div>

          <div className="flex items-center justify-start gap-2 text-base text-[#1A237E] px-2">
            <UserIcon className="w-6 h-6 text-[#1A237E]" />
            <span>My account</span>
          </div>
        </div>

        {/* SREDNJA KOLONA – Zahtevi */}
        <div>
          <Requests />
        </div>

        {/* DESNA KOLONA – Detalji dokumenta */}
        {selectedDoc && (
          <div className="bg-white p-6 rounded-2xl shadow-lg animate-slide-in max-h-[calc(100vh-20rem)] overflow-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-[#1A237E]">
                {selectedDoc}
              </h2>
              <button onClick={() => setSelectedDoc(null)}>
                <XMarkIcon className="w-6 h-6 text-[#1A237E]" />
              </button>
            </div>
            <div className="text-[#1A237E] space-y-2 text-sm">
              {documentDetails[selectedDoc]}
            </div>
            <button className="mt-6 w-full bg-lime-600 text-white py-3 rounded-xl text-sm hover:bg-[#1A237E] transition-all">
              Verify the document
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
