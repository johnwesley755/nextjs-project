"use client";

import React from "react";

const MARQUEE_ITEMS = [
  "BRAND IDENTITY",
  "DIGITAL EXPERIENCES",
  "CREATIVE ENGINEERING",
  "RADICAL SIMPLICITY",
  "DESIGN SYSTEMS",
  "CHENNAI / WORLDWIDE",
];

export function KineticMarquee() {
  return (
    <div
      className="relative w-full overflow-hidden border-y border-[#292929] bg-[#101010]/85 backdrop-blur-md py-3.5 select-none z-20"
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee font-bebas text-sm sm:text-base tracking-[0.22em] text-[#77776F] uppercase items-center will-change-transform">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
          <div key={idx} className="flex items-center gap-6 mx-6">
            <span className="hover:text-[#F2F0E9] transition-colors duration-200">{item}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D7FF3F]" />
          </div>
        ))}
      </div>
    </div>
  );
}
