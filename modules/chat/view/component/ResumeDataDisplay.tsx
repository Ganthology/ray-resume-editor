"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/platform/component/ui/accordion";
import {
  BriefcaseIcon,
  FileTextIcon,
  FolderIcon,
  GraduationCapIcon,
  TrophyIcon,
  UserIcon,
  WrenchIcon,
} from "lucide-react";
// Replace Card components with divs for minimal layout

import { Badge } from "@/platform/component/ui/badge";
import React from "react";
import { ResumeData } from "@/modules/resume/data/entity/ResumeData";

interface ResumeDataDisplayProps {
  resumeData: ResumeData;
}

export default function ResumeDataDisplay({
  resumeData,
}: ResumeDataDisplayProps) {
  const getSectionIcon = (section: string) => {
    switch (section) {
      case "personal":
        return <UserIcon className="w-4 h-4" />;
      case "experience":
        return <BriefcaseIcon className="w-4 h-4" />;
      case "education":
        return <GraduationCapIcon className="w-4 h-4" />;
      case "skills":
        return <WrenchIcon className="w-4 h-4" />;
      case "projects":
        return <FolderIcon className="w-4 h-4" />;
      default:
        return <TrophyIcon className="w-4 h-4" />;
    }
  };

  const getSectionCount = (section: string) => {
    switch (section) {
      case "experience":
        return resumeData.experiences.length;
      case "education":
        return resumeData.education.length;
      case "skills":
        return resumeData.skills.length;
      case "projects":
        return resumeData.projectExperiences.length;
      case "leadership":
        return resumeData.leadershipExperiences.length;
      case "research":
        return resumeData.researchExperiences.length;
      case "portfolio":
        return resumeData.portfolio.length;
      default:
        return 0;
    }
  };

  return (
    <div className="h-full">
      <div className="px-3 py-3">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <BriefcaseIcon className="w-5 h-5" />
          Resume Data
          <Badge variant="secondary" className="text-xs">
            Structured
          </Badge>
        </h3>
        <p className="text-sm text-gray-600">
          Information organized and ready for PDF generation
        </p>
      </div>

      <div className="p-3">
        <div className="max-h-[400px] overflow-y-auto">
          <Accordion type="multiple" className="w-full">
            {/* Personal Information */}
            <AccordionItem value="personal">
              <AccordionTrigger className="text-sm">
                <div className="flex items-center gap-2">
                  {getSectionIcon("personal")}
                  Personal Information
                  <Badge variant="outline" className="text-xs">
                    {resumeData.personalInfo.name ? "✓" : "○"}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="font-medium">Name:</span>
                      <p className="text-gray-600">
                        {resumeData.personalInfo.name || "Not set"}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium">Email:</span>
                      <p className="text-gray-600">
                        {resumeData.personalInfo.email || "Not set"}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium">Phone:</span>
                      <p className="text-gray-600">
                        {resumeData.personalInfo.phone || "Not set"}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium">Location:</span>
                      <p className="text-gray-600">
                        {resumeData.personalInfo.address || "Not set"}
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Summary */}
            <AccordionItem value="summary">
              <AccordionTrigger className="text-sm">
                <div className="flex items-center gap-2">
                  <FileTextIcon className="w-4 h-4" />
                  Summary
                  <Badge variant="outline" className="text-xs">
                    {resumeData.summary.content ? "✓" : "○"}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="text-sm">
                  <p className="text-gray-600">
                    {resumeData.summary.content || "No summary available"}
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Experience */}
            <AccordionItem value="experience">
              <AccordionTrigger className="text-sm">
                <div className="flex items-center gap-2">
                  {getSectionIcon("experience")}
                  Experience
                  <Badge variant="outline" className="text-xs">
                    {getSectionCount("experience")}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {resumeData.experiences.length === 0 ? (
                    <p className="text-sm text-gray-500">
                      No experience added yet
                    </p>
                  ) : (
                    resumeData.experiences.map((exp) => (
                      <div
                        key={exp.id}
                        className="bg-gray-50 p-2 rounded text-sm"
                      >
                        <div className="font-medium">
                          {exp.position || "Position not set"}
                        </div>
                        <div className="text-gray-600">
                          {exp.company || "Company not set"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {exp.startDate || "Start"} - {exp.endDate || "End"}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Education */}
            <AccordionItem value="education">
              <AccordionTrigger className="text-sm">
                <div className="flex items-center gap-2">
                  {getSectionIcon("education")}
                  Education
                  <Badge variant="outline" className="text-xs">
                    {getSectionCount("education")}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {resumeData.education.length === 0 ? (
                    <p className="text-sm text-gray-500">
                      No education added yet
                    </p>
                  ) : (
                    resumeData.education.map((edu) => (
                      <div
                        key={edu.id}
                        className="bg-gray-50 p-2 rounded text-sm"
                      >
                        <div className="font-medium">
                          {edu.degree || "Degree not set"}
                        </div>
                        <div className="text-gray-600">
                          {edu.institution || "Institution not set"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {edu.graduationDate || "Graduation date not set"}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Skills */}
            <AccordionItem value="skills">
              <AccordionTrigger className="text-sm">
                <div className="flex items-center gap-2">
                  {getSectionIcon("skills")}
                  Skills
                  <Badge variant="outline" className="text-xs">
                    {getSectionCount("skills")}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {resumeData.skills.length === 0 ? (
                    <p className="text-sm text-gray-500">No skills added yet</p>
                  ) : (
                    <div className="flex flex-wrap gap-1">
                      {resumeData.skills.map((skill) => (
                        <Badge
                          key={skill.id}
                          variant="secondary"
                          className="text-xs"
                        >
                          {skill.name || "Unnamed skill"}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Projects */}
            <AccordionItem value="projects">
              <AccordionTrigger className="text-sm">
                <div className="flex items-center gap-2">
                  {getSectionIcon("projects")}
                  Projects
                  <Badge variant="outline" className="text-xs">
                    {getSectionCount("projects")}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {resumeData.projectExperiences.length === 0 ? (
                    <p className="text-sm text-gray-500">
                      No projects added yet
                    </p>
                  ) : (
                    resumeData.projectExperiences.map((project) => (
                      <div
                        key={project.id}
                        className="bg-gray-50 p-2 rounded text-sm"
                      >
                        <div className="font-medium">
                          {project.position || "Project not set"}
                        </div>
                        <div className="text-gray-600">
                          {project.organization || "Organization not set"}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
