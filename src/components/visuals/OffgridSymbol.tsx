"use client";

import React from "react";

interface OffgridSymbolProps {
  className?: string;
  size?: number;
}

export function OffgridSymbol({ className = "", size = 160 }: OffgridSymbolProps) {
  return (
    <div
      className={`relative select-none pointer-events-none ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full transform transition-transform duration-700 ease-out hover:rotate-90"
      >
        {/* Core Electric Lime Signature Asterisk */}
        <g stroke="#D7FF3F" strokeWidth="20" strokeLinecap="square">
          {/* Vertical Bar */}
          <line x1="100" y1="18" x2="100" y2="182" />
          {/* Horizontal Bar */}
          <line x1="18" y1="100" x2="182" y2="100" />
          {/* Diagonal 45 deg */}
          <line x1="42" y1="42" x2="158" y2="158" />
          {/* Diagonal 135 deg */}
          <line x1="158" y1="42" x2="42" y2="158" />
        </g>

        {/* Central Core Void */}
        <circle cx="100" cy="100" r="18" fill="#101010" />
        <circle cx="100" cy="100" r="6" fill="#D7FF3F" />
      </svg>
    </div>
  );
}
