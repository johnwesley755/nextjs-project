"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { OffgridSymbol } from "../visuals/OffgridSymbol";

export function StudioMockup() {
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Rotation angles (clamped to max ±16 degrees for bold, tactile physical impact)
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Dynamic light glare specular tracking (X%, Y%, opacity)
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  // Update physical tilt & optical light sheen with bounds
  const updateTilt = useCallback((targetRotX: number, targetRotY: number, glareX: number, glareY: number, glareOpacity: number) => {
    // Amplified clamp range: ±16 deg for bold, unmistakably visible 3D tilt
    const clampedX = Math.max(-16, Math.min(16, targetRotX));
    const clampedY = Math.max(-16, Math.min(16, targetRotY));

    setRotateX(clampedX);
    setRotateY(clampedY);
    setGlare({
      x: Math.max(0, Math.min(100, glareX)),
      y: Math.max(0, Math.min(100, glareY)),
      opacity: glareOpacity,
    });
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let isUsingMobileSensor = false;

    // --- 1. DESKTOP-FIRST: High-precision Card-Relative Pointer & Mouse Tracking ---
    const handlePointerMove = (e: PointerEvent) => {
      if (isUsingMobileSensor || !cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const cardWidth = rect.width;
      const cardHeight = rect.height;

      // Pointer position relative to card boundaries
      const clientX = e.clientX;
      const clientY = e.clientY;

      // Card-relative coordinates normalized from -1.0 to +1.0
      const localX = (clientX - (rect.left + cardWidth / 2)) / (cardWidth / 2);
      const localY = (clientY - (rect.top + cardHeight / 2)) / (cardHeight / 2);

      // Check proximity (active when hovering inside or near the card)
      const isInside =
        clientX >= rect.left - 40 &&
        clientX <= rect.right + 40 &&
        clientY >= rect.top - 40 &&
        clientY <= rect.bottom + 40;

      if (!isInside) {
        setIsHovered(false);
        // Smooth return to neutral rest position
        updateTilt(0, 0, 50, 50, 0);
        return;
      }

      setIsHovered(true);

      // Amplified tactile 3D rotation:
      // Moving cursor RIGHT tilts right (positive rotateY)
      // Moving cursor UP tilts backward (positive rotateX)
      const targetRotY = localX * 15;
      const targetRotX = -localY * 15;

      // Glare follows specular reflection angle (opposite tilt direction or cursor spot)
      const glarePercentX = ((clientX - rect.left) / cardWidth) * 100;
      const glarePercentY = ((clientY - rect.top) / cardHeight) * 100;

      updateTilt(targetRotX, targetRotY, glarePercentX, glarePercentY, 0.7);
    };

    const handlePointerLeave = () => {
      if (isUsingMobileSensor) return;
      setIsHovered(false);
      updateTilt(0, 0, 50, 50, 0);
    };

    // --- 2. SECONDARY MOBILE: Gyroscope & Physical Tilt Sensors ---
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma === null || e.beta === null) return;
      isUsingMobileSensor = true;

      // Gamma: Left-to-right tilt [-90, 90]
      // Beta: Front-to-back tilt [-180, 180] (calibrated for 45° standard holding angle)
      const gamma = e.gamma;
      const beta = e.beta - 45;

      // Map ~25° physical tilt to full ±16° 3D card tilt
      const targetRotY = (gamma / 25) * 15;
      const targetRotX = -(beta / 30) * 15;

      const glareX = 50 + (gamma / 25) * 45;
      const glareY = 50 + (beta / 30) * 45;

      updateTilt(targetRotX, targetRotY, glareX, glareY, 0.55);
    };

    // Attach listeners
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("mouseleave", handlePointerLeave);

    if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
      window.addEventListener("deviceorientation", handleOrientation, { passive: true });
    }

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("mouseleave", handlePointerLeave);
      if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
        window.removeEventListener("deviceorientation", handleOrientation);
      }
    };
  }, [updateTilt]);

  // Touch Drag Handler for mobile when gyro is unavailable or disabled
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!cardRef.current || e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = cardRef.current.getBoundingClientRect();

    const localX = (touch.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const localY = (touch.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

    const targetRotY = localX * 14;
    const targetRotX = -localY * 14;

    const glareX = ((touch.clientX - rect.left) / rect.width) * 100;
    const glareY = ((touch.clientY - rect.top) / rect.height) * 100;

    updateTilt(targetRotX, targetRotY, glareX, glareY, 0.65);
  };

  const handleTouchEnd = () => {
    updateTilt(0, 0, 50, 50, 0);
  };

  return (
    <figure
      className="relative w-full max-w-5xl mx-auto mt-10 sm:mt-14 select-none perspective-[1400px]"
      style={{ perspective: "1400px" }}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 3D Rotatable Glass Slab Container */}
      <div
        ref={cardRef}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
          transition: isHovered ? "transform 0.12s ease-out" : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className="group relative w-full rounded-md border border-white/[0.12] bg-[#141414]/85 backdrop-blur-3xl shadow-[inset_0_1px_2px_rgba(255,255,255,0.25),inset_0_-1px_1px_rgba(0,0,0,0.6),0_35px_80px_rgba(0,0,0,0.95)] will-change-transform cursor-pointer"
      >
        {/* Dynamic Specular High-Luminance Glass Glare Layer */}
        <div
          className="absolute inset-0 pointer-events-none rounded-md transition-opacity duration-300 z-30 mix-blend-overlay"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(circle 600px at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.75) 0%, rgba(215, 255, 63, 0.28) 28%, transparent 65%)`,
          }}
          aria-hidden="true"
        />

        {/* Dynamic Perimeter Rim Sheen */}
        <div
          className="absolute -top-[1px] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D7FF3F]/70 to-transparent pointer-events-none z-30 transition-transform duration-150"
          style={{
            transform: `translateX(${(glare.x - 50) * 1.8}%)`,
            opacity: glare.opacity > 0 ? 1 : 0,
          }}
          aria-hidden="true"
        />

        {/* Top Header Bar */}
        <div
          style={{ transformStyle: "preserve-3d" }}
          className="relative z-10 flex items-center justify-between px-5 sm:px-7 py-3.5 border-b border-white/[0.08] bg-[#161616]/80 backdrop-blur-xl rounded-t-md"
        >
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D7FF3F] shadow-[0_0_8px_#D7FF3F]" />
            <span className="font-grotesk text-xs sm:text-[13px] text-[#F2F0E9] font-medium tracking-wide">
              Selected Work // Digital Commerce
            </span>
          </div>

          <div className="flex items-center gap-2.5 font-grotesk text-xs text-[#77776F]">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-white/[0.06] text-[#D7FF3F] border border-[#D7FF3F]/30">
              {isHovered ? "3D INTERACTION" : "INTERACTIVE 3D"}
            </span>
            <span className="hidden sm:inline">Case 01</span>
            <span className="hidden sm:inline">·</span>
            <span className="text-[#A8A7A1] hidden sm:inline">2026 Archive</span>
          </div>
        </div>

        {/* Media Frame & 3D Parallax Stacking (Preserving 3D Space) */}
        <div
          className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-[#101010] rounded-b-md"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Base Plane: Image Cover */}
          <div className="absolute inset-0 overflow-hidden rounded-b-md">
            <Image
              src="/images/projects/mono-cover.webp"
              alt="MONO - Selected digital flagship case study by OFFGRID Studio"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1440px) 90vw, 1200px"
              className="object-cover contrast-105 brightness-95 group-hover:scale-[1.02] transition-transform duration-700 ease-out"
            />
            {/* Vignette Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#101010]/95 via-[#101010]/30 to-transparent pointer-events-none z-10" />
          </div>

          {/* PARALLAX LAYER 1: Floating Glass Editorial Plaque (Elevation Z: 45px) */}
          <div
            style={{
              transform: `translateZ(45px) translate(${-rotateY * 1.4}px, ${rotateX * 1.4}px)`,
              transformStyle: "preserve-3d",
              transition: isHovered ? "transform 0.12s ease-out" : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-20 p-4 sm:p-5 rounded-sm bg-[#121212]/90 backdrop-blur-2xl border border-white/[0.14] shadow-[0_25px_45px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.2)] max-w-xs sm:max-w-sm space-y-2 text-left pointer-events-none"
          >
            <div className="flex items-center justify-between font-grotesk text-xs text-[#D7FF3F]">
              <span className="font-semibold tracking-wider uppercase text-[11px]">Featured Release</span>
              <span className="text-[#888880] text-[11px]">Direct Commission</span>
            </div>
            <h4 className="font-bebas text-2xl sm:text-3xl text-[#F2F0E9] tracking-wide uppercase leading-none">
              MONO / DIGITAL COMMERCE
            </h4>
            <p className="font-grotesk text-xs text-[#B5B4AC] leading-relaxed hidden sm:block">
              Editorial luxury presentation blending interactive layout engineering and responsive typography.
            </p>
          </div>

          {/* PARALLAX LAYER 2: Floating Glass Action Link (Elevation Z: 55px) */}
          <a
            href="#work"
            style={{
              transform: `translateZ(55px) translate(${-rotateY * 1.8}px, ${rotateX * 1.8}px)`,
              transformStyle: "preserve-3d",
              transition: isHovered ? "transform 0.12s ease-out" : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 inline-flex items-center gap-2 px-4 py-2.5 rounded-sm bg-[#F2F0E9] hover:bg-[#D7FF3F] text-[#101010] font-grotesk font-semibold text-xs transition-colors shadow-[0_15px_30px_rgba(0,0,0,0.85)] cursor-pointer"
          >
            <span>View Case Study</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* PARALLAX LAYER 3: Floating Studio Signature Symbol (Elevation Z: 70px) */}
          <div
            style={{
              transform: `translateZ(70px) translate(${-rotateY * 2.2}px, ${rotateX * 2.2}px)`,
              transformStyle: "preserve-3d",
              transition: isHovered ? "transform 0.12s ease-out" : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            className="absolute top-4 right-4 z-20 drop-shadow-[0_20px_35px_rgba(0,0,0,0.95)] opacity-95 pointer-events-none"
          >
            <OffgridSymbol size={60} />
          </div>
        </div>
      </div>
    </figure>
  );
}
