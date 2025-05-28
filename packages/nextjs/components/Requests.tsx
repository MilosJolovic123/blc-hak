"use client";

import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import React from "react";

export const Requests = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-h-[calc(100vh-8rem)] overflow-auto">
    <div className="mb-4 font-semibold text-[#1A237E] text-lg">Requests for data access</div>

    <div className="bg-[#90CAF9] p-4 rounded-xl shadow flex justify-between items-center">
      <div>
        <div className="font-medium text-[#1A237E]">German Embassy</div>
        <div className="text-sm text-[#1A237E]">Request for data access: ID card</div>
      </div>
      <div className="flex gap-2">
        <button className=" text-black bg-[#FFD54F] px-4 py-2 rounded-xl text-sm ">
          Confirm
        </button>
        <button className="bg-[#D30B07] text-black px-4 py-2 rounded-xl text-sm">
          Deny
        </button>
      </div>
    </div>

    <div className="mt-4 flex items-center text-[#1A237E] text-sm gap-1">
      <CheckBadgeIcon className="w-4 h-4" />
      Validation confirmed
    </div>
  </div>
  )
};

