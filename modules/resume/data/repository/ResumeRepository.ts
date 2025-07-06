import { ResumeData } from "../entity/ResumeData";

export interface ResumeRepository {
  saveResume(resume: ResumeData): Promise<void>;
  loadResume(): Promise<ResumeData>;
}
