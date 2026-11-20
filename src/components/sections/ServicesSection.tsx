"use client";

import React from "react";
import { SERVICES_DATA, SERVICES_SECTION_HEADER } from "@/data/services";
import { ServiceRow } from "../services/ServiceRow";

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative w-full bg-[#F2F0E9] text-[#101010] py-20 sm:py-28 lg:py-36 overflow-hidden border-b border-[#292929]/20"
    >
      {/* Scroll-Triggered Section Entrance Transition Line */}
      <div
        id="services-transition-divider"
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#101010] to-transparent z-20 origin-center pointer-events-none opacity-80"
      />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 w-full">
        {/* Section Header: Pure Single-Column Editorial Stack */}
        <div className="border-b border-[#101010]/20 pb-12 sm:pb-16 mb-6 sm:mb-10 max-w-4xl space-y-6">
          <h2 className="font-bebas text-5xl sm:text-7xl lg:text-8xl xl:text-9xl tracking-[0.015em] leading-[0.88] text-[#101010] uppercase select-none">
            THINK. DESIGN. BUILD<span className="text-[#77776F]">.</span>
          </h2>
          <p className="font-grotesk text-lg sm:text-2xl text-[#333333] leading-relaxed max-w-2xl font-light">
            {SERVICES_SECTION_HEADER.description}
          </p>
        </div>

        {/* 4 Image-Led Service Rows */}
        <div className="w-full">
          {SERVICES_DATA.map((service) => (
            <ServiceRow
              key={service.id}
              service={service}
            />
          ))}
        </div>

        {/* Section Closing Editorial Note */}
        <div className="pt-10 sm:pt-14 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 font-grotesk text-xs text-[#77776F]">
          <span>Offgrid® studio methodology / Research to execution</span>
          <span className="text-[#101010] font-semibold">All capabilities integrated in-house</span>
        </div>
      </div>
    </section>
  );
}
