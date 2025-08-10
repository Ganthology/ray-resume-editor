"use client";

import { Download, RotateCcw, Save, Upload } from "lucide-react";

import { Button } from "@/platform/component/ui/button";
import ResumeBuilder from "@/modules/editor/view/component/ResumeBuilder";
import { exportToPDFUseCase } from "../../domain/useCase/exportToPDFUseCase";
import { saveDraftUseCase } from "../../domain/useCase/saveDraftUseCase";
import { useResumeStore } from "@/app/store/resumeStore";
import { useState } from "react";

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
    <div className="flex flex-col h-full">
      {/* Editor Actions Header */}
      <div className="bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Resume Editor</h1>
            <p className="text-sm text-gray-600">Create and customize your professional resume</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onSaveDraft}
              className="flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Draft
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={loadDraft}
              className="flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Load Draft
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={clearData}
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Clear All
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={exportToPDF}
              disabled={isExporting}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              {isExporting ? "Exporting..." : "Export PDF"}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Editor Content */}
      <main className="flex-1 overflow-hidden">
        <ResumeBuilder />
      </main>
    </div>
  );
}
