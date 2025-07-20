"use client";

import {
  Download,
  Github,
  MessageCircle,
  RotateCcw,
  Save,
  Upload,
} from "lucide-react";

import { Button } from "@/platform/component/ui/button";
import Footer from "@/platform/component/ui/footer";
import Link from "next/link";
import type { Metadata } from "next";
import Navigation from "@/platform/component/ui/navigation";
import ResumeBuilder from "@/modules/editor/view/component/ResumeBuilder";
import { exportToPDFUseCase } from "../../domain/useCase/exportToPDFUseCase";
import { saveDraftUseCase } from "../../domain/useCase/saveDraftUseCase";
import { useResumeStore } from "@/app/store/resumeStore";
import { useState } from "react";

export const metadata: Metadata = {
  title: "Ray Resume Editor - Free Professional Resume Builder",
  description:
    "Create professional resumes effortlessly with Ray Resume Editor. Free online resume builder with PDF export, multiple sections, drag-and-drop functionality, and clean formatting. Build your perfect resume in minutes.",
};

export default function ResumeEditorScreen() {
  const { clearAllData, loadFromJSON, resumeData } = useResumeStore();
  const [isExporting, setIsExporting] = useState(false);

  const onSaveDraft = () => {
    saveDraftUseCase(resumeData);
  };

  const loadDraft = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target?.result as string);
            loadFromJSON(data);
          } catch (error) {
            console.error("Error loading draft:", error);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const clearData = () => {
    if (
      confirm(
        "Are you sure you want to clear all data? This action cannot be undone."
      )
    ) {
      clearAllData();
    }
  };

  const exportToPDF = async () => {
    setIsExporting(true);
    await exportToPDFUseCase(resumeData);
    setIsExporting(false);
  };

  const navigationActions = [
    {
      icon: Save,
      label: "Save Draft",
      onClick: onSaveDraft,
    },
    {
      icon: Upload,
      label: "Load Draft",
      onClick: loadDraft,
    },
    {
      icon: RotateCcw,
      label: "Clear All",
      onClick: clearData,
      variant: "destructive" as const,
    },
    {
      icon: Download,
      label: isExporting ? "Exporting..." : "Export PDF",
      onClick: exportToPDF,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation
        title="Resume Builder"
        subtitle="that just works, vibe-coded by Ray"
        showDefaultActions={false}
        actions={navigationActions}
      >
        <Link
          href="https://github.com/Ganthology/ray-resume-editor"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <Github className="w-4 h-4" />
          <span className="hidden sm:inline">GitHub</span>
        </Link>

        <Link href="/chat">
          <Button
            variant="default"
            size="sm"
            className="flex items-center gap-2 hover:cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat to Build</span>
          </Button>
        </Link>
      </Navigation>

      <main className="flex-1">
        <ResumeBuilder />
      </main>

      <Footer />
    </div>
  );
}
