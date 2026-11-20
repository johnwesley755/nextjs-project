"use client";

import React from "react";
import Image from "next/image";
import { OffgridSymbol } from "../visuals/OffgridSymbol";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[calc(100vh-5rem)] sm:min-h-[calc(100vh-6rem)] bg-[#101010] text-[#F2F0E9] flex flex-col justify-between overflow-hidden border-b border-[#292929]">
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 w-full pt-8 sm:pt-12 lg:pt-14 pb-12 sm:pb-16 flex-1 flex flex-col justify-between">
        {/* Top Editorial Studio Ledger */}

        {/* 12-Column Asymmetric Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center my-auto">
          {/* Left Column: Monumental Headline & Narrative (Span 7) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Oversized Bebas Neue Headline */}
            <h1 className="font-bebas text-6xl sm:text-8xl md:text-9xl xl:text-[140px] tracking-[0.015em] leading-[0.88] text-[#F2F0E9] uppercase select-none">
              IDEAS <br />
              WITHOUT THE <br />
              ORDINARY<span className="text-[#D7FF3F]">.</span>
            </h1>

            {/* Supporting Description */}
            <p className="font-grotesk text-base sm:text-xl text-[#F2F0E9] max-w-xl font-normal leading-relaxed">
              We build brands, products, and digital experiences for people who refuse to blend in.
            </p>

            {/* Primary & Secondary Action CTAs */}
            <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#D7FF3F] text-[#101010] font-grotesk font-semibold text-xs sm:text-sm tracking-wider rounded-xs hover:bg-[#F2F0E9] transition-colors duration-200 shadow-md"
              >
                <span>Start a project</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#work"
                className="group inline-flex items-center justify-center gap-3 px-7 py-4 border border-[#292929] hover:border-[#D7FF3F] bg-[#101010] text-[#F2F0E9] hover:text-[#D7FF3F] font-grotesk font-medium text-xs sm:text-sm tracking-wider rounded-xs transition-colors"
              >
                <span>Explore our work</span>
                <ArrowDownRight className="w-4 h-4 text-[#77776F] group-hover:text-[#D7FF3F] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Column: Architectural Photography & Signature Symbol (Span 5) */}
          <div className="lg:col-span-5 relative w-full flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[420px] sm:max-w-[460px]">
              {/* Asymmetrical Framed Container */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xs border border-[#292929] bg-[#1a1a1a] shadow-2xl">
                {/* High-Resolution Primary Hero Image */}
                <Image
                  src="/images/hero/hero-monolith.webp"
                  alt="Sculptural architectural monolith"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 460px"
                  className="object-cover grayscale contrast-125 brightness-95 hover:scale-105 transition-transform duration-1000 ease-out"
                />

                {/* Subtle bottom vignette for tonal balance */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-transparent to-transparent opacity-50 pointer-events-none" />
              </div>

              {/* Overlapping Signature OFFGRID® Electric Lime Symbol */}
              <div className="absolute -bottom-7 -left-7 sm:-bottom-9 sm:-left-9 z-30 drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]">
                <OffgridSymbol size={130} />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Clean Studio Colophon & Animated Scroll Indicator */}
        <div className="mt-12 sm:mt-16 pt-6 border-t border-[#292929] flex flex-col sm:flex-row items-center justify-between gap-6 font-grotesk text-xs text-[#77776F]">
          <div className="flex flex-wrap items-center gap-6">
            <span>Offgrid Studio</span>
            <span className="hidden sm:inline text-[#292929]">•</span>
            <span className="text-[#F2F0E9]">All rights reserved © 2026</span>
          </div>

          {/* Minimalist Animated Scroll Indicator */}
          <div className="flex items-center gap-3 text-xs tracking-wide text-[#77776F]">
            <span>Scroll to explore</span>
            <div className="relative w-4 h-9 border border-[#292929] rounded-full flex justify-center p-1 overflow-hidden">
              <span className="w-1 h-2 rounded-full bg-[#D7FF3F] animate-scroll-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
