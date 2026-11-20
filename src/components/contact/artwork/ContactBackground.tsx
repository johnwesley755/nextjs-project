"use client";

import React from "react";
import { TechnicalGrid } from "./TechnicalGrid";
import { OutlineWordmark } from "./OutlineWordmark";
import { ArchitecturalIllustration } from "./ArchitecturalIllustration";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";

export function ContactBackground() {
  return (
    <div
      className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* Layer 0: Real Architectural Ambient Video Loop */}
      <BackgroundVideo
        srcMp4="/videos/contact-ambient-loop.mp4"
        poster="/images/backgrounds/contact-ambient-poster.webp"
        opacity="opacity-45"
        scrimClassName="bg-gradient-to-t from-[#101010] via-[#101010]/60 to-[#101010]"
      />

      {/* Layer 1: Technical Construction Grid & Coordinate Matrix */}
      <TechnicalGrid />

      {/* Layer 2: Monumental Outline Typography */}
      <OutlineWordmark />

      {/* Layer 3: Architectural Vector Illustrations & Peripheral Calibration */}
      <ArchitecturalIllustration />

      {/* Layer 4: Atmospheric Edge Fade & Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#101010] via-transparent to-[#101010] opacity-75" />
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#101010] to-transparent opacity-80" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#101010] to-transparent opacity-80" />
    </div>
  );
}
