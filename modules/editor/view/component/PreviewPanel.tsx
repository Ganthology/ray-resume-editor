"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/platform/component/ui/card";
import React, { useEffect } from "react";

import { Badge } from "@/platform/component/ui/badge";
import ResponsivePDFPreview from "./ResponsivePDFPreview";
import StylesPanel from "./StylesPanel";
import { useResumePreview } from "../viewModel/useResumePreview";
import { useResumeStore } from "@/app/store/resumeStore";

const DEFAULT_SPACING = { horizontal: 30, vertical: 30 };

export default function PreviewPanel() {
  const { isLoading, error, pdfUrl, generatePDF } = useResumePreview();
  const { resumeData, updateStyles } = useResumeStore();

  const handleFitModeChange = (mode: "compact" | "normal") => {
    updateStyles({
      ...resumeData.styles,
      fitMode: mode,
    });
  };

  const handleSpacingChange = (spacing: { horizontal: number; vertical: number }) => {
    updateStyles({
      ...resumeData.styles,
      fitMode: resumeData.styles?.fitMode || "normal",
      spacing,
    });
  };

  // Generate PDF when resume data changes
  useEffect(() => {
    generatePDF();
  }, [generatePDF, resumeData.styles]);

  return (
    <div className="space-y-4">
      <StylesPanel
        fitMode={resumeData.styles?.fitMode || "normal"}
        spacing={resumeData.styles?.spacing || DEFAULT_SPACING}
        onFitModeChange={handleFitModeChange}
        onSpacingChange={handleSpacingChange}
      />

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
          <ResponsivePDFPreview
            isLoading={isLoading}
            error={error}
            pdfUrl={pdfUrl}
            generatePDF={generatePDF}
            resumeData={resumeData}
          />
        </CardContent>
      </Card>
    </div>
  );
}
