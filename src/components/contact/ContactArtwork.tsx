"use client";

import React from "react";

interface ContactArtworkProps {
  className?: string;
}

export function ContactArtwork({ className = "" }: ContactArtworkProps) {
  return (
    <div
      className={`relative w-full overflow-hidden select-none pointer-events-none flex items-center justify-start ${className}`}
      aria-hidden="true"
    >
      {/* Precision Blueprint / Technical Grid Canvas */}
      <div
        id="contact-geometric-symbol"
        className="relative z-10 w-60 h-60 sm:w-72 sm:h-72 lg:w-88 lg:h-88 flex items-center justify-center will-change-transform"
      >
        <svg
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
        >
          {/* Subtle Outer Frame & Hairline Guides */}
          <rect
            x="20"
            y="20"
            width="360"
            height="360"
            stroke="#292929"
            strokeWidth="1"
            className="opacity-40"
          />
          <circle
            cx="200"
            cy="200"
            r="175"
            stroke="#292929"
            strokeWidth="1"
            strokeDasharray="3 5"
            className="opacity-50"
          />
          <circle
            cx="200"
            cy="200"
            r="125"
            stroke="#292929"
            strokeWidth="1"
            className="opacity-40"
          />

          {/* Coordinate Crosshairs */}
          <line x1="200" y1="10" x2="200" y2="390" stroke="#292929" strokeWidth="1" />
          <line x1="10" y1="200" x2="390" y2="200" stroke="#292929" strokeWidth="1" />

          {/* Diagonal Ray Guidelines */}
          <line x1="50" y1="50" x2="350" y2="350" stroke="#292929" strokeWidth="0.75" strokeDasharray="4 6" />
          <line x1="350" y1="50" x2="50" y2="350" stroke="#292929" strokeWidth="0.75" strokeDasharray="4 6" />

          {/* Interlocking Monolithic Blades (Paper & Graphite) */}
          <g>
            {/* Primary Vertical Column */}
            <rect x="188" y="45" width="24" height="310" fill="#F2F0E9" />
            
            {/* Primary Horizontal Crossbeam */}
            <rect x="45" y="188" width="310" height="24" fill="#F2F0E9" />

            {/* Diagonal Acute Cross Blades (45-degree rotation) */}
            <rect
              x="189"
              y="60"
              width="22"
              height="280"
              fill="#F2F0E9"
              className="opacity-90"
              transform="rotate(45 200 200)"
            />
            <rect
              x="189"
              y="60"
              width="22"
              height="280"
              fill="#F2F0E9"
              className="opacity-90"
              transform="rotate(-45 200 200)"
            />

            {/* Architectural Charcoal Negative Cutouts */}
            <circle cx="200" cy="200" r="54" fill="#101010" />

            {/* Signature Electric Lime Interlocking Diamond Core */}
            <polygon
              points="200,162 238,200 200,238 162,200"
              fill="#D7FF3F"
              stroke="#101010"
              strokeWidth="5"
            />
            
            {/* Center Monolithic Focal Point */}
            <circle cx="200" cy="200" r="8" fill="#101010" />
          </g>

          {/* Peripheral Precision Registration Marks */}
          <g stroke="#D7FF3F" strokeWidth="1.5">
            <line x1="200" y1="16" x2="200" y2="32" />
            <line x1="200" y1="368" x2="200" y2="384" />
            <line x1="16" y1="200" x2="32" y2="200" />
            <line x1="368" y1="200" x2="384" y2="200" />
          </g>

          {/* Corner Precision Accents */}
          <circle cx="36" cy="36" r="3" fill="#D7FF3F" />
          <circle cx="364" cy="36" r="3" fill="#292929" />
          <circle cx="36" cy="364" r="3" fill="#292929" />
          <circle cx="364" cy="364" r="3" fill="#D7FF3F" />
        </svg>
      </div>

      {/* Layered Technical Coordinate Indices */}
      <div className="absolute bottom-1 left-2 font-grotesk text-[10px] font-medium tracking-wider text-[#77776F]">
        Axis // 03-OG · Ref.842
      </div>
      <div className="absolute top-1 right-2 font-grotesk text-[10px] font-medium tracking-wider text-[#77776F]">
        Edition // 2026.IV
      </div>
    </div>
  );
}
