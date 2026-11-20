"use client";

import React from "react";
import { ArrowUp, ArrowUpRight } from "lucide-react";

export function Footer() {
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@offgrid.studio";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="footer"
      className="relative w-full bg-[#101010] text-[#F2F0E9] border-t border-[#292929] pt-20 sm:pt-28 pb-12 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top Section: Brand Statement & Navigation Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-16">
          {/* Brand & Editorial Mission */}
          <div className="lg:col-span-5 space-y-4">
            <div className="footer-stagger-item flex items-baseline gap-1">
              <span className="font-bebas text-4xl sm:text-5xl tracking-wider text-[#F2F0E9]">
                OFFGRID
              </span>
              <span className="font-grotesk text-base text-[#D7FF3F] font-bold">®</span>
            </div>
            <p className="footer-stagger-item font-grotesk text-base sm:text-lg text-[#77776F] max-w-md leading-relaxed">
              Independent thinking. Distinctive design. Digital experiences without the ordinary.
            </p>
            <div className="footer-stagger-item pt-2 font-grotesk text-xs text-[#77776F] tracking-wide">
              Paris // Tokyo // Remote
            </div>
          </div>

          {/* Directory Navigation Links */}
          <div className="lg:col-span-3 space-y-4">
            <span className="footer-stagger-item block font-grotesk text-xs font-semibold tracking-wider text-[#77776F]">
              Index // Navigation
            </span>
            <ul className="space-y-3 font-grotesk text-sm">
              <li className="footer-stagger-item">
                <a
                  href="#services"
                  className="group inline-flex items-center gap-2 text-[#F2F0E9] hover:text-[#D7FF3F] transition-colors"
                >
                  <span className="font-grotesk text-xs text-[#77776F] group-hover:text-[#D7FF3F]">
                    01
                  </span>
                  <span>Services</span>
                </a>
              </li>
              <li className="footer-stagger-item">
                <a
                  href="#work"
                  className="group inline-flex items-center gap-2 text-[#F2F0E9] hover:text-[#D7FF3F] transition-colors"
                >
                  <span className="font-grotesk text-xs text-[#77776F] group-hover:text-[#D7FF3F]">
                    02
                  </span>
                  <span>Work</span>
                </a>
              </li>
              <li className="footer-stagger-item">
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 text-[#F2F0E9] hover:text-[#D7FF3F] transition-colors"
                >
                  <span className="font-grotesk text-xs text-[#77776F] group-hover:text-[#D7FF3F]">
                    03
                  </span>
                  <span>Contact</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Studio Inquiries & Contact Action */}
          <div className="lg:col-span-4 space-y-4">
            <span className="footer-stagger-item block font-grotesk text-xs font-semibold tracking-wider text-[#77776F]">
              Dispatch // Direct
            </span>
            <div className="footer-stagger-item">
              <a
                href={`mailto:${contactEmail}`}
                className="group inline-flex items-center gap-2 font-bebas text-3xl sm:text-4xl text-[#F2F0E9] hover:text-[#D7FF3F] tracking-wide transition-colors uppercase"
              >
                <span>LET&apos;S TALK</span>
                <ArrowUpRight className="w-6 h-6 text-[#D7FF3F] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
              <p className="font-grotesk text-xs text-[#77776F] mt-1">
                {contactEmail}
              </p>
            </div>
            <p className="footer-stagger-item font-grotesk text-xs text-[#77776F] pt-2">
              Accepting select commissions for Q2/Q3 2026.
            </p>
          </div>
        </div>

        {/* Animated Expanding Divider */}
        <div
          id="footer-divider"
          className="w-full h-px bg-[#292929] mb-12 will-change-transform"
        />

        {/* Bottom Colophon Row: Copyright & Back To Top */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-12 font-grotesk text-xs text-[#77776F]">
          <div className="footer-stagger-item">
            © 2026 OFFGRID®. All rights reserved.
          </div>

          <div className="footer-stagger-item flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="group inline-flex items-center gap-2 text-[#F2F0E9] hover:text-[#D7FF3F] transition-colors cursor-pointer tracking-wide"
              aria-label="Scroll back to top of page"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Oversized Sculptural Editorial Wordmark */}
        <div
          id="footer-wordmark"
          className="pt-6 border-t border-[#292929]/50 overflow-hidden select-none pointer-events-none will-change-transform"
          aria-hidden="true"
        >
          <div className="font-bebas text-[18vw] leading-[0.8] tracking-tight text-[#F2F0E9]/[0.08] text-center whitespace-nowrap">
            OFFGRID STUDIO
          </div>
        </div>
      </div>
    </footer>
  );
}
