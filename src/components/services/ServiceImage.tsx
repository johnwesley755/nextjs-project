"use client";

import React from "react";
import Image from "next/image";

interface ServiceImageProps {
  src: string;
  alt: string;
  aspectRatio: string;
  number: string;
}

export function ServiceImage({
  src,
  alt,
  aspectRatio,
  number,
}: ServiceImageProps) {
  return (
    <div
      className={`group/img relative w-full ${aspectRatio} overflow-hidden rounded-xs border border-[#101010]/15 bg-[#E2DFD6] shadow-sm select-none`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 720px"
        className="object-cover contrast-[1.05] brightness-95 group-hover/img:scale-[1.03] transition-transform duration-700 ease-out"
      />

      {/* Subtle paper tonal scrim */}
      <div className="absolute inset-0 bg-[#101010]/10 pointer-events-none group-hover/img:opacity-0 transition-opacity duration-500" />

      {/* Top Corner Technical Index */}
      <div className="absolute top-3 left-3 z-10 px-2 py-0.5 bg-[#F2F0E9]/90 backdrop-blur-xs border border-[#101010]/10 font-grotesk text-[10px] font-semibold tracking-wider text-[#101010]">
        Capability {number}
      </div>
    </div>
  );
}
