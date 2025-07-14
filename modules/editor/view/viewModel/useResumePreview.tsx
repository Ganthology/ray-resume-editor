import { useRef, useState } from "react";

import { useCallback } from "react";
import { useResumeStore } from "@/app/store/resumeStore";

export function useResumePreview() {
  const resumeData = useResumeStore((state) => state.resumeData);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pdfUrlRef = useRef<string | null>(null);

  // Generate PDF blob from resume data
  const generatePDF = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Dynamically import to avoid SSR issues
      const { pdf } = await import("@react-pdf/renderer");
      const { default: ResumePDF } = await import(
        "../../../resume/view/component/ResumePDF"
      );

      // Generate PDF blob
      const blob = await pdf(<ResumePDF resumeData={resumeData} />).toBlob();

      // Create new blob URL with parameters for optimal viewing
      const url = URL.createObjectURL(blob);

      // Clean up previous URL
      if (pdfUrlRef.current) {
        URL.revokeObjectURL(pdfUrlRef.current);
      }

      // Set new URL
      pdfUrlRef.current = url;
      setPdfUrl(url);
    } catch (err) {
      console.error("Error generating PDF:", err);
      setError("Failed to generate PDF preview");
    } finally {
      setIsLoading(false);
    }
  }, [resumeData]);

  return {
    isLoading,
    error,
    pdfUrl,
    pdfUrlRef,
    generatePDF,
  };
}
