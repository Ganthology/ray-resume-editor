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
