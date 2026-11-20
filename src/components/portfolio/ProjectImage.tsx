"use client";

import React from "react";
import Image from "next/image";

interface ProjectImageProps {
  src: string;
  alt: string;
  aspectRatio: string;
  category: string;
  number: string;
}

export function ProjectImage({
  src,
  alt,
  aspectRatio,
  category,
  number,
}: ProjectImageProps) {
  return (
    <div
      className={`group/img relative w-full ${aspectRatio} overflow-hidden rounded-xs border border-[#292929] bg-[#161616] shadow-xl select-none`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 840px"
        className="object-cover grayscale-[20%] contrast-[1.08] brightness-90 group-hover/img:scale-[1.03] group-hover/img:grayscale-0 group-hover/img:brightness-100 transition-[transform,filter] duration-700 ease-out"
      />

      {/* Subtle bottom vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#101010]/70 via-transparent to-transparent pointer-events-none" />

      {/* Top Left Corner Tag */}
      <div className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-[#101010]/85 backdrop-blur-xs border border-[#292929] font-grotesk text-[11px] font-semibold tracking-wider text-[#F2F0E9]">
        <span className="text-[#D7FF3F] mr-1.5">{number}</span>
        <span>{category}</span>
      </div>
    </div>
  );
}
