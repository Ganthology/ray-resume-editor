"use client";

import { createJSONStorage, persist } from "zustand/middleware";

import { Education } from "@/modules/resume/data/entity/Education";
import { Experience } from "@/modules/resume/data/entity/Experience";
import { LeadershipExperience } from "@/modules/resume/data/entity/LeadershipExperience";
import { PersonalInfo } from "@/modules/resume/data/entity/PersonalInfo";
import { Portfolio } from "@/modules/resume/data/entity/Portfolio";
import { ProjectExperience } from "@/modules/resume/data/entity/ProjectExperience";
import { ResearchExperience } from "@/modules/resume/data/entity/ResearchExperience";
import { ResumeData } from "@/modules/resume/data/entity/ResumeData";
import { Skill } from "@/modules/resume/data/entity/Skill";
import { Summary } from "@/modules/resume/data/entity/Summary";
import { create } from "zustand";

export const initialResumeData: ResumeData = {
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
  leadershipExperiences: [],
  projectExperiences: [],
  researchExperiences: [],
  summary: {
    content: "",
    included: true,
  },
  portfolio: [],
  modules: [
    {
      id: "summary",
      type: "summary",
      title: "Summary",
      order: 1,
      enabled: true,
    },
    {
      id: "experience",
      type: "experience",
      title: "Professional Experience",
      order: 2,
      enabled: true,
    },
    {
      id: "leadership",
      type: "leadership",
      title: "Leadership Experience",
      order: 3,
      enabled: true,
    },
    {
      id: "project",
      type: "project",
      title: "Project Experience",
      order: 4,
      enabled: true,
    },
    {
      id: "research",
      type: "research",
      title: "Research Experience",
      order: 5,
      enabled: true,
    },
    {
      id: "education",
      type: "education",
      title: "Education",
      order: 6,
      enabled: true,
    },
    {
      id: "skills",
      type: "skills",
      title: "Skills, Certifications & Others",
      order: 7,
      enabled: true,
    },
    {
      id: "portfolio",
      type: "portfolio",
      title: "Portfolio",
      order: 8,
      enabled: true,
    },
  ],
  spacing: 25,
  styles: {
    fitMode: "normal",
    fontFamily: "times-new-roman",
  },
};

interface ResumeStore {
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
  addSkill: (
    category?:
      | "skill"
      | "certification"
      | "other"
      | "language"
      | "interest"
      | "activity"
  ) => void;
  updateSkill: (id: string, updates: Partial<Skill>) => void;
  deleteSkill: (id: string) => void;

  // Leadership Experience actions
  addLeadershipExperience: () => void;
  updateLeadershipExperience: (
    id: string,
    updates: Partial<LeadershipExperience>
  ) => void;
  deleteLeadershipExperience: (id: string) => void;
  reorderLeadershipExperiences: (newOrder: LeadershipExperience[]) => void;

  // Project Experience actions
  addProjectExperience: () => void;
  updateProjectExperience: (
    id: string,
    updates: Partial<ProjectExperience>
  ) => void;
  deleteProjectExperience: (id: string) => void;
  reorderProjectExperiences: (newOrder: ProjectExperience[]) => void;

  // Research Experience actions
  addResearchExperience: () => void;
  updateResearchExperience: (
    id: string,
    updates: Partial<ResearchExperience>
  ) => void;
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

  // Data management
  loadFromJSON: (jsonData: ResumeData) => void;
  clearAllData: () => void;
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      resumeData: initialResumeData,

      // Personal Info actions
      updatePersonalInfo: (personalInfo) =>
        set((state) => ({
          resumeData: { ...state.resumeData, personalInfo },
        })),

      // Experience actions
      addExperience: () =>
        set((state) => {
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
          return {
            resumeData: {
              ...state.resumeData,
              experiences: [...state.resumeData.experiences, newExperience],
            },
          };
        }),

