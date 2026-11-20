import React from "react";
import { ArrowUpRight } from "lucide-react";
import { ContactBackground } from "@/components/contact/artwork/ContactBackground";
import { SignatureSymbol } from "@/components/contact/artwork/SignatureSymbol";
import { ContactForm } from "@/components/contact/ContactForm";

export function ContactSection() {
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@offgrid.studio";

  return (
    <section
      id="contact"
      className="relative w-full bg-[#101010] text-[#F2F0E9] pt-28 sm:pt-36 lg:pt-44 pb-28 sm:pb-36 lg:pb-48 overflow-hidden border-t border-[#292929] scroll-mt-24 sm:scroll-mt-28"
    >
      {/* Laser Transition Line triggered on scroll entry */}
      <div
        id="contact-section-transition-line"
        className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#D7FF3F] to-transparent will-change-transform shadow-[0_0_20px_rgba(215,255,63,0.8)]"
        aria-hidden="true"
      />

      {/* 1. Multi-Layered Custom SVG Artwork Canvas */}
      <ContactBackground />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* 2. Top Editorial Ledger */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#292929] pb-8 mb-16 sm:mb-20">
          <div className="contact-meta-item flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#D7FF3F]" />
            <span className="font-grotesk text-xs sm:text-sm tracking-wider text-[#F2F0E9] font-medium">
              Contact
            </span>
          </div>

          <div className="contact-meta-item font-grotesk text-xs sm:text-sm tracking-wide text-[#77776F]">
            Independent Creative Studio — Chennai / Worldwide
          </div>
        </div>

        {/* 3. Hero-Like Opening: Monumental 3-Line Headline */}
        <div id="contact-headline-container" className="mb-20 sm:mb-28 lg:mb-32">
          <h2
            className="font-bebas text-[44px] xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[145px] tracking-[0.01em] leading-[0.88] uppercase text-[#F2F0E9] select-none break-words"
            aria-label="LET'S MAKE SOMETHING UNEXPECTED."
          >
            <div className="overflow-hidden py-1">
              <span className="contact-headline-line block will-change-transform">
                LET&apos;S MAKE
              </span>
            </div>
            <div className="overflow-hidden py-1">
              <span className="contact-headline-line block will-change-transform">
                SOMETHING
              </span>
            </div>
            <div className="overflow-hidden py-1">
              <span className="contact-headline-line block text-[#F2F0E9] will-change-transform">
                UNEXPECTED<span className="text-[#D7FF3F]">.</span>
              </span>
            </div>
          </h2>
        </div>

        {/* 4. Middle Narrative & Kinetic Signature Bridge */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center border-y border-[#292929] py-14 sm:py-20 mb-20 sm:mb-28">
          {/* Narrative Statement & Quick Dispatch */}
          <div className="lg:col-span-7 space-y-8">
            <p className="contact-meta-item font-grotesk text-2xl sm:text-3xl lg:text-4xl text-[#F2F0E9] font-light leading-snug max-w-2xl">
              Have an idea that deserves to exist? Have a project that needs a different perspective? We would love to hear about it.
            </p>

            <div className="contact-meta-item flex flex-wrap items-center gap-6 sm:gap-10 pt-4">
              <div className="flex items-center gap-3">
                <span className="font-grotesk text-sm text-[#77776F] tracking-wide">
                  Direct inquiry
                </span>
                <a
                  href={`mailto:${contactEmail}`}
                  className="group inline-flex items-center gap-1.5 font-grotesk font-medium text-base text-[#F2F0E9] hover:text-[#D7FF3F] tracking-wide transition-colors"
                >
                  <span>{contactEmail}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#D7FF3F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Signature Kinetic Asterisk Anchor */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <SignatureSymbol />
          </div>
        </div>

        {/* 5. Bottom Refined Editorial Interaction Area */}
        <div id="contact-form-section" className="w-full">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
