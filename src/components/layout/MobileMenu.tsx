"use client";

import React, { useEffect, useRef } from "react";
import { X, ArrowUpRight } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      className="fixed inset-0 z-50 bg-[#101010] text-[#F2F0E9] flex flex-col justify-between p-6 sm:p-10 animate-in fade-in duration-200"
    >
      {/* Top Bar with Wordmark and Close Button */}
      <div className="flex items-center justify-between border-b border-[#292929] pb-6">
        <span className="font-bebas text-2xl tracking-wider text-[#F2F0E9]">
          OFFGRID<span className="text-[#D7FF3F]">®</span>
        </span>
        <button
          onClick={onClose}
          className="p-2 border border-[#292929] hover:border-[#D7FF3F] hover:text-[#D7FF3F] text-[#F2F0E9] rounded-xs transition-colors"
          aria-label="Close navigation menu"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation Links in Oversized Bebas Neue */}
      <nav className="flex flex-col space-y-6 sm:space-y-8 my-auto py-8">
        {[
          { label: "Services", href: "#services" },
          { label: "Work", href: "#work" },
          { label: "Contact", href: "#contact" },
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={onClose}
            className="group flex items-baseline text-[#F2F0E9] hover:text-[#D7FF3F] transition-colors"
          >
            <span className="font-bebas text-5xl sm:text-7xl tracking-wide uppercase">
              {item.label}
            </span>
          </a>
        ))}
      </nav>

      {/* Bottom CTA & Metadata */}
      <div className="space-y-6 pt-6 border-t border-[#292929]">
        <a
          href="#contact"
          onClick={onClose}
          className="w-full py-4 bg-[#D7FF3F] text-[#101010] font-grotesk font-bold text-sm tracking-wider flex items-center justify-center gap-2 rounded-xs hover:bg-[#F2F0E9] transition-colors"
        >
          <span>Let&apos;s talk</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>

        <div className="flex justify-between items-center font-grotesk text-xs text-[#77776F]">
          <span>Independent Studio / 2026</span>
          <span className="text-[#D7FF3F] tracking-wider font-medium">
            Commissions open
          </span>
        </div>
      </div>
    </div>
  );
}
