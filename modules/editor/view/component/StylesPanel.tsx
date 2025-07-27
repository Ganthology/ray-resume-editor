"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/platform/component/ui/card";
import { ChevronDown, Layout, Move3D, RotateCcw } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/platform/component/ui/button";
import { Badge } from "@/platform/component/ui/badge";
import { Slider } from "@/platform/component/ui/slider";

interface StylesPanelProps {
  fitMode: "compact" | "normal";
  spacing?: {
    horizontal: number;
    vertical: number;
  };
  onFitModeChange: (mode: "compact" | "normal") => void;
  onSpacingChange: (spacing: { horizontal: number; vertical: number }) => void;
}

const DEFAULT_SPACING = { horizontal: 30, vertical: 30 };

export default function StylesPanel({
  fitMode,
  spacing = DEFAULT_SPACING,
  onFitModeChange,
  onSpacingChange,
}: StylesPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleResetSpacing = () => {
    onSpacingChange(DEFAULT_SPACING);
  };

  const isDefaultSpacing = spacing.horizontal === DEFAULT_SPACING.horizontal && 
                          spacing.vertical === DEFAULT_SPACING.vertical;

  return (
    <Card className="border-gray-200/60 shadow-sm bg-white mb-4">
      <CardHeader className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Layout className="w-5 h-5" />
            Styles
            <Badge variant="secondary" className="text-xs">
              Customize
            </Badge>
          </CardTitle>
          <ChevronDown
            className={`w-5 h-5 transition-transform ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </div>
        <p className="text-sm text-gray-600">
          Customize the appearance and layout of your resume
        </p>
      </CardHeader>

      {isExpanded && (
        <CardContent className="p-4 border-t border-gray-200 space-y-4">
          {/* Fit Mode Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Layout className="w-4 h-4" />
              <label className="text-sm font-medium text-gray-700">
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
            <p className="text-xs text-gray-500">
              {fitMode === "compact"
                ? "Tighter spacing, more content per page"
                : "Standard spacing for better readability"}
            </p>
          </div>

          {/* Spacing Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Move3D className="w-4 h-4" />
                <label className="text-sm font-medium text-gray-700">
                  Page Margins
                </label>
                <Badge variant="outline" className="text-xs">
                  Default: {DEFAULT_SPACING.horizontal}px × {DEFAULT_SPACING.vertical}px
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetSpacing}
                disabled={isDefaultSpacing}
                className="h-8 px-2"
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                Reset
              </Button>
            </div>
            
            {/* Horizontal Spacing */}
            <div className="space-y-2">
              <label className="text-xs text-gray-600">
                Horizontal Margins: {spacing.horizontal}px
              </label>
              <Slider
                value={[spacing.horizontal]}
                onValueChange={([value]) => onSpacingChange({
                  ...spacing,
                  horizontal: value
                })}
                min={10}
                max={60}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>10px</span>
                <span>60px</span>
              </div>
            </div>

            {/* Vertical Spacing */}
            <div className="space-y-2">
              <label className="text-xs text-gray-600">
                Vertical Margins: {spacing.vertical}px
              </label>
              <Slider
                value={[spacing.vertical]}
                onValueChange={([value]) => onSpacingChange({
                  ...spacing,
                  vertical: value
                })}
                min={10}
                max={60}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>10px</span>
                <span>60px</span>
              </div>
            </div>
            
            <p className="text-xs text-gray-500">
              Adjust the white space around your resume content. Default spacing provides optimal readability.
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  );
}