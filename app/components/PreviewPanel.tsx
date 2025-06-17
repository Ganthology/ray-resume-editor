"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { PDFViewer } from "@react-pdf/renderer";
import React from "react";
import ResumePDF from "./ResumePDF";
import { useResumeStore } from "../store/resumeStore";

export default function PreviewPanel() {
  const resumeData = useResumeStore((state) => state.resumeData);

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
        <div className="w-full h-[800px] border border-gray-200 rounded-lg overflow-hidden">
          <PDFViewer width="100%" height="100%" showToolbar={true}>
            <ResumePDF resumeData={resumeData} />
          </PDFViewer>
        </div>
      </CardContent>
    </Card>
  );
}
