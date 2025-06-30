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
  description?: string; // Optional description field
  included: boolean;
}

export interface Skill {
  id: string;
  name: string;
  category:
    | "skill"
    | "certification"
    | "other"
    | "language"
    | "interest"
    | "activity";
  included: boolean;
}

// New experience types similar to professional experience
export interface LeadershipExperience {
  id: string;
  position: string;
  organization: string;
  department?: string;
  location?: string;
  startDate: string;
  endDate: string;
  description: string;
  included: boolean;
}

export interface ProjectExperience {
  id: string;
  position: string;
  organization: string;
  department?: string;
  location?: string;
  startDate: string;
  endDate: string;
  description: string;
  included: boolean;
}

export interface ResearchExperience {
  id: string;
  position: string;
  organization: string;
  department?: string;
  location?: string;
  startDate: string;
  endDate: string;
  description: string;
  included: boolean;
}

// New Summary interface
export interface Summary {
  content: string;
  included: boolean;
}

// New Portfolio interface
export interface Portfolio {
  id: string;
  name: string;
  url: string;
  qrCode?: string; // Generated QR code as base64 data URL
  included: boolean;
}

export interface ResumeModule {
  id: string;
  type:
    | "experience"
    | "education"
    | "skills"
    | "summary"
    | "portfolio"
    | "leadership"
    | "project"
    | "research";
  title: string;
  order: number;
  enabled: boolean;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  leadershipExperiences: LeadershipExperience[];
  projectExperiences: ProjectExperience[];
  researchExperiences: ResearchExperience[];
  summary: Summary;
  portfolio: Portfolio[];
  modules: ResumeModule[];
  spacing: number; // Horizontal spacing in pixels
}

export type ModuleType =
  | "experience"
  | "education"
  | "skills"
  | "summary"
  | "portfolio"
  | "leadership"
  | "project"
  | "research";
