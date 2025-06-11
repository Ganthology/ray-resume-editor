"use client";

import {
  CustomSection,
  CustomSectionItem,
  Education,
  Experience,
  PersonalInfo,
  ResumeData,
  Skill,
} from "../types/resume";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { Download, Save } from "lucide-react";
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

const initialData: ResumeData = {
  personalInfo: {
    name: "",
    email: "",
    phone: "",
    address: "",
    linkedinUrl: "",
    personalSiteUrl: "",
  },
  experiences: [],
  education: [],
  skills: [],
  customSections: [],
  modules: [
    {
      id: "experience",
      type: "experience",
      title: "Professional Experience",
      order: 1,
      enabled: true,
    },
    {
      id: "education",
      type: "education",
      title: "Education",
      order: 2,
      enabled: true,
    },
    {
      id: "skills",
      type: "skills",
      title: "Skills, Certifications & Others",
      order: 3,
      enabled: true,
    },
  ],
  spacing: 50, // Default 50px horizontal spacing
};

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);
  const [isExporting, setIsExporting] = useState(false);

  const updatePersonalInfo = useCallback((personalInfo: PersonalInfo) => {
    setResumeData((prev) => ({ ...prev, personalInfo }));
  }, []);

  const addExperience = useCallback(() => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
      included: true,
    };
    setResumeData((prev) => ({
      ...prev,
      experiences: [...prev.experiences, newExperience],
    }));
  }, []);

  const updateExperience = useCallback(
    (id: string, updates: Partial<Experience>) => {
      setResumeData((prev) => ({
        ...prev,
        experiences: prev.experiences.map((exp) =>
          exp.id === id ? { ...exp, ...updates } : exp
        ),
      }));
    },
    []
  );

  const deleteExperience = useCallback((id: string) => {
    setResumeData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((exp) => exp.id !== id),
    }));
  }, []);

  const addEducation = useCallback(() => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      fieldOfStudy: "",
      graduationDate: "",
      gpa: "",
      included: true,
    };
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, newEducation],
    }));
  }, []);

  const updateEducation = useCallback(
    (id: string, updates: Partial<Education>) => {
      setResumeData((prev) => ({
        ...prev,
        education: prev.education.map((edu) =>
          edu.id === id ? { ...edu, ...updates } : edu
        ),
      }));
    },
    []
  );

  const deleteEducation = useCallback((id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  }, []);

  const addSkill = useCallback(
    (category: "skill" | "certification" | "other" = "skill") => {
      const newSkill: Skill = {
        id: Date.now().toString(),
        name: "",
        category,
        included: true,
      };
      setResumeData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill],
      }));
    },
    []
  );

  const updateSkill = useCallback((id: string, updates: Partial<Skill>) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill) =>
        skill.id === id ? { ...skill, ...updates } : skill
      ),
    }));
  }, []);

  const deleteSkill = useCallback((id: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill.id !== id),
    }));
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setResumeData((prev) => ({
        ...prev,
        modules: arrayMove(
          prev.modules,
          prev.modules.findIndex((module) => module.id === active.id),
          prev.modules.findIndex((module) => module.id === over.id)
        ).map((module, index) => ({ ...module, order: index + 1 })),
      }));
    }
  }, []);

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

  const updateSpacing = useCallback((spacing: number) => {
    setResumeData((prev) => ({ ...prev, spacing }));
  }, []);

  const addCustomSection = useCallback(() => {
    const newSection: CustomSection = {
      id: Date.now().toString(),
      title: "",
      items: [],
    };
    const newModule = {
      id: `custom-${newSection.id}`,
      type: "custom" as const,
      title: newSection.title || "Custom Section",
      order: resumeData.modules.length + 1,
      enabled: true,
      customSectionId: newSection.id,
    };
    setResumeData((prev) => ({
      ...prev,
      customSections: [...prev.customSections, newSection],
      modules: [...prev.modules, newModule],
    }));
  }, [resumeData.modules.length]);

  const updateCustomSection = useCallback(
    (id: string, updates: Partial<CustomSection>) => {
      setResumeData((prev) => ({
        ...prev,
        customSections: prev.customSections.map((section) =>
          section.id === id ? { ...section, ...updates } : section
        ),
        modules: prev.modules.map((module) =>
          module.customSectionId === id && updates.title
            ? { ...module, title: updates.title }
            : module
        ),
      }));
    },
    []
  );

  const deleteCustomSection = useCallback((id: string) => {
    setResumeData((prev) => ({
      ...prev,
      customSections: prev.customSections.filter(
        (section) => section.id !== id
      ),
      modules: prev.modules.filter((module) => module.customSectionId !== id),
    }));
  }, []);

  const addCustomSectionItem = useCallback((sectionId: string) => {
    const newItem: CustomSectionItem = {
      id: Date.now().toString(),
      title: "",
      subtitle: "",
      description: "",
      date: "",
      included: true,
    };
    setResumeData((prev) => ({
      ...prev,
      customSections: prev.customSections.map((section) =>
        section.id === sectionId
          ? { ...section, items: [...section.items, newItem] }
          : section
      ),
    }));
  }, []);

  const updateCustomSectionItem = useCallback(
    (
      sectionId: string,
      itemId: string,
      updates: Partial<CustomSectionItem>
    ) => {
      setResumeData((prev) => ({
        ...prev,
        customSections: prev.customSections.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                items: section.items.map((item) =>
                  item.id === itemId ? { ...item, ...updates } : item
                ),
              }
            : section
        ),
      }));
    },
    []
  );

  const deleteCustomSectionItem = useCallback(
    (sectionId: string, itemId: string) => {
      setResumeData((prev) => ({
        ...prev,
        customSections: prev.customSections.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                items: section.items.filter((item) => item.id !== itemId),
              }
            : section
        ),
      }));
    },
    []
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
                <EditPanel
                  resumeData={resumeData}
                  onUpdatePersonalInfo={updatePersonalInfo}
                  onAddExperience={addExperience}
                  onUpdateExperience={updateExperience}
                  onDeleteExperience={deleteExperience}
                  onAddEducation={addEducation}
                  onUpdateEducation={updateEducation}
                  onDeleteEducation={deleteEducation}
                  onAddSkill={addSkill}
                  onUpdateSkill={updateSkill}
                  onDeleteSkill={deleteSkill}
                  onAddCustomSection={addCustomSection}
                  onUpdateCustomSection={updateCustomSection}
                  onDeleteCustomSection={deleteCustomSection}
                  onAddCustomSectionItem={addCustomSectionItem}
                  onUpdateCustomSectionItem={updateCustomSectionItem}
                  onDeleteCustomSectionItem={deleteCustomSectionItem}
                />
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
