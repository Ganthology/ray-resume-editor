"use client";

import { Document, Font, Image, Page, Text, View } from "@react-pdf/renderer";

import { Experience } from "@/modules/resume/data/entity/Experience";
import { LeadershipExperience } from "@/modules/resume/data/entity/LeadershipExperience";
import { ProjectExperience } from "@/modules/resume/data/entity/ProjectExperience";
import React from "react";
import { ResearchExperience } from "@/modules/resume/data/entity/ResearchExperience";
import { ResumeData } from "@/modules/resume/data/entity/ResumeData";
import { ResumeModule } from "@/modules/resume/data/entity/ResumeModule";
import { parseHtmlToPdf } from "../viewModel/ResumePDFViewModel";
import { pdfStyles } from "../style/pdfStyles";

// Register Times New Roman font (this was working before)
Font.register({
  family: "Times-Roman",
  src: "https://fonts.gstatic.com/s/timesnewroman/v1/Times_New_Roman.ttf",
});

Font.register({
  family: "Geist",
  src: "https://fonts.googleapis.com/css2?family=Geist:wght@100..900",
});

Font.register({
  family: "GeistMono",
  src: "https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&display=swap",
});

interface ResumePDFProps {
  resumeData: ResumeData;
}

// Union type for experience-like objects
type ExperienceType =
  | Experience
  | LeadershipExperience
  | ProjectExperience
  | ResearchExperience;

const A4_SIZE = {
  "72_PPI": {
    width: 595,
    height: 842,
  },
  "87_PPI": { width: 720, height: 1017.9 },
  "96_PPI": {
    width: 794,
    height: 1123,
  },
} as const;

