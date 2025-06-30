"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

import EducationEditor from "./EducationEditor";
import ExperienceEditor from "./ExperienceEditor";
import LeadershipExperienceEditor from "./LeadershipExperienceEditor";
import ModuleManager from "./ModuleManager";
import PersonalInfoEditor from "./PersonalInfoEditor";
import PortfolioEditor from "./PortfolioEditor";
import ProjectExperienceEditor from "./ProjectExperienceEditor";
import React from "react";
import ResearchExperienceEditor from "./ResearchExperienceEditor";
import SkillsEditor from "./SkillsEditor";
import SummaryEditor from "./SummaryEditor";
import { useResumeStore } from "../store/resumeStore";

export default function EditPanel() {
  const resumeData = useResumeStore((state) => state.resumeData);

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
              <CardTitle className="text-lg font-semibold text-gray-900">
                Resume Sections
              </CardTitle>
            </AccordionTrigger>
            <AccordionContent className="px-0 pb-0">
              <CardContent className="p-6 pt-0">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm text-gray-600">
                    Drag and drop to reorder sections. Use checkboxes to
                    include/exclude individual items.
                  </p>
                </div>
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
          case "summary":
            return (
              <Accordion
                key={module.id}
                type="multiple"
                defaultValue={[sectionKey]}
              >
                <AccordionItem value={sectionKey}>
                  <SummaryEditor />
                </AccordionItem>
              </Accordion>
            );
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
          case "leadership":
            return (
              <Accordion
                key={module.id}
                type="multiple"
                defaultValue={[sectionKey]}
              >
                <AccordionItem value={sectionKey}>
                  <LeadershipExperienceEditor />
                </AccordionItem>
              </Accordion>
            );
          case "project":
            return (
              <Accordion
                key={module.id}
                type="multiple"
                defaultValue={[sectionKey]}
              >
                <AccordionItem value={sectionKey}>
                  <ProjectExperienceEditor />
                </AccordionItem>
              </Accordion>
            );
          case "research":
            return (
              <Accordion
                key={module.id}
                type="multiple"
                defaultValue={[sectionKey]}
              >
                <AccordionItem value={sectionKey}>
                  <ResearchExperienceEditor />
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
          case "portfolio":
            return (
              <Accordion
                key={module.id}
                type="multiple"
                defaultValue={[sectionKey]}
              >
                <AccordionItem value={sectionKey}>
                  <PortfolioEditor />
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
