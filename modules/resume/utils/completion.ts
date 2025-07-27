import { ResumeData } from "../data/entity/ResumeData";

export function calculateResumeCompletion(resumeData: ResumeData): number {
  let totalPoints = 0;
  let earnedPoints = 0;

  // Personal Information (20 points)
  totalPoints += 20;
  if (resumeData.personalInfo.name) earnedPoints += 5;
  if (resumeData.personalInfo.email) earnedPoints += 5;
  if (resumeData.personalInfo.phone) earnedPoints += 3;
  if (resumeData.personalInfo.address) earnedPoints += 2;
  if (resumeData.personalInfo.linkedinUrl || resumeData.personalInfo.personalSiteUrl) earnedPoints += 5;

  // Experience (30 points)
  totalPoints += 30;
  const includedExperiences = resumeData.experiences.filter(exp => exp.included);
  if (includedExperiences.length > 0) earnedPoints += 15;
  if (includedExperiences.length >= 2) earnedPoints += 10;
  if (includedExperiences.some(exp => exp.description && exp.description.trim())) earnedPoints += 5;

  // Education (15 points)
  totalPoints += 15;
  const includedEducation = resumeData.education.filter(edu => edu.included);
  if (includedEducation.length > 0) earnedPoints += 10;
  if (includedEducation.some(edu => edu.description && edu.description.trim())) earnedPoints += 5;

  // Skills (15 points)
  totalPoints += 15;
  const includedSkills = resumeData.skills.filter(skill => skill.included);
  if (includedSkills.length >= 5) earnedPoints += 10;
  if (includedSkills.length >= 10) earnedPoints += 5;

  // Summary (10 points)
  totalPoints += 10;
  if (resumeData.summary.included && resumeData.summary.content.trim()) {
    if (resumeData.summary.content.length > 50) earnedPoints += 10;
    else if (resumeData.summary.content.length > 20) earnedPoints += 5;
  }

  // Additional sections (10 points)
  totalPoints += 10;
  const includedLeadership = resumeData.leadershipExperiences.filter(exp => exp.included);
  const includedProjects = resumeData.projectExperiences.filter(exp => exp.included);
  const includedResearch = resumeData.researchExperiences.filter(exp => exp.included);
  const includedPortfolio = resumeData.portfolio.filter(item => item.included);

  if (includedLeadership.length > 0) earnedPoints += 3;
  if (includedProjects.length > 0) earnedPoints += 3;
  if (includedResearch.length > 0) earnedPoints += 2;
  if (includedPortfolio.length > 0) earnedPoints += 2;

  return Math.min(100, Math.round((earnedPoints / totalPoints) * 100));
}

export function getCompletionStatus(percentage: number): {
  label: string;
  color: string;
  bgColor: string;
} {
  if (percentage >= 90) {
    return {
      label: "Excellent",
      color: "text-green-700",
      bgColor: "bg-green-500"
    };
  } else if (percentage >= 70) {
    return {
      label: "Good",
      color: "text-blue-700", 
      bgColor: "bg-blue-500"
    };
  } else if (percentage >= 50) {
    return {
      label: "Fair",
      color: "text-yellow-700",
      bgColor: "bg-yellow-500"
    };
  } else {
    return {
      label: "Needs Work",
      color: "text-red-700",
      bgColor: "bg-red-500"
    };
  }
}