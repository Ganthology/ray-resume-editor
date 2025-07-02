import "./globals.css";

import { Geist, Geist_Mono } from "next/font/google";

import type { Metadata } from "next";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Ray Resume Editor - Free Professional Resume Builder",
    template: "%s | Ray Resume Editor",
  },
  description:
    "Create professional resumes effortlessly with Ray Resume Editor. Free online resume builder with PDF export, multiple sections, drag-and-drop functionality, and clean formatting. Build your perfect resume in minutes.",
  keywords: [
    "resume builder",
    "CV maker",
    "free resume builder",
    "professional resume",
    "resume template",
    "PDF resume",
    "online resume builder",
    "job application",
    "career tools",
    "resume creator",
    "CV generator",
    "resume maker online",
    "Ray Resume Editor",
  ],
  authors: [{ name: "Ray" }],
  creator: "Ray",
  publisher: "Ray Resume Editor",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ray-resume-editor.vercel.app",
    siteName: "Ray Resume Editor",
    title: "Ray Resume Editor - Free Professional Resume Builder",
    description:
      "Create professional resumes effortlessly with Ray Resume Editor. Free online resume builder with PDF export, multiple sections, and clean formatting.",
    images: [
      {
        url: "https://ray-resume-editor.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ray Resume Editor - Professional Resume Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ray Resume Editor - Free Professional Resume Builder",
    description:
      "Create professional resumes effortlessly. Free online resume builder with PDF export and clean formatting.",
    images: ["https://ray-resume-editor.vercel.app/og-image.png"],
    creator: "@ray", // Update with actual Twitter handle if available
  },
  alternates: {
    canonical: "https://ray-resume-editor.vercel.app",
  },
  verification: {
    google: "", // Add Google Search Console verification code when available
  },
  category: "productivity",
  classification: "Resume Builder",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://ray-resume-editor.vercel.app"),
  other: {
    "application-name": "Ray Resume Editor",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Ray Resume Editor",
    "theme-color": "#ffffff",
    "msapplication-TileColor": "#ffffff",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Ray Resume Editor",
              description:
                "Free professional resume builder with PDF export, multiple sections, and clean formatting",
              url: "https://ray-resume-editor.vercel.app",
              applicationCategory: "ProductivityApplication",
              operatingSystem: "Web Browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              author: {
                "@type": "Person",
                name: "Ray",
              },
              datePublished: "2024",
              inLanguage: "en-US",
              isAccessibleForFree: true,
              browserRequirements: "Requires JavaScript. Requires HTML5.",
              screenshot: "https://ray-resume-editor.vercel.app/og-image.png",
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
