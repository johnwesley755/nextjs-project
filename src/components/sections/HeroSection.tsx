"use client";

import React, { useEffect, useRef } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";
import { KineticMarquee } from "@/components/hero/KineticMarquee";
import { MorphingWord } from "@/components/hero/MorphingWord";
import { StudioMockup } from "@/components/hero/StudioMockup";
import gsap from "gsap";

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Initial Line Masked Reveals
      gsap.from(".hero-kinetic-line", {
        y: "115%",
        skewY: 5,
        opacity: 0,
        duration: 1.2,
        stagger: 0.14,
        ease: "power4.out",
        delay: 0.15,
      });

      // 2. Narrative, CTAs & Studio Mockup Fade In
      gsap.from(".hero-fade-item", {
        y: 25,
        opacity: 0,
        duration: 1.0,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.5,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#101010] text-[#F2F0E9] flex flex-col justify-between overflow-hidden border-b border-[#292929] z-10"
    >
      {/* Real Architectural Ambient Video Loop */}
      <BackgroundVideo
        srcMp4="/videos/hero-ambient-loop.mp4"
        poster="/images/backgrounds/hero-ambient-poster.webp"
        opacity="opacity-50"
        scrimClassName="bg-gradient-to-b from-[#101010]/85 via-[#101010]/40 to-[#101010]"
      />

      {/* Main Centered Stage */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 w-full pt-32 sm:pt-40 lg:pt-44 pb-14 flex-1 flex flex-col items-center justify-center text-center">
        {/* Top Centered Studio Ledger Badge */}
        <div className="hero-fade-item inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[#292929] bg-[#141414]/80 backdrop-blur-md mb-8 font-grotesk text-xs sm:text-[13px] text-[#A8A7A1]">
          <span className="w-2 h-2 rounded-full bg-[#D7FF3F] animate-pulse" />
          <span className="text-[#F2F0E9] font-medium">Independent Creative & Digital Studio</span>
          <span className="text-[#292929]">•</span>
          <span className="text-[#77776F] hidden sm:inline">Chennai — Worldwide</span>
        </div>

        {/* Centered Monumental Kinetic Headline */}
        <h1
          ref={headlineRef}
          className="font-bebas text-[48px] xs:text-[60px] sm:text-[78px] md:text-[96px] lg:text-[112px] xl:text-[128px] tracking-tight leading-[0.88] text-[#F2F0E9] uppercase select-none will-change-transform max-w-7xl mx-auto"
          aria-label="IDEAS BEYOND THE ORDINARY"
        >
          <div className="overflow-hidden py-1">
            <span className="hero-kinetic-line block will-change-transform">
              IDEAS BEYOND
            </span>
          </div>
          <div className="overflow-hidden py-1 flex justify-center items-baseline flex-nowrap whitespace-nowrap">
            <span className="hero-kinetic-line inline-block will-change-transform mr-[0.3em] sm:mr-[0.35em]">
              THE
            </span>
            <span className="hero-kinetic-line inline-block will-change-transform">
              <MorphingWord />
            </span>
          </div>
        </h1>

        {/* Centered Narrative Description */}
        <p className="hero-fade-item font-grotesk text-base sm:text-xl text-[#F2F0E9] font-light leading-relaxed max-w-2xl mx-auto mt-6 sm:mt-8">
          We build distinctive brands, products, and digital experiences for visionary founders and teams who refuse to blend in.
        </p>

        {/* Centered Action CTAs */}
        <div className="hero-fade-item pt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full sm:w-auto">
          <a
            href="#contact"
            className="group inline-flex items-center justify-center gap-3 px-9 py-4 bg-[#D7FF3F] text-[#101010] font-grotesk font-semibold text-xs sm:text-sm tracking-wider rounded-xs hover:bg-[#F2F0E9] transition-colors duration-200 shadow-md"
          >
            <span>Start a project</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <a
            href="#work"
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 border border-[#292929] hover:border-[#D7FF3F] bg-[#101010]/80 text-[#F2F0E9] hover:text-[#D7FF3F] font-grotesk font-medium text-xs sm:text-sm tracking-wider rounded-xs transition-colors duration-200"
          >
            <span>Explore our work</span>
            <ArrowDownRight className="w-4 h-4 text-[#77776F] group-hover:text-[#D7FF3F] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Centered Digital Studio Device Mockup Showcase */}
        <div className="hero-fade-item w-full">
          <StudioMockup />
        </div>
      </div>

      {/* Integrated Continuous Typographic Ribbon */}
      <KineticMarquee />
    </section>
  );
}
