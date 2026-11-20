/**
 * OFFGRID® Contact Form Validation Utilities
 */

export interface ContactFormData {
  name: string;
  email: string;
  projectType?: string;
  budget?: string;
  message: string;
  honeypot?: string;
}

export interface ValidationErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function validateContactForm(data: ContactFormData): {
  isValid: boolean;
  errors: ValidationErrors;
} {
  const errors: ValidationErrors = {};

  // Name validation
  const trimmedName = (data.name || "").trim();
  if (!trimmedName) {
    errors.name = "Please enter your name.";
  } else if (trimmedName.length < 2) {
    errors.name = "Name must be at least 2 characters.";
  } else if (trimmedName.length > 100) {
    errors.name = "Name cannot exceed 100 characters.";
  }

  // Email validation
  const trimmedEmail = (data.email || "").trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!trimmedEmail) {
    errors.email = "Please enter your email address.";
  } else if (!emailRegex.test(trimmedEmail)) {
    errors.email = "Please enter a valid email address.";
  } else if (trimmedEmail.length > 120) {
    errors.email = "Email address is too long.";
  }

  // Message validation
  const trimmedMessage = (data.message || "").trim();
  if (!trimmedMessage) {
    errors.message = "Please describe your project or idea.";
  } else if (trimmedMessage.length < 10) {
    errors.message = "Message must be at least 10 characters so we have enough context.";
  } else if (trimmedMessage.length > 3000) {
    errors.message = "Message cannot exceed 3,000 characters.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
