"use client";

import React from "react";

export function ArchitecturalIllustration() {
  return (
    <div
      id="contact-architectural-illustration"
      className="absolute inset-0 pointer-events-none select-none overflow-hidden will-change-transform z-0"
      aria-hidden="true"
    >
      <div className="relative w-full h-full min-h-[900px] flex items-center justify-center">
        <svg
          viewBox="0 0 1440 1100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full opacity-65"
        >
          <defs>
            <linearGradient id="vector-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D7FF3F" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#F2F0E9" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#292929" stopOpacity="0.05" />
            </linearGradient>

            <pattern id="isometric-mesh" width="60" height="103.92" patternUnits="userSpaceOnUse">
              <path
                d="M30 0 L60 51.96 L30 103.92 L0 51.96 Z"
                stroke="#292929"
                strokeWidth="0.5"
                strokeOpacity="0.3"
                fill="none"
              />
            </pattern>
          </defs>

          {/* Isometric Drafting Grid overlay */}
          <rect width="100%" height="100%" fill="url(#isometric-mesh)" />

          {/* --- ILLUSTRATION ASSET 1: Isometric Wireframe Polyhedron (Top Right Peripheral Frame) --- */}
          <g transform="translate(1080, 150)" className="illustration-float-item">
            {/* Outer Hexagonal Bounds */}
            <polygon
              points="0,-100 86,-50 86,50 0,100 -86,50 -86,-50"
              stroke="#F2F0E9"
              strokeWidth="0.75"
              strokeOpacity="0.25"
              fill="none"
            />
            {/* Inner Isometric Cube & Facets */}
            <line x1="0" y1="0" x2="0" y2="100" stroke="#F2F0E9" strokeWidth="0.75" strokeOpacity="0.25" />
            <line x1="0" y1="0" x2="86" y2="-50" stroke="#F2F0E9" strokeWidth="0.75" strokeOpacity="0.25" />
            <line x1="0" y1="0" x2="-86" y2="-50" stroke="#F2F0E9" strokeWidth="0.75" strokeOpacity="0.25" />

            {/* Subtle Drafting Accents */}
            <line x1="-86" y1="-50" x2="86" y2="-50" stroke="#292929" strokeWidth="0.75" strokeDasharray="3 4" />
            <polygon points="0,-10 10,0 0,10 -10,0" fill="#D7FF3F" fillOpacity="0.6" />
          </g>

          {/* --- ILLUSTRATION ASSET 2: Drafting Calibration Arc (Bottom Right Margin) --- */}
          <g transform="translate(1220, 840)" className="illustration-float-item">
            <path
              d="M -180 0 A 180 180 0 0 1 0 -180"
              stroke="#F2F0E9"
              strokeWidth="0.75"
              strokeOpacity="0.2"
              strokeDasharray="4 6"
              fill="none"
            />
            {/* Radial Ticks along the arc */}
            {[0, 15, 30, 45, 60, 75, 90].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              const x1 = -Math.cos(rad) * 172;
              const y1 = -Math.sin(rad) * 172;
              const x2 = -Math.cos(rad) * 188;
              const y2 = -Math.sin(rad) * 188;
              return (
                <line
                  key={deg}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#77776F"
                  strokeWidth="0.75"
                  strokeOpacity="0.4"
                />
              );
            })}
          </g>

          {/* Topographical Contour Streamlines (Bottom Edge Frame) */}
          <path
            d="M 320 950 C 500 900, 700 990, 920 930 C 1100 870, 1280 920, 1440 890"
            stroke="#292929"
            strokeWidth="0.75"
            strokeDasharray="4 6"
            fill="none"
          />
        </svg>
      </div>
    </div>
  );
}
