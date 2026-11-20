"use client";

import React, { useEffect, useRef, useState } from "react";

interface BackgroundVideoProps {
  srcMp4: string;
  poster: string;
  opacity?: string;
  scrimClassName?: string;
  className?: string;
}

export function BackgroundVideo({
  srcMp4,
  poster,
  opacity = "opacity-60",
  scrimClassName = "bg-gradient-to-t from-[#101010] via-[#101010]/50 to-transparent",
  className = "",
}: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // Ensure video plays immediately on mount
  useEffect(() => {
    if (!reducedMotion && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion || !videoRef.current || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play().catch(() => {});
          } else {
            videoRef.current?.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {!reducedMotion ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
          preload="auto"
          className={`w-full h-full object-cover ${opacity} will-change-transform`}
        >
          <source src={srcMp4} type="video/mp4" />
        </video>
      ) : (
        <img
          src={poster}
          alt=""
          className={`w-full h-full object-cover ${opacity}`}
        />
      )}
      {scrimClassName && <div className={`absolute inset-0 ${scrimClassName}`} />}
    </div>
  );
}
