"use client";

import CustomSectionEditor from "./CustomSectionEditor";
import EducationEditor from "./EducationEditor";
import ExperienceEditor from "./ExperienceEditor";
import ModuleManager from "./ModuleManager";
import PersonalInfoEditor from "./PersonalInfoEditor";
import { Plus } from "lucide-react";
import React from "react";
import SkillsEditor from "./SkillsEditor";
import { useResumeStore } from "../store/resumeStore";

export default function EditPanel() {
  const resumeData = useResumeStore((state) => state.resumeData);
  const addCustomSection = useResumeStore((state) => state.addCustomSection);

  const sortedModules = resumeData.modules.sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Personal Information
        </h2>
        <PersonalInfoEditor />
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Resume Sections
          </h2>
          <button
            onClick={addCustomSection}
            className="flex items-center gap-2 bg-purple-600 text-white px-3 py-2 rounded-md hover:bg-purple-700 transition-colors text-sm"
          >
            <Plus size={16} />
            Add Custom Section
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Drag and drop to reorder sections. Use checkboxes to include/exclude
          individual items.
        </p>
        <ModuleManager modules={sortedModules} />
      </div>

      {sortedModules.map((module) => {
        if (!module.enabled) return null;

        switch (module.type) {
          case "experience":
            return <ExperienceEditor key={module.id} />;
          case "education":
            return <EducationEditor key={module.id} />;
          case "skills":
            return <SkillsEditor key={module.id} />;
          case "custom":
            const customSection = resumeData.customSections.find(
              (s) => s.id === module.customSectionId
            );
            if (!customSection) return null;
            return (
              <CustomSectionEditor
                key={module.id}
                sectionId={customSection.id}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
