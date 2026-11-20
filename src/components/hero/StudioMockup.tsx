"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { OffgridSymbol } from "../visuals/OffgridSymbol";

export function StudioMockup() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [hasGyro, setHasGyro] = useState(false);

  // Apply tilt angles with boundary clamping & dynamic specular glare calculation
  const applyTilt = useCallback((degX: number, degY: number, glareX: number, glareY: number, opacity: number = 0.45) => {
    // Clamp tilt angles to maximum ±8 degrees for refined luxury feel
    const clampedX = Math.max(-8, Math.min(8, degX));
    const clampedY = Math.max(-8, Math.min(8, degY));

    setRotateX(clampedX);
    setRotateY(clampedY);
    setGlarePos({
      x: Math.max(0, Math.min(100, glareX)),
      y: Math.max(0, Math.min(100, glareY)),
      opacity,
    });
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let isUsingOrientation = false;

    // 1. Gyroscopic Orientation Handler for Mobile / Tablet devices
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma === null || e.beta === null) return;
      isUsingOrientation = true;
      setHasGyro(true);

      // Gamma: left-to-right tilt [-90 to 90]
      // Beta: front-to-back tilt [-180 to 180] (typical holding angle ~45 deg)
      const gamma = e.gamma;
      const beta = e.beta - 45; // Calibrate around natural 45-degree mobile viewing posture

      const targetRotY = (gamma / 30) * 8; // Normalise ~30 deg hand tilt to full 8 deg 3D tilt
      const targetRotX = -(beta / 35) * 8;

      // Specular sheen travels in reflection direction
      const glareX = 50 + (gamma / 30) * 45;
      const glareY = 50 + (beta / 35) * 45;

      applyTilt(targetRotX, targetRotY, glareX, glareY, 0.4);
    };

    // 2. Mouse / Pointer Movement Handler for Desktop
    const handleMouseMove = (e: MouseEvent) => {
      if (isUsingOrientation || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();

      // Check proximity - calculate even if slightly outside to provide smooth approach
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - cardCenterX) / (window.innerWidth / 2);
      const deltaY = (e.clientY - cardCenterY) / (window.innerHeight / 2);

      const targetRotY = deltaX * 6;
      const targetRotX = -deltaY * 6;

      // Calculate glare sheen coordinates based on mouse position relative to card
      const glareX = ((e.clientX - rect.left) / rect.width) * 100;
      const glareY = ((e.clientY - rect.top) / rect.height) * 100;

      // Fade glare when pointer moves far away from showcase
      const isOver =
        e.clientX >= rect.left - 100 &&
        e.clientX <= rect.right + 100 &&
        e.clientY >= rect.top - 100 &&
        e.clientY <= rect.bottom + 100;

      applyTilt(targetRotX, targetRotY, glareX, glareY, isOver ? 0.45 : 0.15);
    };

    const handleMouseLeave = () => {
      if (isUsingOrientation) return;
      // Gently return to rest state
      applyTilt(0, 0, 50, 50, 0);
    };

    // Check DeviceOrientationEvent availability & attach
    if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
      window.addEventListener("deviceorientation", handleOrientation, { passive: true });
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
        window.removeEventListener("deviceorientation", handleOrientation);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [applyTilt]);

  // Optional iOS 13+ permission request trigger on direct tap
  const requestGyroPermission = async () => {
    if (
      typeof window !== "undefined" &&
      typeof (DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> })
        .requestPermission === "function"
    ) {
      try {
        const permission = await (
          DeviceOrientationEvent as unknown as { requestPermission: () => Promise<string> }
        ).requestPermission();
        if (permission === "granted") {
          setHasGyro(true);
        }
      } catch {
        // Ignored or denied, fallback seamlessly to touch/mouse
      }
    }
  };

  return (
    <figure
      onClick={requestGyroPermission}
      className="relative w-full max-w-5xl mx-auto mt-10 sm:mt-14 select-none perspective-[1400px]"
      style={{ perspective: "1400px" }}
    >
      {/* 3D Rotatable Glass Surface */}
      <div
        ref={cardRef}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.28s cubic-bezier(0.2, 0, 0, 1)",
        }}
        className="group relative w-full rounded-sm border border-white/[0.08] bg-[#141414]/80 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden will-change-transform"
      >
        {/* Dynamic Specular Glass Glare Layer */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-30 mix-blend-overlay"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(circle 500px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.45) 0%, rgba(215, 255, 63, 0.15) 35%, transparent 70%)`,
          }}
          aria-hidden="true"
        />

        {/* Dynamic Edge Sheen Line */}
        <div
          className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none z-30 transition-transform duration-300"
          style={{
            transform: `translateX(${(glarePos.x - 50) * 1.5}%)`,
          }}
          aria-hidden="true"
        />

        {/* Editorial Work Header Bar with Glass Frosting */}
        <div className="relative z-10 flex items-center justify-between px-5 sm:px-7 py-3.5 border-b border-white/[0.06] bg-[#161616]/75 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#D7FF3F]" />
            <span className="font-grotesk text-xs sm:text-[13px] text-[#F2F0E9] font-medium tracking-wide">
              Selected Work // Digital Commerce
            </span>
          </div>

          <div className="flex items-center gap-2 font-grotesk text-xs text-[#77776F]">
            {hasGyro && (
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#D7FF3F]/10 text-[#D7FF3F] border border-[#D7FF3F]/30">
                GYRO ACTIVE
              </span>
            )}
            <span>Case 01</span>
            <span>·</span>
            <span className="text-[#A8A7A1]">2026 Archive</span>
          </div>
        </div>

        {/* Real Project Visual Display (Base Plane) */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[#101010]">
          <Image
            src="/images/projects/mono-cover.webp"
            alt="MONO - Selected digital flagship case study by OFFGRID Studio"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1440px) 90vw, 1200px"
            className="object-cover contrast-105 brightness-95 group-hover:scale-[1.015] transition-transform duration-700 ease-out"
          />

          {/* Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#101010]/95 via-[#101010]/25 to-transparent pointer-events-none z-10" />

          {/* Parallax Layer 1: Floating Glass Editorial Slate (Translates forward in Z-space) */}
          <div
            style={{
              transform: `translateZ(26px) translate(${-rotateY * 0.8}px, ${rotateX * 0.8}px)`,
              transition: "transform 0.28s cubic-bezier(0.2, 0, 0, 1)",
            }}
            className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-20 p-4 sm:p-5 rounded-xs bg-[#121212]/85 backdrop-blur-2xl border border-white/[0.1] shadow-[0_15px_35px_rgba(0,0,0,0.85)] max-w-xs sm:max-w-sm space-y-2 text-left"
          >
            <div className="flex items-center justify-between font-grotesk text-xs text-[#D7FF3F]">
              <span>Featured Release</span>
              <span className="text-[#77776F]">Direct Commission</span>
            </div>
            <h4 className="font-bebas text-2xl sm:text-3xl text-[#F2F0E9] tracking-wide uppercase leading-none">
              MONO / DIGITAL COMMERCE
            </h4>
            <p className="font-grotesk text-xs text-[#A8A7A1] leading-relaxed hidden sm:block">
              Editorial luxury presentation blending interactive layout engineering and responsive typography.
            </p>
          </div>

          {/* Parallax Layer 2: Floating Glass Action Link */}
          <a
            href="#work"
            style={{
              transform: `translateZ(28px) translate(${-rotateY * 0.6}px, ${rotateX * 0.6}px)`,
              transition: "transform 0.28s cubic-bezier(0.2, 0, 0, 1)",
            }}
            className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 inline-flex items-center gap-2 px-4 py-2.5 rounded-xs bg-[#F2F0E9] hover:bg-[#D7FF3F] text-[#101010] font-grotesk font-semibold text-xs transition-colors shadow-xl"
          >
            <span>View Case Study</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Parallax Layer 3: Floating Studio Signature Symbol */}
          <div
            style={{
              transform: `translateZ(36px) translate(${-rotateY * 1.2}px, ${rotateX * 1.2}px)`,
              transition: "transform 0.28s cubic-bezier(0.2, 0, 0, 1)",
            }}
            className="absolute top-4 right-4 z-20 drop-shadow-[0_12px_28px_rgba(0,0,0,0.9)] opacity-95 pointer-events-none"
          >
            <OffgridSymbol size={56} />
          </div>
        </div>
      </div>
    </figure>
  );
}
