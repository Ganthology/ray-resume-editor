"use client";

import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { Download, RotateCcw, Save, Upload } from "lucide-react";
import React, { useCallback, useRef, useState } from "react";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { Button } from "@/components/ui/button";
import EditPanel from "./EditPanel";
import PreviewPanel from "./PreviewPanel";
import { ResumeData } from "../types/resume";
import { toast } from "sonner";
import { useResumeStore } from "../store/resumeStore";

export default function ResumeBuilder() {
  const [isExporting, setIsExporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get data and actions from Zustand store
  const resumeData = useResumeStore((state) => state.resumeData);
  const { updateModules, clearAllData, loadFromJSON } = useResumeStore();

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (over && active.id !== over.id) {
        const newModules = arrayMove(
          resumeData.modules,
          resumeData.modules.findIndex((module) => module.id === active.id),
          resumeData.modules.findIndex((module) => module.id === over.id)
        ).map((module, index) => ({ ...module, order: index + 1 }));

        updateModules(newModules);
      }
    },
    [resumeData.modules, updateModules]
  );

  const saveDraft = useCallback(() => {
    try {
      const dataStr = JSON.stringify(resumeData, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `resume-draft-${
        new Date().toISOString().split("T")[0]
      }.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("Draft saved successfully!");
    } catch (error) {
      console.error("Error saving draft:", error);
      toast.error("Failed to save draft. Please try again.");
    }
  }, [resumeData]);

  const validateResumeData = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any
  ): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    // Check if data is an object
    if (!data || typeof data !== "object") {
      errors.push("Invalid JSON format - must be an object");
      return { isValid: false, errors };
    }

    // Check required top-level properties
    const requiredFields = [
      "personalInfo",
      "experiences",
      "education",
      "skills",
      "leadershipExperiences",
      "projectExperiences",
      "researchExperiences",
      "summary",
      "portfolio",
      "modules",
      "spacing",
    ];

    for (const field of requiredFields) {
      if (!(field in data)) {
        errors.push(`Missing required field: ${field}`);
      }
    }

    // Check personalInfo structure
    if (data.personalInfo && typeof data.personalInfo === "object") {
      const personalInfoFields = [
        "name",
        "email",
        "phone",
        "address",
        "linkedinUrl",
        "personalSiteUrl",
      ];
      for (const field of personalInfoFields) {
        if (!(field in data.personalInfo)) {
          errors.push(`Missing personalInfo field: ${field}`);
        }
      }
    }

    // Check arrays
    const arrayFields = [
      "experiences",
      "education",
      "skills",
      "leadershipExperiences",
      "projectExperiences",
      "researchExperiences",
      "portfolio",
      "modules",
    ];
    for (const field of arrayFields) {
      if (data[field] && !Array.isArray(data[field])) {
        errors.push(`Field ${field} must be an array`);
      }
    }

    // Check summary structure
    if (
      data.summary &&
      (typeof data.summary !== "object" ||
        !("content" in data.summary) ||
        !("included" in data.summary))
    ) {
      errors.push(
        "Invalid summary structure - must have 'content' and 'included' fields"
      );
    }

    // Check spacing
    if (data.spacing && typeof data.spacing !== "number") {
      errors.push("Field 'spacing' must be a number");
    }

    return { isValid: errors.length === 0, errors };
  };

  const loadDraft = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileLoad = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      if (file.type !== "application/json" && !file.name.endsWith(".json")) {
        toast.error("Please select a valid JSON file");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const jsonData = JSON.parse(content);

          const validation = validateResumeData(jsonData);

          if (!validation.isValid) {
            toast.error(
              `Invalid resume format:\n${validation.errors.join("\n")}`,
              {
                duration: 8000,
                description:
                  "Please ensure your JSON file contains all required fields with correct structure.",
              }
            );
            return;
          }

          // Additional validation to ensure it matches ResumeData interface
          const resumeData: ResumeData = {
            personalInfo: jsonData.personalInfo || {
              name: "",
              email: "",
              phone: "",
              address: "",
              linkedinUrl: "",
              personalSiteUrl: "",
            },
            experiences: jsonData.experiences || [],
            education: jsonData.education || [],
            skills: jsonData.skills || [],
            leadershipExperiences: jsonData.leadershipExperiences || [],
            projectExperiences: jsonData.projectExperiences || [],
            researchExperiences: jsonData.researchExperiences || [],
            summary: jsonData.summary || { content: "", included: true },
            portfolio: jsonData.portfolio || [],
            modules: jsonData.modules || [],
            spacing: jsonData.spacing || 25,
          };

          loadFromJSON(resumeData);
          toast.success("Draft loaded successfully!");
        } catch (error) {
          console.error("Error parsing JSON:", error);
          toast.error("Invalid JSON file format", {
            description:
              "Please check that your file contains valid JSON and matches the expected resume structure.",
          });
        }
      };

      reader.readAsText(file);
      // Reset file input
      event.target.value = "";
    },
    [loadFromJSON]
  );

  const clearData = useCallback(() => {
    if (
      confirm(
        "Are you sure you want to clear all data? This action cannot be undone."
      )
    ) {
      clearAllData();
      toast.success("All data cleared successfully!");
    }
  }, [clearAllData]);

  const exportToPDF = useCallback(async () => {
    setIsExporting(true);
    try {
      // Dynamically import react-pdf components to avoid SSR issues
      const { pdf } = await import("@react-pdf/renderer");
      const { default: ResumePDF } = await import("./ResumePDF");

      // Generate PDF with actual text elements
      const blob = await pdf(<ResumePDF resumeData={resumeData} />).toBlob();

      // Generate dynamic filename
      const now = new Date();
      const day = now.getDate().toString().padStart(2, "0");
      const month = now.toLocaleString("en-US", { month: "short" });
      const year = now.getFullYear();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");

      // Clean name for filename (remove spaces and special characters)
      const name = resumeData.personalInfo.name?.trim();
      const cleanName = name
        ? name
            .replace(/[^a-zA-Z0-9]/g, "_")
            .replace(/_{2,}/g, "_")
            .replace(/^_|_$/g, "")
        : "resume";

      const filename = `${cleanName}_resume_${day}${month}${year}_${hours}${minutes}.pdf`;

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("PDF exported successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Error generating PDF. Please try again.");
    } finally {
      setIsExporting(false);
    }
  }, [resumeData]);

  return (
    <div className="min-h-screen bg-gray-50/30">
      <header className="border-b border-gray-200/60 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="flex flex-col md:flex-row items-center gap-x-2 justify-start">
                <h1 className="text-xl font-semibold text-gray-900 tracking-tight">
                  Resume Builder
                </h1>
                <span className="text-sm text-gray-500">
                  that just works, vibe-coded by Ray
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={saveDraft}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Save className="w-4 h-4" />
                Save Draft
              </Button>

              <Button
                onClick={loadDraft}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Upload className="w-4 h-4" />
                Load Draft
              </Button>

              <Button
                onClick={clearData}
                variant="outline"
                size="sm"
                className="gap-2 text-red-600 hover:text-red-700"
              >
                <RotateCcw className="w-4 h-4" />
                Clear All
              </Button>

              <Button
                onClick={exportToPDF}
                disabled={isExporting}
                size="sm"
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                {isExporting ? "Exporting..." : "Export PDF"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hidden file input for load draft */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,application/json"
        onChange={handleFileLoad}
        style={{ display: "none" }}
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <div className="space-y-6">
              <SortableContext
                items={resumeData.modules.map((m) => m.id)}
                strategy={verticalListSortingStrategy}
              >
                <EditPanel />
              </SortableContext>
            </div>
          </DndContext>

          <div className="lg:sticky lg:top-24">
            <PreviewPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
