"use client";

import React from "react";
import { AlertCircle } from "lucide-react";

interface ContactFieldProps {
  id: string;
  name: string;
  label: string;
  type?: "text" | "email" | "textarea";
  required?: boolean;
  placeholder?: string;
  value: string;
  error?: string;
  disabled?: boolean;
  rows?: number;
  autoComplete?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export function ContactField({
  id,
  name,
  label,
  type = "text",
  required = false,
  placeholder,
  value,
  error,
  disabled = false,
  rows = 4,
  autoComplete,
  onChange,
}: ContactFieldProps) {
  const isTextarea = type === "textarea";

  return (
    <div className="contact-form-item group relative space-y-2.5">
      {/* Label with clean asterisk and clear typography */}
      <label
        htmlFor={id}
        className="block font-grotesk text-sm sm:text-base text-[#F2F0E9] group-focus-within:text-[#D7FF3F] font-medium tracking-wide transition-colors"
      >
        {label} {required && <span className="text-[#D7FF3F] font-bold">*</span>}
      </label>

      {/* High-visibility structured input container */}
      <div
        className={`relative w-full rounded-sm bg-[#161616] border transition-all duration-200 ${
          error
            ? "border-red-500/80 bg-red-950/20"
            : "border-[#383838] hover:border-[#555555] focus-within:border-[#D7FF3F] focus-within:ring-2 focus-within:ring-[#D7FF3F]/25 shadow-inner"
        }`}
      >
        {isTextarea ? (
          <textarea
            id={id}
            name={name}
            required={required}
            rows={rows}
            placeholder={placeholder}
            value={value}
            disabled={disabled}
            autoComplete={autoComplete}
            onChange={onChange}
            aria-required={required}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}_error` : undefined}
            className="w-full px-5 py-4 bg-transparent text-[#F2F0E9] font-grotesk text-base sm:text-lg placeholder:text-[#77776F]/60 focus:outline-none resize-y leading-relaxed"
          />
        ) : (
          <input
            id={id}
            name={name}
            type={type}
            required={required}
            placeholder={placeholder}
            value={value}
            disabled={disabled}
            autoComplete={autoComplete}
            onChange={onChange}
            aria-required={required}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}_error` : undefined}
            className="w-full px-5 py-4 bg-transparent text-[#F2F0E9] font-grotesk text-base sm:text-lg placeholder:text-[#77776F]/60 focus:outline-none"
          />
        )}
      </div>

      {/* Accessible Inline Validation Error */}
      {error && (
        <p
          id={`${id}_error`}
          role="alert"
          className="font-grotesk text-sm text-red-400 flex items-center gap-1.5 pt-0.5"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
