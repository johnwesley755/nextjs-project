"use client";

import React, { useState } from "react";
import { ArrowUpRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { validateContactForm, ValidationErrors } from "@/lib/validation";
import { ContactField } from "./ContactField";

const PROJECT_TYPES = [
  "Brand identity",
  "Website / digital experience",
  "Product design",
  "Creative development",
  "Something else",
];

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Brand identity",
    message: "",
    honeypot: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState<string>("");
  const [referenceId, setReferenceId] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleTypeSelect = (type: string) => {
    setFormData((prev) => ({ ...prev, projectType: type }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { isValid, errors: validationErrors } = validateContactForm(formData);
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setStatus("submitting");
    setServerMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setStatus("error");
        setServerMessage(
          data.error || "Unable to send your inquiry at this moment. Please try again."
        );
        if (data.validationErrors) {
          setErrors(data.validationErrors);
        }
        return;
      }

      setStatus("success");
      setReferenceId(Date.now().toString(36).toUpperCase());
      setServerMessage(data.message || "Thank you. Your message has been received.");
      setFormData({
        name: "",
        email: "",
        projectType: "Brand identity",
        message: "",
        honeypot: "",
      });
      setErrors({});
    } catch {
      setStatus("error");
      setServerMessage(
        "A connection problem prevented message transmission. Please check your network and retry."
      );
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setServerMessage("");
  };

  return (
    <div
      id="contact-form-container"
      className="relative w-full text-[#F2F0E9]"
    >
      {/* Success Notification State */}
      {status === "success" ? (
        <div
          role="status"
          aria-live="polite"
          className="p-8 sm:p-12 bg-[#181818]/90 border border-[#292929] space-y-4 max-w-2xl"
        >
          <div className="flex items-center gap-3 text-[#D7FF3F]">
            <CheckCircle2 className="w-6 h-6 shrink-0" />
            <h4 className="font-bebas text-3xl tracking-wider uppercase text-[#F2F0E9]">
              BRIEF TRANSMITTED
            </h4>
          </div>
          <p className="font-grotesk text-base sm:text-lg text-[#F2F0E9]/80 leading-relaxed">
            {serverMessage}
          </p>
          <p className="font-grotesk text-xs text-[#77776F]">
            Ref ID // {referenceId} · Response window: 1–2 business days
          </p>
          <div className="pt-4">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#F2F0E9] hover:bg-[#D7FF3F] text-[#101010] font-grotesk font-semibold text-xs tracking-wide transition-colors cursor-pointer"
            >
              <span>Send another message</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          {/* Honeypot anti-spam field */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="contact_hp_website">Website</label>
            <input
              id="contact_hp_website"
              type="text"
              name="honeypot"
              tabIndex={-1}
              autoComplete="off"
              value={formData.honeypot}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Form Left Side (Col 1-4): Title & Context */}
            <div className="lg:col-span-4 space-y-4">
              <h3 className="contact-form-item font-bebas text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[0.9] text-[#F2F0E9] uppercase">
                TELL US WHAT <br />
                YOU&apos;RE THINKING.
              </h3>
              <p className="contact-form-item font-grotesk text-sm sm:text-base text-[#77776F] leading-relaxed">
                A few details are all we need to get started. We review every brief thoroughly before responding.
              </p>
            </div>

            {/* Form Right Side (Col 5-12): Input Fields Ledger */}
            <div className="lg:col-span-8 space-y-8 lg:border-l lg:border-[#292929] lg:pl-12 xl:pl-16">
              {/* Server Error Alert */}
              {status === "error" && (
                <div
                  role="alert"
                  className="p-4 bg-red-950/30 border border-red-500/50 text-red-200 flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div className="text-sm font-grotesk">
                    <span className="font-bold block">Transmission Alert:</span>
                    {serverMessage}
                  </div>
                </div>
              )}

              {/* 2-Column Row: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <ContactField
                  id="contact_name"
                  name="name"
                  label="Your name"
                  index="01"
                  required
                  placeholder="How should we call you?"
                  value={formData.name}
                  error={errors.name}
                  disabled={status === "submitting"}
                  onChange={handleChange}
                />

                <ContactField
                  id="contact_email"
                  name="email"
                  type="email"
                  label="Email address"
                  index="02"
                  required
                  placeholder="you@example.com"
                  value={formData.email}
                  error={errors.email}
                  disabled={status === "submitting"}
                  onChange={handleChange}
                />
              </div>

              {/* Project Type Selector */}
              <div className="contact-form-item space-y-3 pt-2">
                <div className="flex items-baseline justify-between font-grotesk text-xs tracking-wide text-[#77776F]">
                  <span className="text-[#F2F0E9]/80 font-medium">Project type</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {PROJECT_TYPES.map((type) => {
                    const isSelected = formData.projectType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleTypeSelect(type)}
                        className={`px-3.5 py-1.5 text-xs font-grotesk tracking-wide transition-colors duration-150 border cursor-pointer ${
                          isSelected
                            ? "bg-[#D7FF3F] text-[#101010] border-[#D7FF3F] font-semibold shadow-[0_0_15px_rgba(215,255,63,0.25)]"
                            : "bg-transparent text-[#77776F] hover:text-[#F2F0E9] border-[#292929] hover:border-[#77776F]"
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message Details */}
              <ContactField
                id="contact_message"
                name="message"
                type="textarea"
                label="Tell us about your idea"
                index="04"
                required
                rows={4}
                placeholder="Tell us a little about your idea, scope, timeline or goals..."
                value={formData.message}
                error={errors.message}
                disabled={status === "submitting"}
                onChange={handleChange}
              />

              {/* Submit CTA */}
              <div className="contact-form-item pt-4 border-t border-[#292929] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 bg-[#F2F0E9] hover:bg-[#D7FF3F] text-[#101010] font-grotesk font-semibold text-xs tracking-wider transition-colors duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_5px_20px_rgba(0,0,0,0.5)] active:translate-y-0.5"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#101010]" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Send your message</span>
                      <ArrowUpRight className="w-4 h-4 text-[#101010] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>

                <span className="font-grotesk text-[11px] text-[#77776F] tracking-wide text-right">
                  Zero spam · Confidential inquiry
                </span>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
