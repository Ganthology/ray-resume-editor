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
