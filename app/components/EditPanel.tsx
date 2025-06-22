"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

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
      {/* Personal Information */}
      <Accordion type="multiple" defaultValue={["personal-info"]}>
        <AccordionItem value="personal-info">
          <Card className="border-0">
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              <CardTitle className="text-lg font-semibold text-gray-900">
                Personal Information
              </CardTitle>
            </AccordionTrigger>
            <AccordionContent className="px-0 pb-0">
              <CardContent className="p-6 pt-0">
                <PersonalInfoEditor />
              </CardContent>
            </AccordionContent>
          </Card>
        </AccordionItem>
      </Accordion>

      {/* Resume Sections */}
      <Accordion type="multiple" defaultValue={["resume-sections"]}>
        <AccordionItem value="resume-sections">
          <Card className="border-0">
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              <div className="flex justify-between items-center w-full mr-4">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Resume Sections
                </CardTitle>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    addCustomSection();
                  }}
                  size="sm"
                  className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Plus className="w-4 h-4" />
                  Add Custom Section
                </Button>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-0 pb-0">
              <CardContent className="p-6 pt-0">
                <p className="text-sm text-gray-600 mb-4">
                  Drag and drop to reorder sections. Use checkboxes to
                  include/exclude individual items.
                </p>
                <ModuleManager modules={sortedModules} />
              </CardContent>
            </AccordionContent>
          </Card>
        </AccordionItem>
      </Accordion>

      {/* Dynamic Sections */}
      {sortedModules.map((module) => {
        if (!module.enabled) return null;

        const sectionKey = `section-${module.id}`;

        switch (module.type) {
          case "experience":
            return (
              <Accordion
                key={module.id}
                type="multiple"
                defaultValue={[sectionKey]}
              >
                <AccordionItem value={sectionKey}>
                  <ExperienceEditor />
                </AccordionItem>
              </Accordion>
            );
          case "education":
            return (
              <Accordion
                key={module.id}
                type="multiple"
                defaultValue={[sectionKey]}
              >
                <AccordionItem value={sectionKey}>
                  <EducationEditor />
                </AccordionItem>
              </Accordion>
            );
          case "skills":
            return (
              <Accordion
                key={module.id}
                type="multiple"
                defaultValue={[sectionKey]}
              >
                <AccordionItem value={sectionKey}>
                  <SkillsEditor />
                </AccordionItem>
              </Accordion>
            );
          case "custom":
            const customSection = resumeData.customSections.find(
              (s) => s.id === module.customSectionId
            );
            if (!customSection) return null;
            return (
              <Accordion
                key={module.id}
                type="multiple"
                defaultValue={[sectionKey]}
              >
                <AccordionItem value={sectionKey}>
                  <CustomSectionEditor sectionId={customSection.id} />
                </AccordionItem>
              </Accordion>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
