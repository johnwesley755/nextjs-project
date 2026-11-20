"use client";

import React from "react";
import { PROJECTS_DATA, PORTFOLIO_HEADER } from "@/data/projects";
import { ProjectCard } from "../portfolio/ProjectCard";

export function PortfolioSection() {
  return (
    <section
      id="work"
      className="relative w-full bg-[#101010] text-[#F2F0E9] py-20 sm:py-28 lg:py-36 overflow-hidden border-b border-[#292929]"
    >
      {/* Scroll-Triggered Section Entrance Laser Transition */}
      <div
        id="portfolio-transition-divider"
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D7FF3F] to-transparent z-20 origin-center pointer-events-none opacity-80"
      />

      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="max-w-[1440px] mx-auto h-full grid grid-cols-12 px-6 sm:px-8 lg:px-12">
          <div className="col-span-1 border-r border-[#292929] h-full hidden lg:block" />
          <div className="col-span-7 border-r border-[#292929] h-full hidden lg:block" />
          <div className="col-span-3 border-r border-[#292929] h-full hidden lg:block" />
          <div className="col-span-1 h-full hidden lg:block" />
        </div>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 w-full">
        {/* Section Header: Single-Column Vertical Stack */}
        <div className="border-b border-[#292929] pb-12 sm:pb-16 mb-12 sm:mb-20 max-w-4xl space-y-6">
          <h2 className="font-bebas text-5xl sm:text-7xl lg:text-8xl xl:text-9xl tracking-[0.015em] leading-[0.88] text-[#F2F0E9] uppercase select-none">
            MADE TO STAND OUT<span className="text-[#D7FF3F]">.</span>
          </h2>
          <p className="font-grotesk text-lg sm:text-2xl text-[#A8A7A1] leading-relaxed max-w-2xl font-light">
            {PORTFOLIO_HEADER.description}
          </p>
        </div>

        {/* Asymmetrical Editorial Project Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-16 sm:gap-y-20 lg:gap-y-24 items-start">
          {PROJECTS_DATA.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Section Closing Editorial Notice */}
        <div className="mt-16 sm:mt-24 pt-8 border-t border-[#292929] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 font-grotesk text-xs text-[#77776F]">
          <span>
            Disclosure: All projects presented above are independent creative concepts demonstrating OFFGRID® capabilities.
          </span>
          <span className="text-[#F2F0E9]">Offgrid® archive // 2026</span>
        </div>
      </div>
    </section>
  );
}
