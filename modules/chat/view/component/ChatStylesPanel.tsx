"use client";

// Minimal divs instead of Card components
import { ChevronDown, Layout, Move3D, RotateCcw, Sparkles } from "lucide-react";
import React, { useState } from "react";

import { Badge } from "@/platform/component/ui/badge";
import { Button } from "@/platform/component/ui/button";
import { Slider } from "@/platform/component/ui/slider";

interface ChatStylesPanelProps {
  fitMode: "compact" | "normal";
  spacing?: {
    horizontal: number;
    vertical: number;
  };
  onFitModeChange: (mode: "compact" | "normal") => void;
  onSpacingChange: (spacing: { horizontal: number; vertical: number }) => void;
}

const DEFAULT_SPACING = { horizontal: 30, vertical: 30 };

export default function ChatStylesPanel({
  fitMode,
  spacing = DEFAULT_SPACING,
  onFitModeChange,
  onSpacingChange,
}: ChatStylesPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleResetSpacing = () => {
    onSpacingChange(DEFAULT_SPACING);
  };

  const isDefaultSpacing =
    spacing.horizontal === DEFAULT_SPACING.horizontal &&
    spacing.vertical === DEFAULT_SPACING.vertical;

  return (
    <div className="mb-4">
      <div
        className="cursor-pointer px-3 py-3"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Layout className="w-5 h-5 text-gray-600" />
            Resume styles
          </h3>
          <ChevronDown
            className={`w-5 h-5 transition-transform text-gray-600 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </div>
        <p className="text-sm text-gray-700">Tweak your resume styling</p>
      </div>

      {isExpanded && (
        <div className="p-3 space-y-4">
          {/* Chat Product Notice */}
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-700">
              💡 These styles are applied to your AI-generated resume. Export to
              the free builder for more customization options.
            </p>
          </div>

          {/* Fit Mode Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Layout className="w-4 h-4 text-gray-600" />
              <label className="text-sm font-medium text-gray-800">
                Layout Density
              </label>
            </div>
            <div className="flex gap-2">
              <Button
                variant={fitMode === "compact" ? "default" : "outline"}
                size="sm"
                onClick={() => onFitModeChange("compact")}
                className="flex-1"
              >
                Compact
              </Button>
              <Button
                variant={fitMode === "normal" ? "default" : "outline"}
                size="sm"
                onClick={() => onFitModeChange("normal")}
                className="flex-1"
              >
                Normal
              </Button>
            </div>
            <p className="text-xs text-gray-600">
              {fitMode === "compact"
                ? "Tighter spacing, more content per page"
                : "Standard spacing for better readability"}
            </p>
          </div>

          {/* Spacing Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Move3D className="w-4 h-4 text-gray-600" />
                <label className="text-sm font-medium text-gray-800">
                  Page Margins
                </label>
                <Badge
                  variant="outline"
                  className="text-xs border-gray-200 text-gray-700"
                >
                  Default: {DEFAULT_SPACING.horizontal}px ×{" "}
                  {DEFAULT_SPACING.vertical}px
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetSpacing}
                disabled={isDefaultSpacing}
                className="h-8 px-2 hover:bg-gray-100"
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                Reset
              </Button>
            </div>

            {/* Horizontal Spacing */}
            <div className="space-y-2">
              <label className="text-xs text-gray-700">
                Horizontal Margins: {spacing.horizontal}px
              </label>
              <Slider
                value={[spacing.horizontal]}
                onValueChange={([value]) =>
                  onSpacingChange({
                    ...spacing,
                    horizontal: value,
                  })
                }
                min={10}
                max={60}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>10px</span>
                <span>60px</span>
              </div>
            </div>

            {/* Vertical Spacing */}
            <div className="space-y-2">
              <label className="text-xs text-gray-700">
                Vertical Margins: {spacing.vertical}px
              </label>
              <Slider
                value={[spacing.vertical]}
                onValueChange={([value]) =>
                  onSpacingChange({
                    ...spacing,
                    vertical: value,
                  })
                }
                min={10}
                max={60}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>10px</span>
                <span>60px</span>
              </div>
            </div>

            <p className="text-xs text-gray-600">
              Adjust the white space around your resume content. Default spacing
              provides optimal readability.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
