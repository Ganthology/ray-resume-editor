import { ResumeData } from "../entity/ResumeData";

export class ResumeLocalDataSource {
  constructor() {}

  async saveResume(resume: ResumeData) {
    const resumeJson = JSON.stringify(resume);
    localStorage.setItem("resume", resumeJson);
  }

  async loadResume(): Promise<ResumeData> {
    const resumeJson = localStorage.getItem("resume");
    if (!resumeJson) {
      return initialData;
    }
    return JSON.parse(resumeJson);
  }

  async getResume(): Promise<ResumeData> {
    const resumeJson = localStorage.getItem("resume");
    if (!resumeJson) {
      return initialData;
    }
    return JSON.parse(resumeJson);
  }
}
