"use client";

import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from "@/platform/component/ui/responsive-dialog";
import { Settings } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/platform/component/ui/button";
import StylesPanel from "@/modules/editor/view/component/StylesPanel";
import { useResumeStore } from "@/app/store/resumeStore";

const DEFAULT_SPACING = { horizontal: 30, vertical: 30 };

export default function FloatingStylesButton() {
  const [open, setOpen] = useState(false);
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

  return (
    <ResponsiveDialog open={open} onOpenChange={setOpen}>
      <ResponsiveDialogTrigger asChild>
        <Button
          size="lg"
          className="fixed bottom-6 left-6 z-50 rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-all duration-200 bg-blue-600 hover:bg-blue-700"
          aria-label="Resume Styles"
        >
          <Settings className="w-6 h-6" />
        </Button>
      </ResponsiveDialogTrigger>
      <ResponsiveDialogContent className="max-w-md">
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>Resume Styles</ResponsiveDialogTitle>
        </ResponsiveDialogHeader>
        <div className="space-y-6">
          {/* Compact Fit Mode */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700">Layout Density</h3>
            <div className="flex gap-2">
              <Button
                variant={resumeData.styles?.fitMode === "compact" ? "default" : "outline"}
                size="sm"
                onClick={() => handleFitModeChange("compact")}
                className="flex-1"
              >
                Compact
              </Button>
              <Button
                variant={resumeData.styles?.fitMode === "normal" || !resumeData.styles?.fitMode ? "default" : "outline"}
                size="sm"
                onClick={() => handleFitModeChange("normal")}
                className="flex-1"
              >
                Normal
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              {resumeData.styles?.fitMode === "compact"
                ? "Tighter spacing, more content per page"
                : "Standard spacing for better readability"}
            </p>
          </div>

          {/* Spacing Controls */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-700">Page Margins</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSpacingChange(DEFAULT_SPACING)}
                disabled={(resumeData.styles?.spacing?.horizontal === DEFAULT_SPACING.horizontal && 
                           resumeData.styles?.spacing?.vertical === DEFAULT_SPACING.vertical) || 
                          (!resumeData.styles?.spacing)}
                className="text-xs"
              >
                Reset
              </Button>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-600 block mb-2">
                  Horizontal: {resumeData.styles?.spacing?.horizontal || DEFAULT_SPACING.horizontal}px
                </label>
                <input
                  type="range"
                  min="10"
                  max="60"
                  step="5"
                  value={resumeData.styles?.spacing?.horizontal || DEFAULT_SPACING.horizontal}
                  onChange={(e) => handleSpacingChange({
                    horizontal: parseInt(e.target.value),
                    vertical: resumeData.styles?.spacing?.vertical || DEFAULT_SPACING.vertical
                  })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs text-gray-600 block mb-2">
                  Vertical: {resumeData.styles?.spacing?.vertical || DEFAULT_SPACING.vertical}px
                </label>
                <input
                  type="range"
                  min="10"
                  max="60"
                  step="5"
                  value={resumeData.styles?.spacing?.vertical || DEFAULT_SPACING.vertical}
                  onChange={(e) => handleSpacingChange({
                    horizontal: resumeData.styles?.spacing?.horizontal || DEFAULT_SPACING.horizontal,
                    vertical: parseInt(e.target.value)
                  })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}