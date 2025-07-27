import { Education } from "./Education";
import { Experience } from "./Experience";
import { LeadershipExperience } from "./LeadershipExperience";
import { PersonalInfo } from "./PersonalInfo";
import { Portfolio } from "./Portfolio";
import { ProjectExperience } from "./ProjectExperience";
import { ResearchExperience } from "./ResearchExperience";
import { ResumeModule } from "./ResumeModule";
import { Skill } from "./Skill";
import { Summary } from "./Summary";

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
  spacing: number; // Horizontal spacing in pixels - deprecated, use styles.spacing instead
  styles?: {
    fitMode: "compact" | "normal";
    spacing?: {
      horizontal: number; // Left/right page margins in pixels
      vertical: number;   // Top/bottom page margins in pixels
    };
  };
}
