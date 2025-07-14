"use client";

import {
  Download,
  Github,
  MessageCircle,
  MoreHorizontal,
  RotateCcw,
  Save,
  Upload,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/platform/component/ui/popover";

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

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation
        title="Resume Builder"
        subtitle="that just works, vibe-coded by Ray"
        showDefaultActions={false}
      >
        {/* Desktop buttons - visible on md and larger screens */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            onClick={onSaveDraft}
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
        </div>

        {/* Mobile dropdown - visible only on smaller than md screens */}
        <div className="md:hidden">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <MoreHorizontal className="w-4 h-4" />
                More
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-1" align="end">
              <div className="space-y-1">
                <Button
                  onClick={onSaveDraft}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Draft
                </Button>

                <Button
                  onClick={loadDraft}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Load Draft
                </Button>

                <Button
                  onClick={clearData}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <RotateCcw className="w-4 h-4" />
                  Clear All
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Export PDF button - always visible */}
        <Button
          onClick={exportToPDF}
          disabled={isExporting}
          size="sm"
          className="gap-2"
        >
          <Download className="w-4 h-4" />
          {isExporting ? "Exporting..." : "Export PDF"}
        </Button>

        {/* Default navigation items */}
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
            className="flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat to Build</span>
          </Button>
        </Link>
      </Navigation>

      <main className="flex-1">
        {/* Hidden SEO content for search engines */}
        <div className="sr-only">
          <h1>Ray Resume Editor - Free Professional Resume Builder</h1>
          <p>
            Create professional resumes effortlessly with our free online resume
            builder. Ray Resume Editor offers PDF export, multiple resume
            sections including experience, education, skills, projects,
            leadership, research, and portfolio. Build your perfect resume in
            minutes with drag-and-drop functionality and clean formatting.
          </p>
          <h2>Features</h2>
          <ul>
            <li>Free professional resume builder</li>
            <li>PDF export functionality</li>
            <li>Multiple resume sections</li>
            <li>Experience and education management</li>
            <li>Skills and projects tracking</li>
            <li>Leadership and research experience</li>
            <li>Portfolio showcase</li>
            <li>Drag-and-drop interface</li>
            <li>Clean professional formatting</li>
            <li>Save and load drafts</li>
          </ul>
          <h2>Benefits</h2>
          <p>
            Build your resume quickly and professionally. Perfect for job
            seekers, students, and professionals looking to create polished CVs.
            No registration required - start building your resume immediately.
          </p>
          <h2>AI-Powered Chat Feature</h2>
          <p>
            Try our new AI-powered chat feature to build your resume through
            conversation. Simply tell us about your experience, skills, and
            achievements, and we&apos;ll help you create a professional resume
            automatically.
          </p>
        </div>

        {/* Main application */}
        <ResumeBuilder />
      </main>

      <Footer />
    </div>
  );
}
