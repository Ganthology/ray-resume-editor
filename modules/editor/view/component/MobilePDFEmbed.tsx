"use client";

import { useState, useEffect, useRef } from "react";
import { ResumeData } from "@/modules/resume/data/entity/ResumeData";

interface MobilePDFEmbedProps {
  resumeData: ResumeData;
}

export default function MobilePDFEmbed({ resumeData }: MobilePDFEmbedProps) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const urlRef = useRef<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const generatePDF = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Dynamically import to avoid SSR issues
        const [{ pdf }, { default: ResumePDF }] = await Promise.all([
          import("@react-pdf/renderer"),
          import("@/modules/resume/view/component/ResumePDF")
        ]);

        if (isCancelled) return;

        // Generate PDF blob
        const pdfBlob = await pdf(<ResumePDF resumeData={resumeData} />).toBlob();

        if (isCancelled) return;

        // Clean up previous URL
        if (urlRef.current) {
          URL.revokeObjectURL(urlRef.current);
        }

        // Create new blob URL
        const url = URL.createObjectURL(pdfBlob);
        urlRef.current = url;
        setPdfUrl(url);
        setIsLoading(false);

      } catch (err) {
        if (!isCancelled) {
          console.error("Error generating PDF:", err);
          setError("Failed to generate PDF preview");
          setIsLoading(false);
        }
      }
    };

    generatePDF();

    return () => {
      isCancelled = true;
      if (urlRef.current) {
        URL.revokeObjectURL(urlRef.current);
      }
    };
  }, [resumeData]);

  if (isLoading) {
    return (
      <div className="w-full h-full border border-gray-200 rounded-lg overflow-hidden bg-white">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">Generating PDF...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full border border-gray-200 rounded-lg overflow-hidden bg-white">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <p className="text-sm text-red-600 mb-2">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!pdfUrl) {
    return (
      <div className="w-full h-full border border-gray-200 rounded-lg overflow-hidden bg-white">
        <div className="flex items-center justify-center h-full">
          <p className="text-sm text-gray-600">No PDF generated</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full border border-gray-200 rounded-lg overflow-hidden bg-white">
      {/* Mobile-optimized PDF embed */}
      <embed
        src={pdfUrl}
        type="application/pdf"
        width="100%"
        height="100%"
        style={{
          border: "none",
          display: "block",
        }}
        title="Resume Preview"
        // Mobile-specific attributes
        className="touch-pan-x touch-pan-y"
      />
      
      {/* Fallback for browsers that don't support embed */}
      <div className="hidden">
        <object
          data={pdfUrl}
          type="application/pdf"
          width="100%"
          height="100%"
          style={{ border: "none" }}
        >
          <p className="text-center p-4">
            Your browser doesn&apos;t support PDF viewing.{" "}
            <a
              href={pdfUrl}
              download="resume.pdf"
              className="text-blue-600 underline"
            >
              Download the PDF
            </a>{" "}
            instead.
          </p>
        </object>
      </div>
    </div>
  );
}