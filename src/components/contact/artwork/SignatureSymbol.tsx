"use client";

import React from "react";

interface SignatureSymbolProps {
  size?: number;
  className?: string;
}

export function SignatureSymbol({
  className = "",
}: SignatureSymbolProps) {
  return (
    <div
      id="contact-signature-symbol"
      className={`group relative pointer-events-auto cursor-pointer select-none will-change-transform ${className}`}
      aria-label="OFFGRID Kinetic Signature Symbol"
      role="img"
    >
      <div className="relative w-48 h-48 sm:w-60 sm:h-60 lg:w-72 lg:h-72 transition-transform duration-500 group-hover:scale-105">
        <svg
          viewBox="0 0 320 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)]"
        >
          {/* Subtle Outer Calibration Ring */}
          <circle
            cx="160"
            cy="160"
            r="148"
            stroke="#292929"
            strokeWidth="1"
            strokeDasharray="4 6"
            className="group-hover:stroke-[#D7FF3F]/40 transition-colors duration-300"
          />
          <circle
            cx="160"
            cy="160"
            r="110"
            stroke="#292929"
            strokeWidth="1"
            className="opacity-40"
          />

          {/* Coordinate Crosshairs */}
          <line x1="160" y1="6" x2="160" y2="314" stroke="#292929" strokeWidth="1" />
          <line x1="6" y1="160" x2="314" y2="160" stroke="#292929" strokeWidth="1" />

          {/* 8-Point Monolithic Editorial Asterisk */}
          <g className="transition-transform duration-700 ease-out">
            {/* Primary Vertical Column */}
            <rect x="150" y="32" width="20" height="256" fill="#F2F0E9" />

            {/* Primary Horizontal Crossbar */}
            <rect x="32" y="150" width="256" height="20" fill="#F2F0E9" />

            {/* Diagonal Acute Blades (45° and -45°) */}
            <rect
              x="151"
              y="44"
              width="18"
              height="232"
              fill="#F2F0E9"
              className="opacity-95"
              transform="rotate(45 160 160)"
            />
            <rect
              x="151"
              y="44"
              width="18"
              height="232"
              fill="#F2F0E9"
              className="opacity-95"
              transform="rotate(-45 160 160)"
            />

            {/* Architectural Charcoal Negative Cutout Core */}
            <circle cx="160" cy="160" r="42" fill="#101010" />

            {/* Signature Electric Lime Interlocking Diamond */}
            <polygon
              points="160,130 190,160 160,190 130,160"
              fill="#D7FF3F"
              stroke="#101010"
              strokeWidth="4"
              className="group-hover:rotate-45 origin-center transition-transform duration-500 ease-out"
            />

            {/* Center Focal Pin */}
            <circle cx="160" cy="160" r="6" fill="#101010" />
          </g>

          {/* Accent Registration Marks */}
          <g stroke="#D7FF3F" strokeWidth="1.5">
            <line x1="160" y1="10" x2="160" y2="22" />
            <line x1="160" y1="298" x2="160" y2="310" />
            <line x1="10" y1="160" x2="22" y2="160" />
            <line x1="298" y1="160" x2="310" y2="160" />
          </g>
        </svg>

        {/* Small Technical Label Overlay (Sentence Case - No Uppercase) */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 font-grotesk text-[10px] font-medium tracking-wider text-[#77776F] whitespace-nowrap bg-[#101010] px-2 py-0.5 border border-[#292929]">
          Kinetic mark // 03-OG
        </div>
      </div>
    </div>
  );
}
