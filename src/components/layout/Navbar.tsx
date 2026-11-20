"use client";

import React, { useState } from "react";
import { MobileMenu } from "./MobileMenu";
import { ArrowUpRight, Menu } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#101010]/90 backdrop-blur-md border-b border-[#292929] transition-colors duration-200">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 h-20 sm:h-24 flex items-center justify-between">
          {/* Left: OFFGRID® Wordmark */}
          <a
            href="#top"
            className="group flex items-baseline gap-1.5 text-[#F2F0E9] focus:outline-none focus:ring-1 focus:ring-[#D7FF3F]"
          >
            <span className="font-bebas text-3xl sm:text-4xl tracking-wider text-[#F2F0E9] group-hover:text-[#D7FF3F] transition-colors">
              OFFGRID
            </span>
            <span className="font-grotesk text-sm text-[#D7FF3F] font-bold">®</span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-12">
            <div className="flex items-center gap-8 font-grotesk text-sm tracking-wide">
              <a
                href="#services"
                className="text-[#77776F] hover:text-[#F2F0E9] transition-colors"
              >
                Services
              </a>

              <a
                href="#work"
                className="text-[#77776F] hover:text-[#F2F0E9] transition-colors"
              >
                Work
              </a>

              <a
                href="#contact"
                className="text-[#77776F] hover:text-[#F2F0E9] transition-colors"
              >
                Contact
              </a>
            </div>

            {/* Distinct Let's talk CTA */}
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-5 py-2.5 bg-[#292929] hover:bg-[#D7FF3F] text-[#F2F0E9] hover:text-[#101010] font-grotesk font-medium text-xs tracking-wide rounded-xs border border-[#292929] hover:border-[#D7FF3F] transition-colors duration-200"
            >
              <span>Let&apos;s talk</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </nav>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 border border-[#292929] hover:border-[#D7FF3F] text-[#F2F0E9] hover:text-[#D7FF3F] rounded-xs transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Accessible Full-screen Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
