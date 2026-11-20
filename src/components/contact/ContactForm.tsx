"use client";

import React, { useState } from "react";
import { ArrowUpRight, CheckCircle2, AlertCircle, Loader2, Sparkles, Send } from "lucide-react";
import { validateContactForm, ValidationErrors } from "@/lib/validation";
import { ContactField } from "./ContactField";

const PROJECT_TYPES = [
  "Brand Identity",
  "Digital Experiences",
  "Product Design",
  "Creative Development",
  "Full-Stack Ecosystem",
];

const BUDGET_RANGES = [
  "$10k – $25k",
  "$25k – $50k",
  "$50k – $100k",
  "$100k+",
];

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Brand Identity",
    budget: "$25k – $50k",
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

  const handleBudgetSelect = (budget: string) => {
    setFormData((prev) => ({ ...prev, budget }));
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
        projectType: "Brand Identity",
        budget: "$25k – $50k",
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
      className="relative w-full max-w-4xl mx-auto text-[#F2F0E9]"
    >
      {/* Success Notification Card */}
      {status === "success" ? (
        <div
          role="status"
          aria-live="polite"
          className="p-8 sm:p-14 bg-[#141414] border border-[#333333] rounded-sm space-y-6 text-center max-w-2xl mx-auto shadow-2xl"
        >
          <div className="w-16 h-16 rounded-full bg-[#D7FF3F]/10 border border-[#D7FF3F]/30 flex items-center justify-center mx-auto text-[#D7FF3F]">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-3">
            <h4 className="font-bebas text-4xl sm:text-5xl tracking-wide uppercase text-[#F2F0E9]">
              INQUIRY RECEIVED
            </h4>
            <p className="font-grotesk text-lg text-[#F2F0E9]/90 leading-relaxed max-w-lg mx-auto">
              {serverMessage}
            </p>
          </div>
          <div className="pt-2 font-grotesk text-sm text-[#A8A7A1]">
            Reference Code: <span className="text-[#D7FF3F] font-semibold">{referenceId}</span> · Typical turnaround: 24–48 hours
          </div>
          <div className="pt-4">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#F2F0E9] hover:bg-[#D7FF3F] text-[#101010] font-grotesk font-semibold text-sm tracking-wider uppercase transition-colors cursor-pointer rounded-xs"
            >
              <span>Submit Another Brief</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* High-Visibility, Clean Form Card */
        <div className="relative rounded-sm border border-[#333333] bg-[#141414]/95 backdrop-blur-xl p-7 sm:p-12 lg:p-14 shadow-2xl">
          {/* Form Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-8 border-b border-[#292929] gap-4">
            <div>
              <div className="flex items-center gap-2 font-grotesk text-xs sm:text-sm text-[#D7FF3F] font-semibold uppercase tracking-wider mb-2">
                <span>Direct Commission</span>
              </div>
              <h3 className="font-bebas text-4xl sm:text-5xl text-[#F2F0E9] uppercase tracking-wide leading-none">
                PROJECT INTAKE
              </h3>
            </div>

            <div className="flex items-center gap-2.5 font-grotesk text-sm text-[#A8A7A1]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D7FF3F] animate-pulse" />
              <span>Direct studio commission</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-9">
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

            {/* Server Error Alert */}
            {status === "error" && (
              <div
                role="alert"
                className="p-4 bg-red-950/40 border border-red-500/60 text-red-200 rounded-xs flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div className="text-base font-grotesk">
                  <span className="font-bold block">Transmission Alert:</span>
                  {serverMessage}
                </div>
              </div>
            )}

            {/* 1. Project Discipline Selection */}
            <div className="space-y-3.5">
              <label className="block font-grotesk text-sm sm:text-base text-[#F2F0E9] font-medium tracking-wide">
                1. Project Discipline <span className="text-[#D7FF3F] font-bold">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {PROJECT_TYPES.map((type) => {
                  const isSelected = formData.projectType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleTypeSelect(type)}
                      className={`px-4 py-3 text-sm font-grotesk tracking-wide rounded-sm border text-left sm:text-center transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "bg-[#D7FF3F] text-[#101010] border-[#D7FF3F] font-bold shadow-[0_0_20px_rgba(215,255,63,0.3)]"
                          : "bg-[#181818] text-[#C4C3BE] hover:text-[#F2F0E9] border-[#333333] hover:border-[#555555]"
                      }`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Client Identity (Name & Email) */}
            <div className="space-y-3.5">
              <span className="block font-grotesk text-sm sm:text-base text-[#F2F0E9] font-medium tracking-wide">
                2. Your Contact Information
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <ContactField
                  id="contact_name"
                  name="name"
                  label="Name / Company"
                  required
                  placeholder="e.g. John Wesley"
                  autoComplete="name"
                  value={formData.name}
                  error={errors.name}
                  disabled={status === "submitting"}
                  onChange={handleChange}
                />

                <ContactField
                  id="contact_email"
                  name="email"
                  type="email"
                  label="Email Address"
                  required
                  placeholder="e.g. john@company.com"
                  autoComplete="email"
                  value={formData.email}
                  error={errors.email}
                  disabled={status === "submitting"}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* 3. Estimated Scope / Budget */}
            <div className="space-y-3.5">
              <label className="block font-grotesk text-sm sm:text-base text-[#F2F0E9] font-medium tracking-wide">
                3. Estimated Investment Range (USD)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {BUDGET_RANGES.map((b) => {
                  const isSelected = formData.budget === b;
                  return (
                    <button
                      key={b}
                      type="button"
                      onClick={() => handleBudgetSelect(b)}
                      className={`px-4 py-3 text-sm font-grotesk tracking-wide rounded-sm border text-center transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "bg-[#F2F0E9] text-[#101010] border-[#F2F0E9] font-bold shadow-md"
                          : "bg-[#181818] text-[#A8A7A1] hover:text-[#F2F0E9] border-[#333333] hover:border-[#555555]"
                      }`}
                    >
                      {b}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Project Vision & Goals */}
            <div className="space-y-3.5">
              <ContactField
                id="contact_message"
                name="message"
                type="textarea"
                label="4. Tell Us About Your Project"
                required
                rows={5}
                placeholder="Briefly describe your objectives, deliverables, timeline, or anything unique you have in mind..."
                value={formData.message}
                error={errors.message}
                disabled={status === "submitting"}
                onChange={handleChange}
              />
            </div>

            {/* Submission Section */}
            <div className="pt-6 border-t border-[#292929] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="group relative inline-flex items-center justify-center gap-3 px-10 py-4.5 bg-[#D7FF3F] hover:bg-[#F2F0E9] text-[#101010] font-grotesk font-semibold text-sm sm:text-base tracking-wider uppercase rounded-xs transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_10px_30px_rgba(215,255,63,0.25)] hover:shadow-[0_10px_35px_rgba(242,240,233,0.3)] active:translate-y-0.5"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-[#101010]" />
                    <span>Sending Brief...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Project Brief</span>
                    <Send className="w-4 h-4 text-[#101010] group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                  </>
                )}
              </button>

              <div className="flex flex-col sm:items-end text-sm font-grotesk text-[#A8A7A1] space-y-1">
                <span className="text-[#F2F0E9] font-medium">Direct review by studio directors</span>
                <span>Response within 24–48 hours · Strictly confidential</span>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
