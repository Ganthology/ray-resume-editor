"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/platform/component/ui/card";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { Badge } from "@/platform/component/ui/badge";
import { useResumeStore } from "../../../../app/store/resumeStore";

export default function PreviewPanel() {
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

  // Generate PDF when resume data changes
  useEffect(() => {
    generatePDF();
  }, [generatePDF]);

  // Cleanup effect when component unmounts
  useEffect(() => {
    return () => {
      if (pdfUrlRef.current) {
        URL.revokeObjectURL(pdfUrlRef.current);
      }
    };
  }, []);

  return (
    <Card className="border-gray-200/60 shadow-sm bg-gray-50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            Resume Preview
            <Badge variant="secondary" className="text-xs">
              Live PDF
            </Badge>
          </CardTitle>
        </div>
        <p className="text-sm text-gray-600">
          Real-time PDF preview - exactly as it will be exported
        </p>
      </CardHeader>

      <CardContent className="p-6 border-t border-gray-200">
        <div className="w-full h-[800px] border border-gray-200 rounded-lg overflow-hidden bg-white">
          {isLoading && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
                <p className="text-sm text-gray-600">
                  Generating PDF preview...
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-sm text-red-600 mb-2">{error}</p>
                <button
                  onClick={generatePDF}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {pdfUrl && !isLoading && !error && (
            <iframe
              src={`${pdfUrl}#view=FitH&toolbar=0&navpanes=0&scrollbar=0`}
              width="100%"
              height="100%"
              style={{ border: "none" }}
              title="Resume Preview"
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
