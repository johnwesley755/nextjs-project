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

    const { name, email, projectType, message } = body;
    const resendApiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL || "hello@offgrid.studio";

    // 5. Dispatch or Development Mode
    if (resendApiKey) {
      try {
        const resendResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "OFFGRID Studio <inquiry@offgrid.studio>",
            to: [contactEmail],
            reply_to: email,
            subject: `[OFFGRID INQUIRY] ${name} — ${projectType || "General"}`,
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #101010; color: #F2F0E9; padding: 40px; border-radius: 4px;">
                <h1 style="color: #D7FF3F; font-size: 24px; margin-bottom: 24px; text-transform: uppercase; letter-spacing: 1px;">New Client Inquiry</h1>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Discipline / Project Type:</strong> ${projectType || "Not specified"}</p>
                <div style="margin-top: 24px; padding: 20px; background: #1c1c1c; border-left: 3px solid #D7FF3F;">
                  <h3 style="margin-top: 0; color: #77776F; font-size: 12px; text-transform: uppercase;">Message:</h3>
                  <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
                </div>
                <p style="margin-top: 32px; font-size: 11px; color: #77776F;">Dispatched via OFFGRID® Web Platform · ${new Date().toISOString()}</p>
              </div>
            `,
          }),
        });

        if (!resendResponse.ok) {
          const errData = await resendResponse.json();
          console.error("[OFFGRID API] Resend email delivery failed:", errData);
          return NextResponse.json(
            {
              success: false,
              error: "Unable to dispatch email through provider. Please contact us directly.",
            },
            { status: 502 }
          );
        }

        return NextResponse.json(
          {
            success: true,
            delivered: true,
            message: "Thank you. Your message was dispatched. We'll get back to you promptly.",
          },
          { status: 200 }
        );
      } catch (err) {
        console.error("[OFFGRID API] Network error connecting to Resend:", err);
        return NextResponse.json(
          { success: false, error: "Network error transmitting inquiry." },
          { status: 500 }
        );
      }
    } else {
      // Resend API key is not configured — log clearly for local/preview environments
      console.info(
        `[OFFGRID API / DEV INQUIRY RECEIVED]\nName: ${name}\nEmail: ${email}\nType: ${projectType || "General"}\nMessage: ${message}`
      );

      return NextResponse.json(
        {
          success: true,
          delivered: false,
          mode: "development",
          message:
            "Thank you. Your inquiry has been received (Development mode: RESEND_API_KEY environment variable not configured).",
        },
        { status: 200 }
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
