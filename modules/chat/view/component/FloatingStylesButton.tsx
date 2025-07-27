"use client";

import React, { useState } from "react";
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from "@/platform/component/ui/responsive-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/platform/component/ui/select";

import { Button } from "@/platform/component/ui/button";
import { Settings } from "lucide-react";
import StylesPanel from "@/modules/editor/view/component/StylesPanel";
import { useResumeStore } from "@/app/store/resumeStore";

const DEFAULT_SPACING = { horizontal: 30, vertical: 30 };
const DEFAULT_FONTS = { headers: "Times-Roman", content: "Times-Roman" };

const FONT_OPTIONS = [
  { value: "Times-Roman", label: "Times New Roman (Classic)" },
  { value: "Helvetica", label: "Helvetica (Modern)" },
  { value: "Arial", label: "Arial (Clean)" },
  { value: "Georgia", label: "Georgia (Elegant)" },
  { value: "Garamond", label: "Garamond (Traditional)" },
  { value: "Calibri", label: "Calibri (Professional)" },
];

export default function FloatingStylesButton() {
  const [open, setOpen] = useState(false);
  const { resumeData, updateStyles } = useResumeStore();

  const handleFitModeChange = (mode: "compact" | "normal") => {
    updateStyles({
      ...resumeData.styles,
      fitMode: mode,
    });
  };

  const handleSpacingChange = (spacing: {
    horizontal: number;
    vertical: number;
  }) => {
    updateStyles({
      ...resumeData.styles,
      fitMode: resumeData.styles?.fitMode || "normal",
      spacing,
    });
  };

  const handleFontChange = (
    fontType: "headers" | "content",
    fontFamily: string
  ) => {
    const currentFonts = resumeData.styles?.fonts || DEFAULT_FONTS;
    updateStyles({
      ...resumeData.styles,
      fitMode: resumeData.styles?.fitMode || "normal",
      spacing: resumeData.styles?.spacing || DEFAULT_SPACING,
      fonts: {
        ...currentFonts,
        [fontType]: fontFamily,
      },
    });
  };

  return (
    <ResponsiveDialog open={open} onOpenChange={setOpen}>
      <ResponsiveDialogTrigger asChild>
        <Button
          size="lg"
          className="md:hidden fixed bottom-6 left-6 z-50 rounded-full h-14 w-14 shadow-lg hover:shadow-xl  bg-blue-600 hover:bg-blue-700"
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
            <h3 className="text-sm font-medium text-gray-700">
              Layout Density
            </h3>
            <div className="flex gap-2">
              <Button
                variant={
                  resumeData.styles?.fitMode === "compact"
                    ? "default"
                    : "outline"
                }
                size="sm"
                onClick={() => handleFitModeChange("compact")}
                className="flex-1"
              >
                Compact
              </Button>
              <Button
                variant={
                  resumeData.styles?.fitMode === "normal" ||
                  !resumeData.styles?.fitMode
                    ? "default"
                    : "outline"
                }
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

          {/* Font Selection */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700">Typography</h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-600 block mb-2">
                  Section Headers Font
                </label>
                <Select
                  value={
                    resumeData.styles?.fonts?.headers || DEFAULT_FONTS.headers
                  }
                  onValueChange={(value) => handleFontChange("headers", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select header font" />
                  </SelectTrigger>
                  <SelectContent>
                    {FONT_OPTIONS.map((font) => (
                      <SelectItem key={font.value} value={font.value}>
                        {font.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs text-gray-600 block mb-2">
                  Content Font
                </label>
                <Select
                  value={
                    resumeData.styles?.fonts?.content || DEFAULT_FONTS.content
                  }
                  onValueChange={(value) => handleFontChange("content", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select content font" />
                  </SelectTrigger>
                  <SelectContent>
                    {FONT_OPTIONS.map((font) => (
                      <SelectItem key={font.value} value={font.value}>
                        {font.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Spacing Controls */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-700">
                Page Margins
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSpacingChange(DEFAULT_SPACING)}
                disabled={
                  (resumeData.styles?.spacing?.horizontal ===
                    DEFAULT_SPACING.horizontal &&
                    resumeData.styles?.spacing?.vertical ===
                      DEFAULT_SPACING.vertical) ||
                  !resumeData.styles?.spacing
                }
                className="text-xs"
              >
                Reset
              </Button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-600 block mb-2">
                  Horizontal:{" "}
                  {resumeData.styles?.spacing?.horizontal ||
                    DEFAULT_SPACING.horizontal}
                  px
                </label>
                <input
                  type="range"
                  min="10"
                  max="60"
                  step="5"
                  value={
                    resumeData.styles?.spacing?.horizontal ||
                    DEFAULT_SPACING.horizontal
                  }
                  onChange={(e) =>
                    handleSpacingChange({
                      horizontal: parseInt(e.target.value),
                      vertical:
                        resumeData.styles?.spacing?.vertical ||
                        DEFAULT_SPACING.vertical,
                    })
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs text-gray-600 block mb-2">
                  Vertical:{" "}
                  {resumeData.styles?.spacing?.vertical ||
                    DEFAULT_SPACING.vertical}
                  px
                </label>
                <input
                  type="range"
                  min="10"
                  max="60"
                  step="5"
                  value={
                    resumeData.styles?.spacing?.vertical ||
                    DEFAULT_SPACING.vertical
                  }
                  onChange={(e) =>
                    handleSpacingChange({
                      horizontal:
                        resumeData.styles?.spacing?.horizontal ||
                        DEFAULT_SPACING.horizontal,
                      vertical: parseInt(e.target.value),
                    })
                  }
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
