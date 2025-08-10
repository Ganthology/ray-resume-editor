"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useChatStore } from "@/app/store/chatStore";
import { ResumeData } from "@/modules/resume/data/entity/ResumeData";
import { PersonalInfo } from "@/modules/resume/data/entity/PersonalInfo";
import { Experience } from "@/modules/resume/data/entity/Experience";
import { Education } from "@/modules/resume/data/entity/Education";
import { Skill } from "@/modules/resume/data/entity/Skill";
import { LeadershipExperience } from "@/modules/resume/data/entity/LeadershipExperience";
import { ProjectExperience } from "@/modules/resume/data/entity/ProjectExperience";
import { ResearchExperience } from "@/modules/resume/data/entity/ResearchExperience";
import { Summary } from "@/modules/resume/data/entity/Summary";
import { Portfolio } from "@/modules/resume/data/entity/Portfolio";

// Create context that provides the same interface as useResumeStore
interface ChatResumeContextType {
  resumeData: ResumeData;
  
  // Personal Info actions
  updatePersonalInfo: (personalInfo: PersonalInfo) => void;

  // Experience actions
  addExperience: () => void;
  updateExperience: (id: string, updates: Partial<Experience>) => void;
  deleteExperience: (id: string) => void;
  reorderExperiences: (newOrder: Experience[]) => void;

  // Education actions
  addEducation: () => void;
  updateEducation: (id: string, updates: Partial<Education>) => void;
  deleteEducation: (id: string) => void;
  reorderEducation: (newOrder: Education[]) => void;

  // Skills actions
  addSkill: (category?: "skill" | "certification" | "other" | "language" | "interest" | "activity") => void;
  updateSkill: (id: string, updates: Partial<Skill>) => void;
  deleteSkill: (id: string) => void;

  // Leadership Experience actions
  addLeadershipExperience: () => void;
  updateLeadershipExperience: (id: string, updates: Partial<LeadershipExperience>) => void;
  deleteLeadershipExperience: (id: string) => void;
  reorderLeadershipExperiences: (newOrder: LeadershipExperience[]) => void;

  // Project Experience actions
  addProjectExperience: () => void;
  updateProjectExperience: (id: string, updates: Partial<ProjectExperience>) => void;
  deleteProjectExperience: (id: string) => void;
  reorderProjectExperiences: (newOrder: ProjectExperience[]) => void;

  // Research Experience actions
  addResearchExperience: () => void;
  updateResearchExperience: (id: string, updates: Partial<ResearchExperience>) => void;
  deleteResearchExperience: (id: string) => void;
  reorderResearchExperiences: (newOrder: ResearchExperience[]) => void;

  // Summary actions
  updateSummary: (updates: Partial<Summary>) => void;

  // Portfolio actions
  addPortfolio: () => void;
  updatePortfolio: (id: string, updates: Partial<Portfolio>) => void;
  deletePortfolio: (id: string) => void;
  generateQRCode: (id: string, url: string) => Promise<void>;
  reorderPortfolio: (newOrder: Portfolio[]) => void;

  // Module actions
  updateModules: (modules: ResumeData["modules"]) => void;

  // Style actions
  updateStyles: (styles: ResumeData["styles"]) => void;
}

const ChatResumeContext = createContext<ChatResumeContextType | null>(null);

