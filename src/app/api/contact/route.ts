import { NextRequest, NextResponse } from "next/server";
import { validateContactForm, ContactFormData } from "@/lib/validation";

// Simple in-memory sliding window rate limiter
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return true;
}

const FORMSPREE_ENDPOINT =
  process.env.FORMSPREE_ENDPOINT || "https://formspree.io/f/xljbwrkd";

export async function POST(req: NextRequest) {
  try {
    // 1. IP identification & Rate Limiting
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many submissions. Please wait a moment before trying again.",
        },
        { status: 429 }
      );
    }

    // 2. Parse & Validate Payload
    let body: ContactFormData;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON payload." },
        { status: 400 }
      );
    }

    // 3. Honeypot Spam Protection
    if (body.honeypot && body.honeypot.trim() !== "") {
      // Quietly reject bot submissions without warning them
      return NextResponse.json(
        { success: true, message: "Inquiry received." },
        { status: 200 }
      );
    }

    // 4. Server-Side Data Validation
    const { isValid, errors } = validateContactForm(body);
    if (!isValid) {
      return NextResponse.json(
        {
          success: false,
          error: "Please correct the errors in the form.",
          validationErrors: errors,
        },
        { status: 400 }
      );
    }

    const { name, email, projectType, budget, message } = body;

    // 5. Dispatch to Formspree Endpoint
    try {
      const formspreeResponse = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          projectType: projectType || "Not specified",
          budget: budget || "Not specified",
          message,
          _subject: `[OFFGRID INQUIRY] ${name} — ${projectType || "General"}`,
        }),
      });

      const responseData = await formspreeResponse.json().catch(() => ({}));

      if (!formspreeResponse.ok) {
        console.error("[OFFGRID API] Formspree delivery failed:", responseData);
        return NextResponse.json(
          {
            success: false,
            error:
              responseData.error ||
              "Unable to dispatch inquiry through Formspree. Please try again or reach out via email.",
          },
          { status: formspreeResponse.status || 502 }
        );
      }

      return NextResponse.json(
        {
          success: true,
          delivered: true,
          message:
            "Thank you. Your project brief has been successfully received. We will review it and get back to you shortly.",
        },
        { status: 200 }
      );
    } catch (err) {
      console.error("[OFFGRID API] Network error connecting to Formspree:", err);
      return NextResponse.json(
        {
          success: false,
          error:
            "A network error occurred while connecting to the dispatch service. Please check your connection and retry.",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("[OFFGRID API] Unhandled server error in contact route:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected server error occurred." },
      { status: 500 }
    );
  }
}
