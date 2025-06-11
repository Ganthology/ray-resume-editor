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

import CustomSectionEditor from "./CustomSectionEditor";
import EducationEditor from "./EducationEditor";
import ExperienceEditor from "./ExperienceEditor";
import ModuleManager from "./ModuleManager";
import PersonalInfoEditor from "./PersonalInfoEditor";
import { Plus } from "lucide-react";
import React from "react";
import SkillsEditor from "./SkillsEditor";

interface EditPanelProps {
  resumeData: ResumeData;
  onUpdatePersonalInfo: (personalInfo: PersonalInfo) => void;
  onAddExperience: () => void;
  onUpdateExperience: (id: string, updates: Partial<Experience>) => void;
  onDeleteExperience: (id: string) => void;
  onAddEducation: () => void;
  onUpdateEducation: (id: string, updates: Partial<Education>) => void;
  onDeleteEducation: (id: string) => void;
  onAddSkill: (category?: "skill" | "certification" | "other") => void;
  onUpdateSkill: (id: string, updates: Partial<Skill>) => void;
  onDeleteSkill: (id: string) => void;
  onAddCustomSection: () => void;
  onUpdateCustomSection: (id: string, updates: Partial<CustomSection>) => void;
  onDeleteCustomSection: (id: string) => void;
  onAddCustomSectionItem: (sectionId: string) => void;
  onUpdateCustomSectionItem: (
    sectionId: string,
    itemId: string,
    updates: Partial<CustomSectionItem>
  ) => void;
  onDeleteCustomSectionItem: (sectionId: string, itemId: string) => void;
}

export default function EditPanel({
  resumeData,
  onUpdatePersonalInfo,
  onAddExperience,
  onUpdateExperience,
  onDeleteExperience,
  onAddEducation,
  onUpdateEducation,
  onDeleteEducation,
  onAddSkill,
  onUpdateSkill,
  onDeleteSkill,
  onAddCustomSection,
  onUpdateCustomSection,
  onDeleteCustomSection,
  onAddCustomSectionItem,
  onUpdateCustomSectionItem,
  onDeleteCustomSectionItem,
}: EditPanelProps) {
  const sortedModules = resumeData.modules.sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Personal Information
        </h2>
        <PersonalInfoEditor
          personalInfo={resumeData.personalInfo}
          onUpdate={onUpdatePersonalInfo}
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Resume Sections
          </h2>
          <button
            onClick={onAddCustomSection}
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
            return (
              <ExperienceEditor
                key={module.id}
                experiences={resumeData.experiences}
                onAdd={onAddExperience}
                onUpdate={onUpdateExperience}
                onDelete={onDeleteExperience}
              />
            );
          case "education":
            return (
              <EducationEditor
                key={module.id}
                education={resumeData.education}
                onAdd={onAddEducation}
                onUpdate={onUpdateEducation}
                onDelete={onDeleteEducation}
              />
            );
          case "skills":
            return (
              <SkillsEditor
                key={module.id}
                skills={resumeData.skills}
                onAdd={onAddSkill}
                onUpdate={onUpdateSkill}
                onDelete={onDeleteSkill}
              />
            );
          case "custom":
            const customSection = resumeData.customSections.find(
              (s) => s.id === module.customSectionId
            );
            if (!customSection) return null;
            return (
              <CustomSectionEditor
                key={module.id}
                section={customSection}
                onUpdate={onUpdateCustomSection}
                onDelete={onDeleteCustomSection}
                onAddItem={onAddCustomSectionItem}
                onUpdateItem={onUpdateCustomSectionItem}
                onDeleteItem={onDeleteCustomSectionItem}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
