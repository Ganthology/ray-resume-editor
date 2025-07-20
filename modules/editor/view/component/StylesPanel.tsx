"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/platform/component/ui/card";
import { ChevronDown, Type, Layout } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/platform/component/ui/button";
import { Select } from "@/platform/component/ui/select";
import { Badge } from "@/platform/component/ui/badge";

interface StylesPanelProps {
  fitMode: "compact" | "normal";
  fontFamily: string;
  onFitModeChange: (mode: "compact" | "normal") => void;
  onFontFamilyChange: (font: string) => void;
}

export default function StylesPanel({
  fitMode,
  fontFamily,
  onFitModeChange,
  onFontFamilyChange,
}: StylesPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const fontOptions = [
    { value: "times-new-roman", label: "Times New Roman" },
    { value: "geist-mono", label: "Geist Mono" },
    { value: "geist-sans", label: "Geist Sans" },
  ];

  return (
    <Card className="border-gray-200/60 shadow-sm bg-white mb-4">
      <CardHeader className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Type className="w-5 h-5" />
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

          {/* Font Family Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4" />
              <label className="text-sm font-medium text-gray-700">
                Font Family
              </label>
            </div>
            <select
              value={fontFamily}
              onChange={(e) => onFontFamilyChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {fontOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500">
              Choose the font that best matches your professional style
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  );
}