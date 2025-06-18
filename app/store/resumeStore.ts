"use client";

import {
  CustomSection,
  Education,
  Experience,
  PersonalInfo,
  ResumeData,
  Skill,
} from "../types/resume";
import { createJSONStorage, persist } from "zustand/middleware";

import { create } from "zustand";

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
  spacing: 25,
};

interface ResumeStore {
  resumeData: ResumeData;

  // Personal Info actions
  updatePersonalInfo: (personalInfo: PersonalInfo) => void;

  // Experience actions
  addExperience: () => void;
  updateExperience: (id: string, updates: Partial<Experience>) => void;
  deleteExperience: (id: string) => void;

  // Education actions
  addEducation: () => void;
  updateEducation: (id: string, updates: Partial<Education>) => void;
  deleteEducation: (id: string) => void;

  // Skills actions
  addSkill: (category?: "skill" | "certification" | "other") => void;
  updateSkill: (id: string, updates: Partial<Skill>) => void;
  deleteSkill: (id: string) => void;

  // Custom section actions
  addCustomSection: () => void;
  updateCustomSection: (id: string, updates: Partial<CustomSection>) => void;
  deleteCustomSection: (id: string) => void;

  // Module actions
  updateModules: (modules: ResumeData["modules"]) => void;

  // Data management
  loadFromJSON: (jsonData: ResumeData) => void;
  clearAllData: () => void;
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      resumeData: initialData,

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
            gpa: "",
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

      // Custom section actions
      addCustomSection: () =>
        set((state) => {
          const timestamp = Date.now().toString();
          const newSection: CustomSection = {
            id: timestamp,
            title: "New Section",
            content: "",
          };
          const newModule = {
            id: `custom-${timestamp}`,
            type: "custom" as const,
            title: newSection.title,
            order: state.resumeData.modules.length + 1,
            enabled: true,
            customSectionId: newSection.id,
          };
          return {
            resumeData: {
              ...state.resumeData,
              customSections: [...state.resumeData.customSections, newSection],
              modules: [...state.resumeData.modules, newModule],
            },
          };
        }),

      updateCustomSection: (id, updates) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            customSections: state.resumeData.customSections.map((section) =>
              section.id === id ? { ...section, ...updates } : section
            ),
            modules: state.resumeData.modules.map((module) =>
              module.customSectionId === id && updates.title
                ? { ...module, title: updates.title }
                : module
            ),
          },
        })),

      deleteCustomSection: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            customSections: state.resumeData.customSections.filter(
              (section) => section.id !== id
            ),
            modules: state.resumeData.modules.filter(
              (module) => module.customSectionId !== id
            ),
          },
        })),

      // Module actions
      updateModules: (modules) =>
        set((state) => ({
          resumeData: { ...state.resumeData, modules },
        })),

      // Data management
      loadFromJSON: (jsonData) =>
        set(() => ({
          resumeData: jsonData,
        })),

      clearAllData: () =>
        set(() => ({
          resumeData: initialData,
        })),
    }),
    {
      name: "resume-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
