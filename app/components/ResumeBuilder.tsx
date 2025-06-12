"use client";

import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { Download, RotateCcw, Save } from "lucide-react";
import React, { useCallback, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { Button } from "@/components/ui/button";
import EditPanel from "./EditPanel";
import PreviewPanel from "./PreviewPanel";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useResumeStore } from "../store/resumeStore";

export default function ResumeBuilder() {
  const [isExporting, setIsExporting] = useState(false);

  // Get data and actions from Zustand store
  const resumeData = useResumeStore((state) => state.resumeData);
  const { updateModules, updateSpacing, clearAllData } = useResumeStore();

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
  }, [resumeData]);

  const clearData = useCallback(() => {
    if (
      confirm(
        "Are you sure you want to clear all data? This action cannot be undone."
      )
    ) {
      clearAllData();
    }
  }, [clearAllData]);

  const exportToPDF = useCallback(async () => {
    setIsExporting(true);
    try {
      const element = document.getElementById("resume-preview");
      if (!element) return;

      // Wait for any fonts to load
      await document.fonts.ready;

      // Get the actual content dimensions
      const originalWidth = element.offsetWidth;
      const originalHeight = element.offsetHeight;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        allowTaint: false,
        removeContainer: true,
        logging: false,
        width: originalWidth,
        height: originalHeight,
        scrollX: 0,
        scrollY: 0,
      });

      const imgData = canvas.toDataURL("image/png", 1.0);
      const pdf = new jsPDF("p", "mm", "a4");

      // A4 dimensions in mm
      const pdfWidth = 210;
      const pdfHeight = 297;
      const margin = 10; // 10mm margin on all sides
      const contentWidth = pdfWidth - margin * 2;

      // Calculate image dimensions to fit within margins
      const imgAspectRatio = canvas.height / canvas.width;
      const imgWidth = contentWidth;
      const imgHeight = contentWidth * imgAspectRatio;

      let currentY = margin;
      let remainingHeight = imgHeight;

      // Add first page with margins
      pdf.addImage(imgData, "PNG", margin, currentY, imgWidth, imgHeight);

      // Only add more pages if content exceeds one page
      while (remainingHeight > pdfHeight - margin * 2) {
        remainingHeight -= pdfHeight - margin * 2;
        currentY = margin - (imgHeight - remainingHeight);
        pdf.addPage();
        pdf.addImage(imgData, "PNG", margin, currentY, imgWidth, imgHeight);
      }

      pdf.save("resume.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
      setIsExporting(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50/30">
      <header className="border-b border-gray-200/60 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-900 tracking-tight">
                Resume Builder
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Spacing:
                </label>
                <Select
                  value={resumeData.spacing.toString()}
                  onValueChange={(value) => updateSpacing(Number(value))}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="25">Narrow</SelectItem>
                    <SelectItem value="50">Normal</SelectItem>
                    <SelectItem value="75">Wide</SelectItem>
                    <SelectItem value="100">Extra Wide</SelectItem>
                  </SelectContent>
                </Select>
              </div>

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
