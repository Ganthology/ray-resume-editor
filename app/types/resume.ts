export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  linkedinUrl: string;
  personalSiteUrl: string;
}

export interface Experience {
  id: string;
  position: string;
  company: string;
  department?: string;
  location?: string;
  startDate: string;
  endDate: string;
  description: string;
  included: boolean;
}

export interface Education {
  id: string;
  degree: string;
  fieldOfStudy: string;
  institution: string;
  graduationDate: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  included: boolean;
}

export interface Skill {
  id: string;
  name: string;
  category: "skill" | "certification" | "other";
  included: boolean;
}

export interface CustomSection {
  id: string;
  title: string;
  content: string;
}

export interface ResumeModule {
  id: string;
  type: "experience" | "education" | "skills" | "custom";
  title: string;
  order: number;
  enabled: boolean;
  customSectionId?: string; // For custom modules
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  customSections: CustomSection[];
  modules: ResumeModule[];
  spacing: number; // Horizontal spacing in pixels
}

export type ModuleType = "experience" | "education" | "skills" | "custom";
