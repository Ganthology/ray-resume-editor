"use client";

import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { Download, RotateCcw, Save } from "lucide-react";
import React, { useCallback, useState } from "react";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label
                  htmlFor="spacing"
                  className="text-sm font-medium text-gray-700"
                >
                  Spacing:
                </label>
                <select
                  id="spacing"
                  value={resumeData.spacing}
                  onChange={(e) => updateSpacing(Number(e.target.value))}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={25}>Narrow (25px)</option>
                  <option value={50}>Normal (50px)</option>
                  <option value={75}>Wide (75px)</option>
                  <option value={100}>Extra Wide (100px)</option>
                </select>
              </div>

              <button
                onClick={saveDraft}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Save size={20} />
                Save Draft
              </button>

              <button
                onClick={clearData}
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                <RotateCcw size={20} />
                Clear All
              </button>

              <button
                onClick={exportToPDF}
                disabled={isExporting}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Download size={20} />
                {isExporting ? "Exporting..." : "Export PDF"}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

          <div className="lg:sticky lg:top-8">
            <PreviewPanel resumeData={resumeData} />
          </div>
        </div>
      </div>
    </div>
  );
}
