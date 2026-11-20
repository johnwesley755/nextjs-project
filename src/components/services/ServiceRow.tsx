"use client";

import React from "react";
import { ServiceItemData } from "@/data/services";
import { ServiceImage } from "./ServiceImage";
import { ArrowUpRight } from "lucide-react";

interface ServiceRowProps {
  service: ServiceItemData;
}

export function ServiceRow({ service }: ServiceRowProps) {
  const isImageLeft = service.layout === "image-left";

  return (
    <article className="group relative w-full py-12 sm:py-16 lg:py-20 border-b border-[#101010]/15 transition-colors">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        {/* Visual Column */}
        <div
          className={`w-full ${
            isImageLeft
              ? "lg:col-span-7 lg:order-1"
              : "lg:col-span-7 lg:order-2"
          }`}
        >
          <ServiceImage
            src={service.imageSrc}
            alt={service.imageAlt}
            aspectRatio={service.aspectRatio}
            number={service.number}
          />
        </div>

        {/* Editorial Text Details Column */}
        <div
          className={`space-y-6 sm:space-y-7 ${
            isImageLeft
              ? "lg:col-span-5 lg:order-2"
              : "lg:col-span-5 lg:order-1"
          }`}
        >
          {/* Service Number Tag */}
          <div className="flex items-center justify-between border-b border-[#101010]/10 pb-3">
            <span className="font-grotesk text-xs sm:text-sm font-bold tracking-wider text-[#101010]">
              {service.number}
            </span>
            <div className="w-8 h-8 rounded-full border border-[#101010]/20 flex items-center justify-center text-[#101010] group-hover:bg-[#101010] group-hover:text-[#D7FF3F] group-hover:border-[#101010] transition-colors duration-200">
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          {/* Title in Bebas Neue */}
          <h3 className="font-bebas text-4xl sm:text-5xl lg:text-6xl tracking-[0.02em] leading-[0.92] text-[#101010] uppercase">
            {service.title}
          </h3>

          {/* Description in Space Grotesk */}
          <p className="font-grotesk text-base sm:text-lg text-[#333333] leading-relaxed max-w-lg">
            {service.description}
          </p>

          {/* Capabilities Tags with Electric Lime Slashes */}
          <div className="pt-2">
            <span className="block font-grotesk text-[11px] font-medium tracking-wider text-[#77776F] mb-2">
              Core disciplines
            </span>
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 font-grotesk text-xs sm:text-[13px] font-medium tracking-wide text-[#101010]">
              {service.capabilities.map((cap, idx) => (
                <React.Fragment key={cap}>
                  <span className="hover:text-[#101010] transition-colors">{cap}</span>
                  {idx < service.capabilities.length - 1 && (
                    <span className="text-[#D7FF3F] font-bold select-none" aria-hidden="true">
                      /
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
