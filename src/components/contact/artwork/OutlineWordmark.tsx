"use client";

import React from "react";

export function OutlineWordmark() {
  return (
    <div
      id="contact-outline-wordmark"
      className="absolute inset-0 pointer-events-none select-none flex items-center justify-center overflow-hidden z-0 will-change-transform"
      aria-hidden="true"
    >
      <div className="w-full text-center">
        <span
          className="font-bebas text-[20vw] sm:text-[22vw] leading-none tracking-tighter uppercase select-none block"
          style={{
            WebkitTextStroke: "1px rgba(242, 240, 233, 0.045)",
            color: "transparent",
          }}
        >
          OFFGRID®
        </span>
      </div>
    </div>
  );
}
