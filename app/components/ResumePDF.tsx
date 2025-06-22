"use client";

import { Document, Font, Page, Text, View } from "@react-pdf/renderer";

import React from "react";
import { ResumeData } from "../types/resume";
import { parseHtmlToPdf } from "../../lib/htmlToPdf";
import { pdfStyles } from "../styles/pdfStyles";

// Register fonts for better text rendering
Font.register({
  family: "Times-Roman",
  src: "https://fonts.gstatic.com/s/timesnewroman/v1/Times_New_Roman.ttf",
});

interface ResumePDFProps {
  resumeData: ResumeData;
}

export default function ResumePDF({ resumeData }: ResumePDFProps) {
  const sortedModules = resumeData.modules
    .filter((module) => module.enabled)
    .sort((a, b) => a.order - b.order);

  const includedExperiences = resumeData.experiences.filter(
    (exp) => exp.included
  );
  const includedEducation = resumeData.education.filter((edu) => edu.included);
  const includedSkills = resumeData.skills.filter((skill) => skill.included);

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

  return (
    <Document>
      <Page size={{ width: 720, height: 1017.9 }} style={pdfStyles.page}>
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
            case "experience":
              if (includedExperiences.length === 0) return null;
              return (
                <View key={module.id} style={pdfStyles.section}>
                  <Text style={pdfStyles.sectionTitle}>{module.title}</Text>
                  {includedExperiences.map((exp) => (
                    <View key={exp.id} style={pdfStyles.experienceItem}>
                      <View style={pdfStyles.experienceHeader}>
                        <Text>
                          {exp.company && (
                            <Text style={pdfStyles.company}>{exp.company}</Text>
                          )}
                          {exp.department && (
                            <Text style={pdfStyles.company}>
                              , {exp.department}
                            </Text>
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
                  ))}
                </View>
              );

            case "education":
              if (includedEducation.length === 0) return null;
              return (
                <View key={module.id} style={pdfStyles.section}>
                  <Text style={pdfStyles.sectionTitle}>{module.title}</Text>
                  {includedEducation.map((edu) => (
                    <View key={edu.id} style={pdfStyles.experienceItem}>
                      <View style={pdfStyles.experienceHeader}>
                        <Text>
                          <Text style={pdfStyles.jobTitle}>{edu.degree}</Text>
                          {edu.fieldOfStudy && (
                            <Text style={pdfStyles.company}>
                              {" "}
                              in {edu.fieldOfStudy}
                            </Text>
                          )}
                          {edu.institution && (
                            <Text style={pdfStyles.company}>
                              {" "}
                              - {edu.institution}
                            </Text>
                          )}
                        </Text>
                        {(edu.endDate || edu.graduationDate) && (
                          <Text style={pdfStyles.date}>
                            {edu.endDate === "Present"
                              ? `${formatDate(edu.startDate)} - Present`
                              : formatDate(edu.endDate) || edu.graduationDate}
                          </Text>
                        )}
                      </View>
                      {edu.gpa && (
                        <Text style={[pdfStyles.description, { fontSize: 11 }]}>
                          GPA: {edu.gpa}
                        </Text>
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

            case "custom":
              const customSection = resumeData.customSections.find(
                (s) => s.id === module.customSectionId
              );
              if (!customSection || !customSection.content.trim()) return null;

              return (
                <View key={module.id} style={pdfStyles.section}>
                  <Text style={pdfStyles.sectionTitle}>
                    {customSection.title}
                  </Text>
                  <View style={pdfStyles.description}>
                    {parseHtmlToPdf(customSection.content)}
                  </View>
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
