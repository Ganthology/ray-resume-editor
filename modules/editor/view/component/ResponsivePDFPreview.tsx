"use client";

import { useEffect, useState } from "react";
import { ResumeData } from "@/modules/resume/data/entity/ResumeData";
import MobilePDFEmbed from "./MobilePDFEmbed";
import ResumePreview from "./ResumePreview";

interface ResponsivePDFPreviewProps {
  isLoading: boolean;
  error: string | null;
  pdfUrl: string | null;
  generatePDF: () => void;
  resumeData: ResumeData;
}

export default function ResponsivePDFPreview({
  isLoading,
  error,
  pdfUrl,
  generatePDF,
  resumeData,
}: ResponsivePDFPreviewProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    // Check on mount
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // For mobile devices, use the embed-based component
  if (isMobile) {
    return (
      <div className="w-full h-[600px] md:h-[800px]">
        <MobilePDFEmbed resumeData={resumeData} />
      </div>
    );
  }

  // For desktop, use the iframe-based component
  return (
    <ResumePreview
      isLoading={isLoading}
      error={error}
      pdfUrl={pdfUrl}
      generatePDF={generatePDF}
    />
  );
}