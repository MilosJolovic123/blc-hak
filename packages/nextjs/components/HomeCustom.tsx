"use client";

import Image from "next/image";
import Navbar from "./Nav";

const sections = [
  {
    title: "Decentralized Identity",
    icon: "/shield.png",
    alt: "Shield icon",
    description: "Own your identity across digital platforms without intermediaries.",
  },
  {
    title: "Blockchain Security",
    icon: "/chain.png",
    alt: "Chain with leaf icon",
    description: "Immutable records ensure trust and tamper-proof verification.",
  },
  {
    title: "Environmental Sustainability",
    icon: "/planet.png",
    alt: "Globe with arrows icon",
    description: "Blockchain supports eco-friendly solutions and transparent impact tracking.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#ECEFF1] text-white flex flex-col items-center justify-center px-4 py-12">
      <Navbar/>
      <h1 className="text-4xl text-[#1A237E] font-bold mb-12 text-center">Welcome to GreenChainID</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl w-full">
        {sections.map((section) => (
          <div
            key={section.title}
            className="flex flex-col items-center text-center bg-[#FFD54F] rounded-2xl p-6 shadow-lg transition-transform hover:scale-105"
          >
            <Image
              src={section.icon}
              alt={section.alt}
              width={80}
              height={80}
              className="mb-4"
            />
            <h2 className="text-xl font-semibold text-[#1A237E]">{section.title}</h2>
            <p className="text-l  mt-2 text-[#1A237E]">{section.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
