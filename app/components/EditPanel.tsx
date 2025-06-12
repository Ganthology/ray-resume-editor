"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
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
      <PersonalInfoEditor />

      <Card className="border-gray-200/60 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold text-gray-900">
              Resume Sections
            </CardTitle>
            <Button
              onClick={addCustomSection}
              size="sm"
              className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Plus className="w-4 h-4" />
              Add Custom Section
            </Button>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Drag and drop to reorder sections. Use checkboxes to include/exclude
            individual items.
          </p>
        </CardHeader>
        <CardContent>
          <ModuleManager modules={sortedModules} />
        </CardContent>
      </Card>

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