export default function ResumePDF({ resumeData }: ResumePDFProps) {
  const sortedModules = resumeData.modules
    .filter((module) => module.enabled)
    .sort((a, b) => a.order - b.order);

  // Get style preferences
  const fitMode = resumeData.styles?.fitMode || "normal";
  const fontFamily = resumeData.styles?.fontFamily || "times-new-roman";

  // Map font family values to PDF font names (using built-in and registered fonts)
  const getFontFamily = (font: string) => {
    switch (font) {
      case "geist-sans":
        return "Geist"; // Use built-in Helvetica as fallback for sans-serif
      case "geist-mono":
        return "GeistMono"; // Use built-in Courier as fallback for monospace
      case "times-new-roman":
      default:
        return "Times-Roman"; // Use registered Times New Roman
    }
  };

  // Get the appropriate page size based on fit mode
  const getPageSize = () => {
    return fitMode === "compact" ? A4_SIZE["96_PPI"] : A4_SIZE["72_PPI"];
  };

  // Create dynamic styles based on preferences
  const getDynamicStyles = () => {
    const selectedFont = getFontFamily(fontFamily);

    return {
      ...pdfStyles,
      page: {
        ...pdfStyles.page,
        fontFamily: selectedFont,
      },
    };
  };

  const dynamicStyles = getDynamicStyles();
  const pageSize = getPageSize();

  const includedExperiences = resumeData.experiences.filter(
    (exp) => exp.included
  );
  const includedEducation = resumeData.education.filter((edu) => edu.included);
  const includedSkills = resumeData.skills.filter((skill) => skill.included);
  const includedLeadershipExperiences = resumeData.leadershipExperiences.filter(
    (exp) => exp.included
  );
  const includedProjectExperiences = resumeData.projectExperiences.filter(
    (exp) => exp.included
  );
  const includedResearchExperiences = resumeData.researchExperiences.filter(
    (exp) => exp.included
  );
  const includedPortfolio = resumeData.portfolio.filter(
    (item) => item.included
  );

  // Format date from YYYY-MM to readable format
  const formatDate = (date: string): string => {
    if (!date) return "";
    if (date === "Present") return "Present";
    const [year, month] = date.split("-");
    if (!year || !month) return date;
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  // Helper function to render experience-like sections
  const renderExperienceSection = (
    experiences: ExperienceType[],
    module: ResumeModule
  ) => {
    if (experiences.length === 0) return null;

    return (
      <View key={module.id} style={pdfStyles.section}>
        <Text style={pdfStyles.sectionTitle}>{module.title}</Text>
        {experiences.map((exp: ExperienceType) => {
          // Type guard to check if experience has company property
          const getOrganizationName = (experience: ExperienceType): string => {
            if ("company" in experience) {
              return experience.company;
            }
            return experience.organization;
          };

          return (
            <View key={exp.id} style={pdfStyles.experienceItem}>
              <View style={pdfStyles.experienceHeader}>
                <Text>
                  <Text style={pdfStyles.company}>
                    {getOrganizationName(exp)}
                  </Text>
                  {exp.department && (
                    <Text style={pdfStyles.company}>, {exp.department}</Text>
                  )}
                </Text>
                {exp.startDate && exp.endDate && (
                  <Text style={pdfStyles.date}>
                    {exp.endDate === "Present"
                      ? `${formatDate(exp.startDate)} - Present`
                      : `${formatDate(exp.startDate)} - ${formatDate(
                          exp.endDate
                        )}`}
                  </Text>
                )}
              </View>
              <View style={pdfStyles.experienceSubheader}>
                <Text style={pdfStyles.jobTitle}>{exp.position}</Text>
                <Text style={pdfStyles.jobLocation}>
                  {exp.location && `${exp.location}`}
                </Text>
              </View>
              {exp.description && (
                <View style={pdfStyles.description}>
                  {parseHtmlToPdf(exp.description)}
                </View>
              )}
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <Document>
      <Page size={pageSize} style={dynamicStyles.page}>
        {/* Personal Information */}
        <View style={pdfStyles.header}>
          <Text style={pdfStyles.name}>
            {resumeData.personalInfo.name || "Your Name"}
          </Text>
          {(resumeData.personalInfo.email || resumeData.personalInfo.phone) && (
            <Text style={pdfStyles.headerItem}>
              {resumeData.personalInfo.email}
              {resumeData.personalInfo.email &&
                resumeData.personalInfo.phone &&
                " | "}
              {resumeData.personalInfo.phone}
            </Text>
          )}
          {resumeData.personalInfo.address && (
            <Text style={pdfStyles.headerItem}>
              {resumeData.personalInfo.address}
            </Text>
          )}
          {(resumeData.personalInfo.linkedinUrl ||
            resumeData.personalInfo.personalSiteUrl) && (
            <Text style={pdfStyles.headerItem}>
              {resumeData.personalInfo.linkedinUrl}
              {resumeData.personalInfo.linkedinUrl &&
                resumeData.personalInfo.personalSiteUrl &&
                " | "}
              {resumeData.personalInfo.personalSiteUrl}
            </Text>
          )}
        </View>

        {/* Dynamic Sections */}
        {sortedModules.map((module) => {
          switch (module.type) {
            case "summary":
              if (
                !resumeData.summary.included ||
                !resumeData.summary.content.trim()
              )
                return null;
              return (
                <View key={module.id} style={pdfStyles.section}>
                  <Text style={pdfStyles.sectionTitle}>{module.title}</Text>
                  <View style={pdfStyles.description}>
                    {parseHtmlToPdf(resumeData.summary.content)}
                  </View>
                </View>
              );

            case "experience":
              return renderExperienceSection(includedExperiences, module);

            case "leadership":
              return renderExperienceSection(
                includedLeadershipExperiences,
                module
              );

            case "project":
              return renderExperienceSection(
                includedProjectExperiences,
                module
              );

            case "research":
              return renderExperienceSection(
                includedResearchExperiences,
                module
              );

            case "education":
              if (includedEducation.length === 0) return null;
              return (
                <View key={module.id} style={pdfStyles.section}>
                  <Text style={pdfStyles.sectionTitle}>{module.title}</Text>
                  {includedEducation.map((edu) => (
                    <View key={edu.id} style={pdfStyles.experienceItem}>
                      {/* Institution Name | Date Range */}
                      <View style={pdfStyles.experienceHeader}>
                        <Text style={pdfStyles.company}>
                          {edu.institution || "Institution"}
                        </Text>
                        <Text style={pdfStyles.date}>
                          {edu.startDate && edu.endDate
                            ? edu.endDate === "Present"
                              ? `${formatDate(edu.startDate)} - Present`
                              : `${formatDate(edu.startDate)} - ${formatDate(
                                  edu.endDate
                                )}`
                            : edu.endDate === "Present"
                            ? `${formatDate(edu.startDate)} - Present`
                            : formatDate(edu.endDate) ||
                              edu.graduationDate ||
                              ""}
                        </Text>
                      </View>

                      {/* Degree/Program | Location */}
                      <View style={pdfStyles.experienceHeader}>
                        <Text style={pdfStyles.jobTitle}>
                          {edu.degree}
                          {edu.fieldOfStudy && ` in ${edu.fieldOfStudy}`}
                        </Text>
                        {edu.location && (
                          <Text style={pdfStyles.jobTitle}>{edu.location}</Text>
                        )}
                      </View>

                      {/* GPA Information */}
                      {edu.gpa && (
                        <Text
                          style={[
                            pdfStyles.description,
                            { fontSize: 11, marginTop: 2 },
                          ]}
                        >
                          CGPA: {edu.gpa}
                        </Text>
                      )}

                      {/* Description if provided */}
                      {edu.description && edu.description.trim() && (
                        <View style={pdfStyles.description}>
                          {parseHtmlToPdf(edu.description)}
                        </View>
                      )}
                    </View>
                  ))}
                </View>
              );

            case "skills":
              if (includedSkills.length === 0) return null;
              const skillsByCategory = {
                skill: includedSkills.filter((s) => s.category === "skill"),
                certification: includedSkills.filter(
                  (s) => s.category === "certification"
                ),
                language: includedSkills.filter(
                  (s) => s.category === "language"
                ),
                interest: includedSkills.filter(
                  (s) => s.category === "interest"
                ),
                activity: includedSkills.filter(
                  (s) => s.category === "activity"
                ),
                other: includedSkills.filter((s) => s.category === "other"),
              };

              return (
                <View key={module.id} style={pdfStyles.section}>
                  <Text style={pdfStyles.sectionTitle}>{module.title}</Text>

                  {skillsByCategory.skill.length > 0 && (
                    <View style={pdfStyles.skillsContainer}>
                      <Text>
                        <Text style={pdfStyles.skillCategory}>Skills: </Text>
                        <Text style={pdfStyles.skillList}>
                          {skillsByCategory.skill
                            .map((skill) => skill.name)
                            .join(", ")}
                        </Text>
                      </Text>
                    </View>
                  )}

                  {skillsByCategory.certification.length > 0 && (
                    <View style={pdfStyles.skillsContainer}>
                      <Text>
                        <Text style={pdfStyles.skillCategory}>
                          Certifications:{" "}
                        </Text>
                        <Text style={pdfStyles.skillList}>
                          {skillsByCategory.certification
                            .map((skill) => skill.name)
                            .join(", ")}
                        </Text>
                      </Text>
                    </View>
                  )}

                  {skillsByCategory.language.length > 0 && (
                    <View style={pdfStyles.skillsContainer}>
                      <Text>
                        <Text style={pdfStyles.skillCategory}>Languages: </Text>
                        <Text style={pdfStyles.skillList}>
                          {skillsByCategory.language
                            .map((skill) => skill.name)
                            .join(", ")}
                        </Text>
                      </Text>
                    </View>
                  )}

                  {skillsByCategory.interest.length > 0 && (
                    <View style={pdfStyles.skillsContainer}>
                      <Text>
                        <Text style={pdfStyles.skillCategory}>Interests: </Text>
                        <Text style={pdfStyles.skillList}>
                          {skillsByCategory.interest
                            .map((skill) => skill.name)
                            .join(", ")}
                        </Text>
                      </Text>
                    </View>
                  )}

                  {skillsByCategory.activity.length > 0 && (
                    <View style={pdfStyles.skillsContainer}>
                      <Text>
                        <Text style={pdfStyles.skillCategory}>
                          Activities:{" "}
                        </Text>
                        <Text style={pdfStyles.skillList}>
                          {skillsByCategory.activity
                            .map((skill) => skill.name)
                            .join(", ")}
                        </Text>
                      </Text>
                    </View>
                  )}

                  {skillsByCategory.other.length > 0 && (
                    <View style={pdfStyles.skillsContainer}>
                      <Text>
                        <Text style={pdfStyles.skillCategory}>Others: </Text>
                        <Text style={pdfStyles.skillList}>
                          {skillsByCategory.other
                            .map((skill) => skill.name)
                            .join(", ")}
                        </Text>
                      </Text>
                    </View>
                  )}
                </View>
              );

            case "portfolio":
              if (includedPortfolio.length === 0) return null;
              return (
                <View key={module.id} style={pdfStyles.section}>
                  <Text style={pdfStyles.sectionTitle}>{module.title}</Text>
                  {includedPortfolio.map((item) => (
                    <View key={item.id} style={pdfStyles.experienceItem}>
                      <View style={pdfStyles.experienceHeader}>
                        <View style={{ flex: 1 }}>
                          <Text style={pdfStyles.jobTitle}>{item.name}</Text>
                          <Text style={pdfStyles.date}>{item.url}</Text>
                        </View>
                        {item.qrCode && (
                          <View
                            style={{ alignItems: "center", marginLeft: 10 }}
                          >
                            {/* eslint-disable-next-line jsx-a11y/alt-text */}
                            <Image
                              src={item.qrCode}
                              style={{
                                width: 50,
                                height: 50,
                                marginBottom: 4,
                              }}
                            />
                            <Text
                              style={[
                                pdfStyles.skillList,
                                { fontSize: 8, textAlign: "center" },
                              ]}
                            >
                              Scan to visit
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                  ))}
                </View>
              );

            default:
              return null;
          }
        })}
      </Page>
    </Document>
  );
}
