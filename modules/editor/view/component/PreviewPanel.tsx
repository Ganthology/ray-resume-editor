"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/platform/component/ui/card";
import React, { useEffect } from "react";

import { Badge } from "@/platform/component/ui/badge";
import ResumePreview from "./ResumePreview";
import { useResumePreview } from "../viewModel/useResumePreview";

export default function PreviewPanel() {
  const { isLoading, error, pdfUrl, generatePDF } = useResumePreview();

  // Generate PDF when resume data changes
  useEffect(() => {
    generatePDF();
  }, [generatePDF]);

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
        <ResumePreview
          isLoading={isLoading}
          error={error}
          pdfUrl={pdfUrl}
          generatePDF={generatePDF}
        />
      </CardContent>
    </Card>
  );
}
