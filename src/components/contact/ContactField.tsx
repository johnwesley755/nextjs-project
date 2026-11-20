"use client";

import React from "react";
import { AlertCircle } from "lucide-react";

interface ContactFieldProps {
  id: string;
  name: string;
  label: string;
  index: string;
  type?: "text" | "email" | "textarea";
  required?: boolean;
  placeholder?: string;
  value: string;
  error?: string;
  disabled?: boolean;
  rows?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export function ContactField({
  id,
  name,
  label,
  index,
  type = "text",
  required = false,
  placeholder,
  value,
  error,
  disabled = false,
  rows = 4,
  onChange,
}: ContactFieldProps) {
  const isTextarea = type === "textarea";

  return (
    <div className="contact-form-item group relative space-y-2 pb-2">
      {/* Editorial Index & Field Label (Natural Case - No Uppercase) */}
      <div className="flex items-baseline justify-between font-grotesk text-xs tracking-wide text-[#77776F]">
        <label
          htmlFor={id}
          className="cursor-pointer text-[#F2F0E9]/85 font-medium group-focus-within:text-[#D7FF3F] transition-colors"
        >
          {label} {required && <span className="text-[#D7FF3F]">*</span>}
        </label>
        <span className="text-[#77776F]/60 text-[11px] group-focus-within:text-[#D7FF3F]/80 transition-colors">
          {index}
        </span>
      </div>

      {/* Minimalist Transparent Input with Bottom Hairline Rule */}
      {isTextarea ? (
        <textarea
          id={id}
          name={name}
          required={required}
          rows={rows}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onChange={onChange}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}_error` : undefined}
          className={`w-full py-3.5 bg-transparent text-[#F2F0E9] border-b font-grotesk text-base sm:text-lg placeholder:text-[#77776F]/45 focus:outline-none transition-colors duration-200 resize-y ${
            error
              ? "border-red-500/80 bg-red-950/10"
              : "border-[#292929] hover:border-[#77776F] focus:border-[#D7FF3F]"
          }`}
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
          onChange={onChange}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}_error` : undefined}
          className={`w-full py-3.5 bg-transparent text-[#F2F0E9] border-b font-grotesk text-base sm:text-lg placeholder:text-[#77776F]/45 focus:outline-none transition-colors duration-200 ${
            error
              ? "border-red-500/80 bg-red-950/10"
              : "border-[#292929] hover:border-[#77776F] focus:border-[#D7FF3F]"
          }`}
        />
      )}

      {/* Accessible Inline Validation Error */}
      {error && (
        <p
          id={`${id}_error`}
          role="alert"
          className="font-grotesk text-xs text-red-400 flex items-center gap-1.5 pt-1"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
