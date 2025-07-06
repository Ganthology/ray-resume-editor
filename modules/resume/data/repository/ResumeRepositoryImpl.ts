import { ResumeData } from "../entity/ResumeData";
import { ResumeRepository } from "./ResumeRepository";

export class ResumeRepositoryImpl implements ResumeRepository {
  constructor() {}

  async saveResume(resume: ResumeData): Promise<void> {
    // TODO: save resume to local storage or zustand store
    console.log("saveResume", resume);
  }

  async loadResume(): Promise<ResumeData> {
    // TODO: load resume from local storage or zustand store
    console.log("loadResume");
    return {} as ResumeData;
  }
}
