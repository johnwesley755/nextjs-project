"use client";

import React, { useState, useEffect } from "react";
import { MobileMenu } from "./MobileMenu";
import { ArrowUpRight, Menu } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      // Toggle transparency threshold at 40px scroll
      setIsScrolled(window.scrollY > 40);

      // Track active section for navigation highlight
      const sections = ["contact", "work", "services"];
      const scrollPos = window.scrollY + 250;

      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && scrollPos >= el.offsetTop) {
          current = id;
          break;
        }
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full -mb-20 sm:-mb-24 transition-all duration-300 ease-out ${
          isScrolled
            ? "bg-[#101010]/85 backdrop-blur-md border-b border-[#292929] shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div
          className={`max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between transition-all duration-300 ${
            isScrolled ? "h-16 sm:h-20" : "h-20 sm:h-24"
          }`}
        >
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

          {/* Desktop Navigation Links & Status Colophon */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {/* Navigation Anchor Links */}
            <div className="flex items-center gap-7 lg:gap-9 font-grotesk text-xs sm:text-[13px] tracking-wider uppercase">
              {[
                { id: "services", label: "Services" },
                { id: "work", label: "Work" },
                { id: "contact", label: "Contact" },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`group relative py-1 transition-colors ${
                    activeSection === item.id
                      ? "text-[#F2F0E9] font-medium"
                      : "text-[#77776F] hover:text-[#F2F0E9]"
                  }`}
                >
                  <span>{item.label}</span>
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-[#D7FF3F] transition-all duration-200 ${
                      activeSection === item.id
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              ))}
            </div>

            {/* Studio Availability Colophon */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#292929] bg-[#101010]/40 backdrop-blur-xs font-grotesk text-[11px] text-[#A8A7A1]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D7FF3F] animate-pulse" />
              <span>Available for projects</span>
            </div>

            {/* Distinct Let's talk CTA */}
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-5 py-2.5 bg-[#292929]/80 hover:bg-[#D7FF3F] text-[#F2F0E9] hover:text-[#101010] font-grotesk font-semibold text-xs tracking-wider rounded-xs border border-[#292929] hover:border-[#D7FF3F] transition-colors duration-200"
            >
              <span>Let&apos;s talk</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </nav>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 border border-[#292929] hover:border-[#D7FF3F] text-[#F2F0E9] hover:text-[#D7FF3F] rounded-xs transition-colors cursor-pointer"
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
