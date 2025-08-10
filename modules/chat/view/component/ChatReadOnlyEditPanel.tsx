"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/platform/component/ui/accordion";
// Use minimal divs instead of Card components
import { Badge } from "@/platform/component/ui/badge";
import { useChatStore } from "@/app/store/chatStore";
import { Bot, User, MapPin, Phone, Mail, Globe, Briefcase, GraduationCap, Star } from "lucide-react";
import ChatStylesPanel from "./ChatStylesPanel";
import ChatModuleManager from "./ChatModuleManager";
import React from "react";

export default function ChatReadOnlyEditPanel() {
  const { chatResumeData: resumeData, updateChatResume } = useChatStore();

  const sortedModules = resumeData.modules.sort((a, b) => a.order - b.order);

  const handleFitModeChange = (mode: "compact" | "normal") => {
    const updatedStyles = {
      ...resumeData.styles,
      fitMode: mode,
      spacing: resumeData.styles?.spacing || { horizontal: 30, vertical: 30 },
    };
    updateChatResume({
      ...resumeData,
      styles: updatedStyles,
    });
  };

  const handleSpacingChange = (spacing: { horizontal: number; vertical: number }) => {
    const updatedStyles = {
      ...resumeData.styles,
      fitMode: resumeData.styles?.fitMode || "normal",
      spacing,
    };
    updateChatResume({
      ...resumeData,
      styles: updatedStyles,
    });
  };

  return (
    <div className="space-y-6">
      {/* Chat Product Notice */}
      <div className="px-3 pb-3 space-y-3">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Bot className="w-5 h-5 text-gray-600" />
          AI-Generated Resume Preview
        </h3>
        <div className="px-0">
          <p className="text-sm text-gray-700">
            This resume was created through AI conversation. Use the chat to request modifications, or export to the free builder for manual editing.
          </p>
          <div className="mt-3 flex gap-2">
            <Badge variant="secondary" className="bg-gray-100 text-gray-700">
              Read-only Preview
            </Badge>
            <Badge variant="outline" className="border-gray-200 text-gray-700">
              AI Generated
            </Badge>
          </div>
        </div>
      </div>

      {/* Personal Information Preview */}
      <div className="px-3 pb-3 space-y-3">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <User className="w-5 h-5" />
          Personal Information
        </h3>
        <div className="px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resumeData.personalInfo.name && (
              <div className="space-y-1">
                <div className="text-xs font-medium text-gray-600">Full Name</div>
                <div className="text-sm text-gray-900">{resumeData.personalInfo.name}</div>
              </div>
            )}
            {resumeData.personalInfo.email && (
              <div className="space-y-1">
                <div className="text-xs font-medium text-gray-600 flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  Email
                </div>
                <div className="text-sm text-gray-900">{resumeData.personalInfo.email}</div>
              </div>
            )}
            {resumeData.personalInfo.phone && (
              <div className="space-y-1">
                <div className="text-xs font-medium text-gray-600 flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  Phone
                </div>
                <div className="text-sm text-gray-900">{resumeData.personalInfo.phone}</div>
              </div>
            )}
            {resumeData.personalInfo.address && (
              <div className="space-y-1">
                <div className="text-xs font-medium text-gray-600 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  Address
                </div>
                <div className="text-sm text-gray-900">{resumeData.personalInfo.address}</div>
              </div>
            )}
            {resumeData.personalInfo.linkedinUrl && (
              <div className="space-y-1">
                <div className="text-xs font-medium text-gray-600 flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  LinkedIn
                </div>
                <div className="text-sm text-blue-600 truncate">{resumeData.personalInfo.linkedinUrl}</div>
              </div>
            )}
            {resumeData.personalInfo.personalSiteUrl && (
              <div className="space-y-1">
                <div className="text-xs font-medium text-gray-600 flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  Website
                </div>
                <div className="text-sm text-blue-600 truncate">{resumeData.personalInfo.personalSiteUrl}</div>
              </div>
            )}
          </div>
          {!resumeData.personalInfo.name && !resumeData.personalInfo.email && (
            <div className="text-sm text-gray-500 italic">No personal information provided yet. Use the chat to add your details.</div>
          )}
        </div>
      </div>

      {/* Styles Section */}
      <ChatStylesPanel
        fitMode={resumeData.styles?.fitMode || "normal"}
        spacing={resumeData.styles?.spacing || { horizontal: 30, vertical: 30 }}
        onFitModeChange={handleFitModeChange}
        onSpacingChange={handleSpacingChange}
      />

      {/* Resume Sections */}
      <Accordion type="multiple" defaultValue={["resume-sections"]}>
        <AccordionItem value="resume-sections">
          <div className="py-0">
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              <h3 className="text-lg font-semibold text-gray-900">
                Resume Sections
              </h3>
            </AccordionTrigger>
            <AccordionContent className="px-0 pb-0">
              <div className="p-3 pt-0">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm text-gray-600">
                    AI-generated sections. Use chat to modify content.
                  </p>
                </div>
                <ChatModuleManager modules={sortedModules} />
              </div>
            </AccordionContent>
          </div>
        </AccordionItem>
      </Accordion>

      {/* Dynamic Sections Preview */}
      {sortedModules.map((module) => {
        if (!module.enabled) return null;

        const sectionKey = `section-${module.id}`;

        // Get section data
        let sectionData: any[] = [];
        let sectionIcon = <Star className="w-4 h-4" />;
        
        switch (module.type) {
          case "summary":
            sectionIcon = <User className="w-4 h-4" />;
            return (
              <div key={module.id} className="px-3 pb-3 space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  {sectionIcon}
                  {module.title}
                </h3>
                <div className="px-0">
                  {resumeData.summary.content ? (
                    <div className="text-sm text-gray-700 whitespace-pre-wrap">
                      {resumeData.summary.content}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500 italic">
                      No summary provided yet. Use the chat to add your professional summary.
                    </div>
                  )}
                </div>
              </div>
            );
          
          case "experience":
            sectionIcon = <Briefcase className="w-4 h-4" />;
            sectionData = resumeData.experiences.filter(exp => exp.included);
            break;
            
          case "education":
            sectionIcon = <GraduationCap className="w-4 h-4" />;
            sectionData = resumeData.education.filter(edu => edu.included);
            break;
            
          case "skills":
            sectionIcon = <Star className="w-4 h-4" />;
            sectionData = resumeData.skills.filter(skill => skill.included);
            break;
            
          case "leadership":
            sectionData = resumeData.leadershipExperiences.filter(exp => exp.included);
            break;
            
          case "project":
            sectionData = resumeData.projectExperiences.filter(exp => exp.included);
            break;
            
          case "research":
            sectionData = resumeData.researchExperiences.filter(exp => exp.included);
            break;
            
          case "portfolio":
            sectionData = resumeData.portfolio.filter(item => item.included);
            break;
            
          default:
            return null;
        }

        return (
          <div key={module.id} className="px-3 pb-3 space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              {sectionIcon}
              {module.title}
              <Badge variant="secondary" className="text-xs">
                {sectionData.length} items
              </Badge>
            </h3>
            <div className="px-0">
              {sectionData.length > 0 ? (
                <div className="space-y-3">
                  {sectionData.map((item, index) => (
                    <div key={item.id || index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm font-medium text-gray-900">
                        {item.name || item.position || item.degree || 'Untitled'}
                      </div>
                      {(item.company || item.organization || item.institution) && (
                        <div className="text-xs text-gray-600">
                          {item.company || item.organization || item.institution}
                        </div>
                      )}
                      {item.description && (
                        <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {item.description}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-500 italic">
                  No {module.title.toLowerCase()} added yet. Use the chat to add {module.title.toLowerCase()}.
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}