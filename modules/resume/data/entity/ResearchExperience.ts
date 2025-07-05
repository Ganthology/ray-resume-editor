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
