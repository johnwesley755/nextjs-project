"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function PageTransitions() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    let ctx: gsap.Context | null = null;
    let mm: gsap.MatchMedia | null = null;

    const rafId = requestAnimationFrame(() => {
      const servicesSection = document.getElementById("services");
      const portfolioSection = document.getElementById("work");
      const contactSection = document.getElementById("contact");
      const footerSection = document.getElementById("footer");

      mm = gsap.matchMedia();

      // 1. Reduced Motion Mode: Immediate static rendering
      mm.add("(prefers-reduced-motion: reduce)", () => {
        const elementsToReset = [
          document.getElementById("services-transition-divider"),
          document.getElementById("portfolio-transition-divider"),
          document.getElementById("contact-section-transition-line"),
          document.getElementById("contact-technical-grid"),
          document.getElementById("contact-outline-wordmark"),
          document.getElementById("contact-architectural-illustration"),
          document.getElementById("contact-signature-symbol"),
          document.getElementById("contact-form-section"),
          document.getElementById("footer-divider"),
          document.getElementById("footer-wordmark"),
          ...document.querySelectorAll(".contact-headline-line"),
          ...document.querySelectorAll(".contact-meta-item"),
          ...document.querySelectorAll(".contact-form-item"),
          ...document.querySelectorAll(".footer-stagger-item"),
          ...document.querySelectorAll(".illustration-float-item"),
        ].filter(Boolean) as (Element | HTMLElement)[];

        if (elementsToReset.length > 0) {
          gsap.set(elementsToReset, {
            clearProps: "all",
            opacity: 1,
            y: 0,
            yPercent: 0,
            scale: 1,
            scaleX: 1,
            rotation: 0,
          });
        }
      });

      // 2. Normal Motion Mode: Seamless Scroll-Triggered Transitions
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        ctx = gsap.context(() => {
          // ==========================================================
          // TRANSITION 01: Hero -> Services Section Transition
          // ==========================================================
          const servicesDivider = document.getElementById("services-transition-divider");
          if (servicesDivider && servicesSection) {
            gsap.fromTo(
              servicesDivider,
              { scaleX: 0, opacity: 0, transformOrigin: "center center" },
              {
                scaleX: 1,
                opacity: 0.8,
                duration: 1.1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: servicesSection,
                  start: "top 92%",
                  toggleActions: "play none none none",
                },
              }
            );
          }

          // Services rows subtle reveal
          const serviceArticles = servicesSection?.querySelectorAll("article");
          if (serviceArticles && serviceArticles.length > 0) {
            serviceArticles.forEach((article) => {
              gsap.fromTo(
                article,
                { y: 35, opacity: 0.85 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.8,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: article,
                    start: "top 85%",
                    toggleActions: "play none none none",
                  },
                }
              );
            });
          }

          // ==========================================================
          // TRANSITION 02: Services -> Portfolio Section Transition
          // ==========================================================
          const portfolioDivider = document.getElementById("portfolio-transition-divider");
          if (portfolioDivider && portfolioSection) {
            gsap.fromTo(
              portfolioDivider,
              { scaleX: 0, opacity: 0, transformOrigin: "center center" },
              {
                scaleX: 1,
                opacity: 0.85,
                duration: 1.1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: portfolioSection,
                  start: "top 90%",
                  toggleActions: "play none none none",
                },
              }
            );
          }

          // Portfolio project cards subtle upward reveal
          const projectCards = portfolioSection?.querySelectorAll("article");
          if (projectCards && projectCards.length > 0) {
            projectCards.forEach((card) => {
              gsap.fromTo(
                card,
                { y: 40, opacity: 0.88 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.85,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none none",
                  },
                }
              );
            });
          }

          // ==========================================================
          // TRANSITION 03: Portfolio -> Contact Section Transition
          // ==========================================================
          const contactTransitionLine = document.getElementById("contact-section-transition-line");
          if (contactTransitionLine && contactSection) {
            gsap.fromTo(
              contactTransitionLine,
              { scaleX: 0, opacity: 0, transformOrigin: "center center" },
              {
                scaleX: 1,
                opacity: 1,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: contactSection,
                  start: "top 90%",
                  toggleActions: "play none none none",
                },
              }
            );
          }

          // Contact Parallax Layers
          const techGrid = document.getElementById("contact-technical-grid");
          if (techGrid && contactSection) {
            gsap.to(techGrid, {
              y: -30,
              ease: "none",
              scrollTrigger: {
                trigger: contactSection,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            });
          }

          const archIllustration = document.getElementById("contact-architectural-illustration");
          if (archIllustration && contactSection) {
            gsap.to(archIllustration, {
              y: -50,
              ease: "none",
              scrollTrigger: {
                trigger: contactSection,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            });
          }

          const outlineWordmark = document.getElementById("contact-outline-wordmark");
          if (outlineWordmark && contactSection) {
            gsap.to(outlineWordmark, {
              y: -100,
              ease: "none",
              scrollTrigger: {
                trigger: contactSection,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            });
          }

          // Contact Metadata Entrance
          const metaItems = document.querySelectorAll(".contact-meta-item");
          if (metaItems.length > 0 && contactSection) {
            gsap.fromTo(
              metaItems,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power2.out",
                stagger: 0.1,
                scrollTrigger: {
                  trigger: contactSection,
                  start: "top 82%",
                  toggleActions: "play none none none",
                },
              }
            );
          }

          // Contact Headline Mask Reveal
          const headlineLines = document.querySelectorAll(".contact-headline-line");
          const headlineContainer = document.getElementById("contact-headline-container") || contactSection;
          if (headlineLines.length > 0 && headlineContainer) {
            gsap.fromTo(
              headlineLines,
              { yPercent: 115 },
              {
                yPercent: 0,
                duration: 0.9,
                ease: "power3.out",
                stagger: 0.14,
                scrollTrigger: {
                  trigger: headlineContainer,
                  start: "top 82%",
                  toggleActions: "play none none none",
                },
              }
            );
          }

          // Signature Symbol Scroll Modulation
          const signatureSymbol = document.getElementById("contact-signature-symbol");
          if (signatureSymbol) {
            gsap.fromTo(
              signatureSymbol,
              {
                rotation: 0,
                scale: 0.94,
                y: 20,
              },
              {
                rotation: 60,
                scale: 1.06,
                y: -15,
                ease: "none",
                scrollTrigger: {
                  trigger: signatureSymbol,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1,
                },
              }
            );
          }

          // Contact Form Field Entrance
          const formItems = document.querySelectorAll(".contact-form-item");
          const formSection = document.getElementById("contact-form-section") || contactSection;
          if (formItems.length > 0 && formSection) {
            gsap.fromTo(
              formItems,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.65,
                ease: "power2.out",
                stagger: 0.08,
                scrollTrigger: {
                  trigger: formSection,
                  start: "top 88%",
                  toggleActions: "play none none none",
                },
              }
            );
          }

          // ==========================================================
          // TRANSITION 04: Contact -> Footer Choreography
          // ==========================================================
          if (footerSection) {
            const footerDivider = document.getElementById("footer-divider");
            if (footerDivider) {
              gsap.fromTo(
                footerDivider,
                { scaleX: 0, transformOrigin: "left center" },
                {
                  scaleX: 1,
                  duration: 1,
                  ease: "power3.inOut",
                  scrollTrigger: {
                    trigger: footerSection,
                    start: "top 88%",
                    toggleActions: "play none none none",
                  },
                }
              );
            }

            const footerItems = document.querySelectorAll(".footer-stagger-item");
            if (footerItems.length > 0) {
              gsap.fromTo(
                footerItems,
                { opacity: 0, y: 20 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.65,
                  ease: "power2.out",
                  stagger: 0.08,
                  scrollTrigger: {
                    trigger: footerSection,
                    start: "top 85%",
                    toggleActions: "play none none none",
                  },
                }
              );
            }

            const footerWordmark = document.getElementById("footer-wordmark");
            if (footerWordmark) {
              gsap.fromTo(
                footerWordmark,
                { yPercent: 40, opacity: 0 },
                {
                  yPercent: 0,
                  opacity: 1,
                  duration: 1,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: footerWordmark,
                    start: "top 95%",
                    toggleActions: "play none none none",
                  },
                }
              );
            }
          }

          ScrollTrigger.refresh();
        });

        return () => ctx?.revert();
      });
    });

    return () => {
      cancelAnimationFrame(rafId);
      mm?.revert();
      ctx?.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return null;
}
