"use client";

import { useAccount, useConnect } from "wagmi";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LandingPage() {
  const router = useRouter();
  const { isConnected } = useAccount();
  const { connectAsync, connectors } = useConnect();
  const [connecting, setConnecting] = useState(false);

  const handleConnect = async () => {
    if (isConnected) {
      router.push("/home");
      return;
    }

    const connector = connectors.find((c) => c.id === "injected");
    if (!connector) {
      alert("MetaMask connector nije pronađen u wagmi konfiguraciji.");
      return;
    }

    try {
      setConnecting(true);
      await connectAsync({ connector }); // pokušaj bez .ready provere
      router.push("/dashboard");
    } catch (error: unknown) {
      console.error("Connection error:", error);
      alert("Greška pri povezivanju sa MetaMask-om.");
      setConnecting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#ECEFF1] text-white flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-[#1A237E]">GreenChainID</h1>
        <p className="text-lg mb-8 text-[#1A237E]">
          Decentralized digital identity for a sustainable future.
        </p>
        <button
          onClick={handleConnect}
          disabled={connecting}
          className="hover:bg-text-[#FFD54F]  bg-text-[#64B5F6] text-[#1A237E] font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-200 disabled:opacity-50 border-solid border-3 border-[#1A237E]"
        >
          {connecting ? "Connecting..." : "Connect with MetaMask"}
        </button>
      </div>
    </div>
  );
}
