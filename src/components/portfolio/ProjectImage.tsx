"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Performance-optimized RAF ticker for scroll velocity & orientation
  const isVisibleRef = useRef(false);

  const applyTilt = useCallback((rX: number, rY: number, gX: number, gY: number, gOpacity: number) => {
    // Elegant, subtle clamp (±8 degrees) so cards tilt gracefully without layout shifting
    const clampedX = Math.max(-8, Math.min(8, rX));
    const clampedY = Math.max(-8, Math.min(8, rY));

    setRotateX(clampedX);
    setRotateY(clampedY);
    setGlare({
      x: Math.max(0, Math.min(100, gX)),
      y: Math.max(0, Math.min(100, gY)),
      opacity: gOpacity,
    });
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // 1. Intersection Observer to completely disable listeners when card is off-screen
    const currentContainer = containerRef.current;
    if (!currentContainer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
          if (!entry.isIntersecting) {
            // Reset to rest state when scrolled out
            setRotateX(0);
            setRotateY(0);
            setGlare((prev) => ({ ...prev, opacity: 0 }));
          }
        });
      },
      { rootMargin: "150px" } // Pre-activate slightly before entering viewport
    );

    observer.observe(currentContainer);

    // 2. High-performance Scroll-Velocity Tilt via Passive RAF
    let lastScrollY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (!isVisibleRef.current) return;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const deltaY = currentY - lastScrollY;
          lastScrollY = currentY;

          // Only apply scroll-induced pitch if user is not actively hovering with mouse
          if (!isHovered && containerRef.current) {
            // Scroll delta tilt clamped to ±4.5 degrees
            const scrollPitch = Math.max(-4.5, Math.min(4.5, deltaY * 0.18));
            setRotateX(-scrollPitch);

            // Dynamically sweep subtle glare based on scroll velocity
            const glareY = 50 + scrollPitch * 8;
            setGlare({
              x: 50,
              y: glareY,
              opacity: Math.min(0.35, Math.abs(scrollPitch) * 0.08),
            });
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    // 3. Gyroscopic Orientation Handler for Mobile/Tablets (Passive & Viewport-guarded)
    const onOrientation = (e: DeviceOrientationEvent) => {
      if (!isVisibleRef.current || e.gamma === null || e.beta === null) return;
      // Normalise mobile orientation
      const gamma = e.gamma;
      const beta = e.beta - 45;

      const targetRotY = (gamma / 30) * 7;
      const targetRotX = -(beta / 35) * 7;

      const glareX = 50 + (gamma / 30) * 40;
      const glareY = 50 + (beta / 35) * 40;

      applyTilt(targetRotX, targetRotY, glareX, glareY, 0.4);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
      window.addEventListener("deviceorientation", onOrientation, { passive: true });
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
        window.removeEventListener("deviceorientation", onOrientation);
      }
    };
  }, [applyTilt, isHovered]);

  // Desktop Card-Relative Pointer Tracking (Proximity)
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    const localX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const localY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

    const targetRotY = localX * 9;
    const targetRotX = -localY * 9;

    const glareX = ((e.clientX - rect.left) / rect.width) * 100;
    const glareY = ((e.clientY - rect.top) / rect.height) * 100;

    setIsHovered(true);
    applyTilt(targetRotX, targetRotY, glareX, glareY, 0.6);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    applyTilt(0, 0, 50, 50, 0);
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`group/img relative w-full ${aspectRatio} rounded-sm perspective-[1200px] select-none cursor-pointer`}
      style={{ perspective: "1200px" }}
    >
      {/* 3D Glassmorphic Image Slab */}
      <div
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
          transition: isHovered
            ? "transform 0.12s ease-out"
            : "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className="relative w-full h-full rounded-sm border border-white/[0.08] bg-[#141414] shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.15)] will-change-transform overflow-hidden"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 840px"
          className="object-cover grayscale-[15%] contrast-[1.08] brightness-90 group-hover/img:scale-[1.03] group-hover/img:grayscale-0 group-hover/img:brightness-100 transition-[transform,filter] duration-700 ease-out"
        />

        {/* Dynamic Specular Glass Glare Layer */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-20 mix-blend-overlay"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(circle 420px at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.65) 0%, rgba(215, 255, 63, 0.2) 32%, transparent 70%)`,
          }}
          aria-hidden="true"
        />

        {/* Dynamic Bezel Rim Sheen */}
        <div
          className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D7FF3F]/60 to-transparent pointer-events-none z-20 transition-transform duration-200"
          style={{
            transform: `translateX(${(glare.x - 50) * 1.6}%)`,
            opacity: glare.opacity > 0 ? 1 : 0,
          }}
          aria-hidden="true"
        />

        {/* Bottom Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#101010]/85 via-transparent to-transparent pointer-events-none z-10" />

        {/* Floating Tag (Z: 30px Parallax Layer) */}
        <div
          style={{
            transform: `translateZ(30px) translate(${-rotateY * 0.8}px, ${rotateX * 0.8}px)`,
            transformStyle: "preserve-3d",
            transition: isHovered ? "transform 0.12s ease-out" : "transform 0.45s ease-out",
          }}
          className="absolute top-3 left-3 z-30 px-3 py-1 bg-[#101010]/85 backdrop-blur-xl border border-white/[0.12] rounded-xs font-grotesk text-[11px] font-semibold tracking-wider text-[#F2F0E9] shadow-[0_8px_20px_rgba(0,0,0,0.8)]"
        >
          <span className="text-[#D7FF3F] mr-1.5">{number}</span>
          <span>{category}</span>
        </div>
      </div>
    </div>
  );
}
