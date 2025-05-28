"use client";

import React from "react";
import { RainbowKitCustomConnectButton } from "./scaffold-eth";
import Link from "next/link";
import { useAccount } from "wagmi";

// 🔒 Ovde hardkoduješ dozvoljene adrese
const ISSUERS = [
  "0xfa65490C296Bfc0A053EA828EA3069718f4478b6"
];

const CITIZENS = [
  "0x50278E3357f748298df487C96De4C5072142a073",
  "0x62b33F366fC312d6F07ECb53Bb4b07884799f0Eb"
];

export default function Navbar() {
  const { address, isConnected } = useAccount();

  // ↓ Normalize adrese zbog sigurnosti (lowercase)
  const normalizedAddress = address?.toLowerCase();
  const isIssuer = normalizedAddress && ISSUERS.map(a => a.toLowerCase()).includes(normalizedAddress);
  const isCitizen = normalizedAddress && CITIZENS.map(a => a.toLowerCase()).includes(normalizedAddress);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo i naziv */}
        <div className="flex items-center gap-3">
          {/*<img src="/leaf.png" alt="IDGreenChain Logo" className="h-12 w-12 -my-2" />*/ }
          <Link href="/" className="text-[#1A237E] font-bold text-3xl">
            GreenChainID
          </Link>
        </div>

        {/* Navigacija i dugme */}
        <div className="flex items-center gap-6 ml-auto">
          <Link href="/home" className="text-gray-700 hover:text-[#1A237E] font-medium">
            Home
          </Link>
          {isCitizen && (
            <Link href="/dashboard" className="text-gray-700 hover:text-[#1A237E] font-medium">
              Dashboard
            </Link>
          )}
          {isIssuer && (
            <Link href="/issuer-requests" className="text-gray-700 hover:text-[#1A237E] font-medium">
              Identity Requests
            </Link>
          )}
          <RainbowKitCustomConnectButton />
        </div>
      </div>
    </nav>
  );
}