      updateExperience: (id, updates) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experiences: state.resumeData.experiences.map((exp) =>
              exp.id === id ? { ...exp, ...updates } : exp
            ),
          },
        })),

      deleteExperience: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experiences: state.resumeData.experiences.filter(
              (exp) => exp.id !== id
            ),
          },
        })),

      // Education actions
      addEducation: () =>
        set((state) => {
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
          return {
            resumeData: {
              ...state.resumeData,
              education: [...state.resumeData.education, newEducation],
            },
          };
        }),

      updateEducation: (id, updates) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: state.resumeData.education.map((edu) =>
              edu.id === id ? { ...edu, ...updates } : edu
            ),
          },
        })),

      deleteEducation: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: state.resumeData.education.filter(
              (edu) => edu.id !== id
            ),
          },
        })),

      // Skills actions
      addSkill: (category = "skill") =>
        set((state) => {
          const newSkill: Skill = {
            id: Date.now().toString(),
            name: "",
            category,
            included: true,
          };
          return {
            resumeData: {
              ...state.resumeData,
              skills: [...state.resumeData.skills, newSkill],
            },
          };
        }),

      updateSkill: (id, updates) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skills: state.resumeData.skills.map((skill) =>
              skill.id === id ? { ...skill, ...updates } : skill
            ),
          },
        })),

      deleteSkill: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skills: state.resumeData.skills.filter((skill) => skill.id !== id),
          },
        })),

      // Leadership Experience actions
      addLeadershipExperience: () =>
        set((state) => {
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
          return {
            resumeData: {
              ...state.resumeData,
              leadershipExperiences: [
                ...state.resumeData.leadershipExperiences,
                newExperience,
              ],
            },
          };
        }),

      updateLeadershipExperience: (id, updates) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            leadershipExperiences: state.resumeData.leadershipExperiences.map(
              (exp) => (exp.id === id ? { ...exp, ...updates } : exp)
            ),
          },
        })),

      deleteLeadershipExperience: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            leadershipExperiences:
              state.resumeData.leadershipExperiences.filter(
                (exp) => exp.id !== id
              ),
          },
        })),

      // Project Experience actions
      addProjectExperience: () =>
        set((state) => {
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
          return {
            resumeData: {
              ...state.resumeData,
              projectExperiences: [
                ...state.resumeData.projectExperiences,
                newExperience,
              ],
            },
          };
        }),

      updateProjectExperience: (id, updates) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projectExperiences: state.resumeData.projectExperiences.map((exp) =>
              exp.id === id ? { ...exp, ...updates } : exp
            ),
          },
        })),

      deleteProjectExperience: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projectExperiences: state.resumeData.projectExperiences.filter(
              (exp) => exp.id !== id
            ),
          },
        })),

      // Research Experience actions
      addResearchExperience: () =>
        set((state) => {
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
          return {
            resumeData: {
              ...state.resumeData,
              researchExperiences: [
                ...state.resumeData.researchExperiences,
                newExperience,
              ],
            },
          };
        }),

      updateResearchExperience: (id, updates) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            researchExperiences: state.resumeData.researchExperiences.map(
              (exp) => (exp.id === id ? { ...exp, ...updates } : exp)
            ),
          },
        })),

      deleteResearchExperience: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            researchExperiences: state.resumeData.researchExperiences.filter(
              (exp) => exp.id !== id
            ),
          },
        })),

      // Summary actions
      updateSummary: (updates) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            summary: { ...state.resumeData.summary, ...updates },
          },
        })),

      // Portfolio actions
      addPortfolio: () =>
        set((state) => {
          const newPortfolio: Portfolio = {
            id: Date.now().toString(),
            name: "",
            url: "",
            qrCode: "",
            included: true,
          };
          return {
            resumeData: {
              ...state.resumeData,
              portfolio: [...state.resumeData.portfolio, newPortfolio],
            },
          };
        }),

      updatePortfolio: (id, updates) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            portfolio: state.resumeData.portfolio.map((item) =>
              item.id === id ? { ...item, ...updates } : item
            ),
          },
        })),

      deletePortfolio: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            portfolio: state.resumeData.portfolio.filter(
              (item) => item.id !== id
            ),
          },
        })),

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

          set((state) => ({
            resumeData: {
              ...state.resumeData,
              portfolio: state.resumeData.portfolio.map((item) =>
                item.id === id ? { ...item, qrCode: qrCodeDataURL } : item
              ),
            },
          }));
        } catch (error) {
          console.error("Error generating QR code:", error);
        }
      },

      // Module actions
      updateModules: (modules) =>
        set((state) => ({
          resumeData: { ...state.resumeData, modules },
        })),

      // Style actions
      updateStyles: (styles) =>
        set((state) => ({
          resumeData: { ...state.resumeData, styles },
        })),

      // Reorder actions
      reorderExperiences: (newOrder) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experiences: newOrder,
          },
        })),

      reorderEducation: (newOrder) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: newOrder,
          },
        })),

      reorderLeadershipExperiences: (newOrder) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            leadershipExperiences: newOrder,
          },
        })),

      reorderProjectExperiences: (newOrder) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projectExperiences: newOrder,
          },
        })),

      reorderResearchExperiences: (newOrder) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            researchExperiences: newOrder,
          },
        })),

      reorderPortfolio: (newOrder) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            portfolio: newOrder,
          },
        })),

      // Data management
      loadFromJSON: (jsonData) =>
        set(() => ({
          resumeData: jsonData,
        })),

      clearAllData: () =>
        set(() => ({
          resumeData: initialResumeData,
        })),
    }),
    {
      name: "resume-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