export function ChatResumeProvider({ children }: { children: ReactNode }) {
  const { chatResumeData: resumeData, updateChatResume } = useChatStore();

  // Create all the actions that mirror the resumeStore interface
  const contextValue: ChatResumeContextType = {
    resumeData,

    // Personal Info actions
    updatePersonalInfo: (personalInfo) => {
      updateChatResume({
        ...resumeData,
        personalInfo,
      });
    },

    // Experience actions
    addExperience: () => {
      const newExperience: Experience = {
        id: Date.now().toString(),
        position: "",
        company: "",
        department: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
        included: true,
      };
      updateChatResume({
        ...resumeData,
        experiences: [...resumeData.experiences, newExperience],
      });
    },

    updateExperience: (id, updates) => {
      updateChatResume({
        ...resumeData,
        experiences: resumeData.experiences.map((exp) =>
          exp.id === id ? { ...exp, ...updates } : exp
        ),
      });
    },

    deleteExperience: (id) => {
      updateChatResume({
        ...resumeData,
        experiences: resumeData.experiences.filter((exp) => exp.id !== id),
      });
    },

    reorderExperiences: (newOrder) => {
      updateChatResume({
        ...resumeData,
        experiences: newOrder,
      });
    },

    // Education actions
    addEducation: () => {
      const newEducation: Education = {
        id: Date.now().toString(),
        degree: "",
        fieldOfStudy: "",
        institution: "",
        graduationDate: "",
        startDate: "",
        endDate: "",
        location: "",
        gpa: "",
        description: "",
        included: true,
      };
      updateChatResume({
        ...resumeData,
        education: [...resumeData.education, newEducation],
      });
    },

    updateEducation: (id, updates) => {
      updateChatResume({
        ...resumeData,
        education: resumeData.education.map((edu) =>
          edu.id === id ? { ...edu, ...updates } : edu
        ),
      });
    },

    deleteEducation: (id) => {
      updateChatResume({
        ...resumeData,
        education: resumeData.education.filter((edu) => edu.id !== id),
      });
    },

    reorderEducation: (newOrder) => {
      updateChatResume({
        ...resumeData,
        education: newOrder,
      });
    },

    // Skills actions
    addSkill: (category = "skill") => {
      const newSkill: Skill = {
        id: Date.now().toString(),
        name: "",
        category,
        included: true,
      };
      updateChatResume({
        ...resumeData,
        skills: [...resumeData.skills, newSkill],
      });
    },

    updateSkill: (id, updates) => {
      updateChatResume({
        ...resumeData,
        skills: resumeData.skills.map((skill) =>
          skill.id === id ? { ...skill, ...updates } : skill
        ),
      });
    },

    deleteSkill: (id) => {
      updateChatResume({
        ...resumeData,
        skills: resumeData.skills.filter((skill) => skill.id !== id),
      });
    },

    // Leadership Experience actions
    addLeadershipExperience: () => {
      const newExperience: LeadershipExperience = {
        id: Date.now().toString(),
        position: "",
        organization: "",
        department: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
        included: true,
      };
      updateChatResume({
        ...resumeData,
        leadershipExperiences: [...resumeData.leadershipExperiences, newExperience],
      });
    },

    updateLeadershipExperience: (id, updates) => {
      updateChatResume({
        ...resumeData,
        leadershipExperiences: resumeData.leadershipExperiences.map((exp) =>
          exp.id === id ? { ...exp, ...updates } : exp
        ),
      });
    },

    deleteLeadershipExperience: (id) => {
      updateChatResume({
        ...resumeData,
        leadershipExperiences: resumeData.leadershipExperiences.filter((exp) => exp.id !== id),
      });
    },

    reorderLeadershipExperiences: (newOrder) => {
      updateChatResume({
        ...resumeData,
        leadershipExperiences: newOrder,
      });
    },

    // Project Experience actions
    addProjectExperience: () => {
      const newExperience: ProjectExperience = {
        id: Date.now().toString(),
        position: "",
        organization: "",
        department: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
        included: true,
      };
      updateChatResume({
        ...resumeData,
        projectExperiences: [...resumeData.projectExperiences, newExperience],
      });
    },

    updateProjectExperience: (id, updates) => {
      updateChatResume({
        ...resumeData,
        projectExperiences: resumeData.projectExperiences.map((exp) =>
          exp.id === id ? { ...exp, ...updates } : exp
        ),
      });
    },

    deleteProjectExperience: (id) => {
      updateChatResume({
        ...resumeData,
        projectExperiences: resumeData.projectExperiences.filter((exp) => exp.id !== id),
      });
    },

    reorderProjectExperiences: (newOrder) => {
      updateChatResume({
        ...resumeData,
        projectExperiences: newOrder,
      });
    },

    // Research Experience actions
    addResearchExperience: () => {
      const newExperience: ResearchExperience = {
        id: Date.now().toString(),
        position: "",
        organization: "",
        department: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
        included: true,
      };
      updateChatResume({
        ...resumeData,
        researchExperiences: [...resumeData.researchExperiences, newExperience],
      });
    },

    updateResearchExperience: (id, updates) => {
      updateChatResume({
        ...resumeData,
        researchExperiences: resumeData.researchExperiences.map((exp) =>
          exp.id === id ? { ...exp, ...updates } : exp
        ),
      });
    },

    deleteResearchExperience: (id) => {
      updateChatResume({
        ...resumeData,
        researchExperiences: resumeData.researchExperiences.filter((exp) => exp.id !== id),
      });
    },

    reorderResearchExperiences: (newOrder) => {
      updateChatResume({
        ...resumeData,
        researchExperiences: newOrder,
      });
    },

    // Summary actions
    updateSummary: (updates) => {
      updateChatResume({
        ...resumeData,
        summary: { ...resumeData.summary, ...updates },
      });
    },

    // Portfolio actions
    addPortfolio: () => {
      const newPortfolio: Portfolio = {
        id: Date.now().toString(),
        name: "",
        url: "",
        qrCode: "",
        included: true,
      };
      updateChatResume({
        ...resumeData,
        portfolio: [...resumeData.portfolio, newPortfolio],
      });
    },

    updatePortfolio: (id, updates) => {
      updateChatResume({
        ...resumeData,
        portfolio: resumeData.portfolio.map((item) =>
          item.id === id ? { ...item, ...updates } : item
        ),
      });
    },

    deletePortfolio: (id) => {
      updateChatResume({
        ...resumeData,
        portfolio: resumeData.portfolio.filter((item) => item.id !== id),
      });
    },

    generateQRCode: async (id, url) => {
      try {
        const QRCode = (await import("qrcode")).default;
        const qrCodeDataURL = await QRCode.toDataURL(url, {
          width: 100,
          margin: 1,
          color: {
            dark: "#000000",
            light: "#FFFFFF",
          },
        });

        updateChatResume({
          ...resumeData,
          portfolio: resumeData.portfolio.map((item) =>
            item.id === id ? { ...item, qrCode: qrCodeDataURL } : item
          ),
        });
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    },

    reorderPortfolio: (newOrder) => {
      updateChatResume({
        ...resumeData,
        portfolio: newOrder,
      });
    },

    // Module actions
    updateModules: (modules) => {
      updateChatResume({
        ...resumeData,
        modules,
      });
    },

    // Style actions
    updateStyles: (styles) => {
      updateChatResume({
        ...resumeData,
        styles,
      });
    },
  };

  return (
    <ChatResumeContext.Provider value={contextValue}>
      {children}
    </ChatResumeContext.Provider>
  );
}

// Hook to use the chat resume context
export function useChatResumeContext() {
  const context = useContext(ChatResumeContext);
  if (!context) {
    throw new Error("useChatResumeContext must be used within a ChatResumeProvider");
  }
  return context;
}