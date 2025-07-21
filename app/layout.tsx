import "./globals.css";

import { Geist, Geist_Mono } from "next/font/google";

import { AuthProvider } from "@/platform/auth/AuthContext";
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
    default: "RaysumeAI - AI-Powered Professional Resume Builder",
    template: "%s | RaysumeAI",
  },
  description:
    "Create professional resumes effortlessly with RaysumeAI. AI-powered resume builder with PDF export, multiple sections, drag-and-drop functionality, and intelligent assistance. Build your perfect resume in minutes.",
  keywords: [
    "resume builder",
    "CV maker",
    "AI resume builder",
    "professional resume",
    "resume template",
    "PDF resume",
    "online resume builder",
    "job application",
    "career tools",
    "resume creator",
    "CV generator",
    "AI-powered resume",
    "RaysumeAI",
  ],
  authors: [{ name: "Ray" }],
  creator: "Ray",
  publisher: "RaysumeAI",
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
    url: "https://your-domain.com",
    title: "RaysumeAI - AI-Powered Professional Resume Builder",
    description:
      "Create professional resumes effortlessly with RaysumeAI. AI-powered resume builder with PDF export, multiple sections, drag-and-drop functionality, and intelligent assistance. Build your perfect resume in minutes.",
    siteName: "RaysumeAI",
    images: [
      {
        url: "https://your-domain.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ray Resume Editor - AI-Powered Professional Resume Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RaysumeAI - AI-Powered Professional Resume Builder",
    description:
      "Create professional resumes effortlessly with RaysumeAI. AI-powered resume builder with PDF export, multiple sections, drag-and-drop functionality, and intelligent assistance. Build your perfect resume in minutes.",
    images: ["https://your-domain.com/og-image.png"],
    creator: "@ray",
  },
  alternates: {
    canonical: "https://your-domain.com",
  },
  category: "productivity",
  classification: "Resume Builder",
  verification: {
    google: "your-google-site-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "RaysumeAI",
  },
  formatDetection: {
    telephone: false,
  },
  metadataBase: new URL("https://your-domain.com"),
  other: {
    "google-site-verification": "your-google-site-verification-code",
    "msvalidate.01": "your-bing-site-verification-code",
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
              name: "RaysumeAI",
              description:
                "AI-powered professional resume builder with PDF export, multiple sections, and intelligent assistance",
              url: "https://your-domain.com",
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
              screenshot: "https://your-domain.com/og-image.png",
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
          <Toaster richColors position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
