export interface Education {
  id: string;
  degree: string;
  fieldOfStudy: string;
  institution: string;
  graduationDate: string;
  startDate: string;
  endDate: string;
  location?: string; // Location of the institution
  gpa?: string;
  description?: string; // Optional description field
  included: boolean;
}
