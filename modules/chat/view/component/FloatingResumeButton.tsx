"use client";

import React, { useState } from "react";
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from "@/platform/component/ui/responsive-dialog";

import { Button } from "@/platform/component/ui/button";
import { FileText } from "lucide-react";
import ResumePreview from "@/modules/editor/view/component/ResumePreview";
import { useResumePreview } from "@/modules/editor/view/viewModel/useResumePreview";

export default function FloatingResumeButton() {
  const [open, setOpen] = useState(false);
  const { isLoading, error, pdfUrl, generatePDF } = useResumePreview();

  return (
    <ResponsiveDialog open={open} onOpenChange={setOpen}>
      <ResponsiveDialogTrigger asChild>
        <Button
          size="lg"
          className="fixed bottom-6 right-6 z-50 rounded-full h-14 w-14 shadow-lg hover:shadow-xl  bg-green-600 hover:bg-green-700"
          aria-label="Resume Preview"
        >
          <FileText className="w-6 h-6" />
        </Button>
      </ResponsiveDialogTrigger>
      <ResponsiveDialogContent className="max-w-4xl max-h-[90vh]">
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>Resume Preview</ResponsiveDialogTitle>
        </ResponsiveDialogHeader>
        <div className="max-h-[calc(90vh-120px)] overflow-y-auto">
          <ResumePreview
            isLoading={isLoading}
            error={error}
            pdfUrl={pdfUrl}
            generatePDF={generatePDF}
          />
        </div>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}
