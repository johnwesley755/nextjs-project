import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OFFGRID® — Independent Creative & Digital Studio",
  description:
    "Ideas without the ordinary. We build brands, products, and digital experiences for people who refuse to blend in.",
  keywords: [
    "OFFGRID",
    "Creative Studio",
    "Digital Studio",
    "Brand Identity",
    "Design Engineering",
    "Digital Products",
  ],
  authors: [{ name: "OFFGRID®" }],
  openGraph: {
    title: "OFFGRID® — Ideas without the ordinary",
    description:
      "Independent Creative & Digital Studio. We build brands, products, and digital experiences for people who refuse to blend in.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth" suppressHydrationWarning>
      <body
        className="min-h-full flex flex-col bg-[#101010] text-[#F2F0E9] font-sans antialiased selection:bg-[#D7FF3F] selection:text-[#101010]"
        suppressHydrationWarning
      >
        {/* Tactile fine grain overlay */}
        <div
          className="pointer-events-none fixed inset-0 z-50 opacity-[0.032] mix-blend-screen"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />
        {children}
      </body>
    </html>
  );
}
