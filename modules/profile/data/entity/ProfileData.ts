export interface ProfileData {
  personalInfo: {
    name: string;
    city: string;
    country: string;
    phone: string;
    email: string;
    githubUrl: string;
    portfolioUrl: string;
    linkedinUrl: string;
  };
  preferences: {
    preferredIndustry: string;
    experienceLevel: 'entry' | 'mid' | 'senior' | 'executive';
    lookingForWork: boolean;
  };
  lastUpdated: Date;
}

export const initialProfileData: ProfileData = {
  personalInfo: {
    name: '',
    city: '',
    country: '',
    phone: '',
    email: '',
    githubUrl: '',
    portfolioUrl: '',
    linkedinUrl: '',
  },
  preferences: {
    preferredIndustry: '',
    experienceLevel: 'entry',
    lookingForWork: false,
  },
  lastUpdated: new Date(),
};