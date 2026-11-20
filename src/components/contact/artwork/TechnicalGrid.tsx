"use client";

import React from "react";

export function TechnicalGrid() {
  return (
    <div
      id="contact-technical-grid"
      className="absolute inset-0 pointer-events-none select-none overflow-hidden will-change-transform"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 1200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full opacity-45"
      >
        <defs>
          {/* 80px Repeating Technical Dot Matrix */}
          <pattern
            id="tech-dots"
            x="0"
            y="0"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="40" cy="40" r="1" fill="#77776F" fillOpacity="0.35" />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#tech-dots)" />

        {/* Major Horizontal Construction Guidelines */}
        <line x1="0" y1="120" x2="1440" y2="120" stroke="#292929" strokeWidth="1" strokeDasharray="4 8" />
        <line x1="0" y1="480" x2="1440" y2="480" stroke="#292929" strokeWidth="1" />
        <line x1="0" y1="840" x2="1440" y2="840" stroke="#292929" strokeWidth="1" strokeDasharray="6 6" />

        {/* Major Vertical Column Alignments */}
        <line x1="120" y1="0" x2="120" y2="1200" stroke="#292929" strokeWidth="1" strokeDasharray="4 8" />
        <line x1="720" y1="0" x2="720" y2="1200" stroke="#292929" strokeWidth="1" />
        <line x1="1320" y1="0" x2="1320" y2="1200" stroke="#292929" strokeWidth="1" strokeDasharray="4 8" />

        {/* Crosshair Registration Intersections */}
        {[
          { cx: 120, cy: 120 },
          { cx: 720, cy: 120 },
          { cx: 1320, cy: 120 },
          { cx: 120, cy: 480 },
          { cx: 720, cy: 480 },
          { cx: 1320, cy: 480 },
          { cx: 120, cy: 840 },
          { cx: 720, cy: 840 },
          { cx: 1320, cy: 840 },
        ].map((pt, i) => (
          <g key={i} stroke="#D7FF3F" strokeWidth="1" opacity="0.6">
            <line x1={pt.cx - 8} y1={pt.cy} x2={pt.cx + 8} y2={pt.cy} />
            <line x1={pt.cx} y1={pt.cy - 8} x2={pt.cx} y2={pt.cy + 8} />
            <circle cx={pt.cx} cy={pt.cy} r="2" fill="#D7FF3F" />
          </g>
        ))}

        {/* Angular Geometric Vectors */}
        <path
          d="M 120 480 L 360 240 L 720 480"
          stroke="#292929"
          strokeWidth="1"
          strokeDasharray="2 4"
          opacity="0.4"
        />
        <circle cx="360" cy="240" r="4" fill="#D7FF3F" opacity="0.4" />
      </svg>
    </div>
  );
}
