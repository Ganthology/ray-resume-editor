"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import React from "react";
import { pdfStyles } from "../styles/pdfStyles";
import { useResumeStore } from "../store/resumeStore";

export default function PreviewPanel() {
  const resumeData = useResumeStore((state) => state.resumeData);

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
    <Card className="border-gray-200/60 shadow-sm bg-gray-50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            Resume Preview
            <Badge variant="secondary" className="text-xs">
              Live
            </Badge>
          </CardTitle>
        </div>
        <p className="text-sm text-gray-600">
          This preview matches the PDF output exactly
        </p>
      </CardHeader>

      <CardContent className="p-6 border-t border-gray-200">
        <div id="resume-preview" className="pdf-content" style={pdfStyles.page}>
          {/* Personal Information */}
          <div className="pdf-section personal-info" style={pdfStyles.header}>
            <h1 className="pdf-name" style={pdfStyles.name}>
              {resumeData.personalInfo.name || "Your Name"}
            </h1>
            <div className="pdf-contact" style={pdfStyles.contact}>
              {resumeData.personalInfo.email && (
                <span className="pdf-email">
                  {resumeData.personalInfo.email}
                </span>
              )}
              {resumeData.personalInfo.email &&
                resumeData.personalInfo.phone &&
                " | "}
              {resumeData.personalInfo.phone && (
                <span className="pdf-phone">
                  {resumeData.personalInfo.phone}
                </span>
              )}
            </div>
            {resumeData.personalInfo.address && (
              <div className="pdf-address" style={pdfStyles.contact}>
                {resumeData.personalInfo.address}
              </div>
            )}
            {(resumeData.personalInfo.linkedinUrl ||
              resumeData.personalInfo.personalSiteUrl) && (
              <div
                className="pdf-links"
                style={{ ...pdfStyles.contact, fontSize: 11 }}
              >
                {resumeData.personalInfo.linkedinUrl && (
                  <span className="pdf-linkedin">
                    {resumeData.personalInfo.linkedinUrl}
                  </span>
                )}
                {resumeData.personalInfo.linkedinUrl &&
                  resumeData.personalInfo.personalSiteUrl &&
                  " | "}
                {resumeData.personalInfo.personalSiteUrl && (
                  <span className="pdf-website">
                    {resumeData.personalInfo.personalSiteUrl}
                  </span>
                )}
              </div>
            )}
          </div>

          {sortedModules.map((module) => {
            switch (module.type) {
              case "experience":
                if (includedExperiences.length === 0) return null;
                return (
                  <div key={module.id} style={pdfStyles.section}>
                    <h2 style={pdfStyles.sectionTitle}>{module.title}</h2>
                    {includedExperiences.map((exp, index) => (
                      <div
                        key={exp.id}
                        style={{
                          ...pdfStyles.experienceItem,
                          marginBottom:
                            index < includedExperiences.length - 1
                              ? pdfStyles.experienceItem.marginBottom
                              : 0,
                        }}
                      >
                        <div style={pdfStyles.experienceHeader}>
                          <div>
                            <span style={pdfStyles.jobTitle}>
                              {exp.position}
                            </span>
                            {exp.company && <span> - {exp.company}</span>}
                            {exp.department && <span>, {exp.department}</span>}
                          </div>
                          <div style={pdfStyles.date}>
                            {exp.startDate &&
                              exp.endDate &&
                              (exp.endDate === "Present"
                                ? `${formatDate(exp.startDate)} - Present`
                                : `${formatDate(exp.startDate)} - ${formatDate(
                                    exp.endDate
                                  )}`)}
                          </div>
                        </div>
                        {exp.description && (
                          <div style={pdfStyles.description}>
                            {exp.description.split("\n").map((line, i) => (
                              <div key={i}>{line}</div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                );

              case "education":
                if (includedEducation.length === 0) return null;
                return (
                  <div key={module.id} style={pdfStyles.section}>
                    <h2 style={pdfStyles.sectionTitle}>{module.title}</h2>
                    {includedEducation.map((edu, index) => (
                      <div
                        key={edu.id}
                        style={{
                          ...pdfStyles.experienceItem,
                          marginBottom:
                            index < includedEducation.length - 1
                              ? pdfStyles.experienceItem.marginBottom
                              : 0,
                        }}
                      >
                        <div style={pdfStyles.experienceHeader}>
                          <div>
                            <span style={pdfStyles.jobTitle}>{edu.degree}</span>
                            {edu.fieldOfStudy && (
                              <span> in {edu.fieldOfStudy}</span>
                            )}
                            {edu.institution && (
                              <span> - {edu.institution}</span>
                            )}
                          </div>
                          <div style={pdfStyles.date}>{edu.graduationDate}</div>
                        </div>
                        {edu.gpa && (
                          <div
                            style={{ ...pdfStyles.description, fontSize: 11 }}
                          >
                            GPA: {edu.gpa}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
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
                  <div key={module.id} style={pdfStyles.section}>
                    <h2 style={pdfStyles.sectionTitle}>{module.title}</h2>

                    {skillsByCategory.skill.length > 0 && (
                      <div style={pdfStyles.skillsContainer}>
                        <span style={pdfStyles.skillCategory}>Skills: </span>
                        <span style={pdfStyles.skillList}>
                          {skillsByCategory.skill
                            .map((skill) => skill.name)
                            .join(", ")}
                        </span>
                      </div>
                    )}

                    {skillsByCategory.certification.length > 0 && (
                      <div style={pdfStyles.skillsContainer}>
                        <span style={pdfStyles.skillCategory}>
                          Certifications:{" "}
                        </span>
                        <span style={pdfStyles.skillList}>
                          {skillsByCategory.certification
                            .map((skill) => skill.name)
                            .join(", ")}
                        </span>
                      </div>
                    )}

                    {skillsByCategory.other.length > 0 && (
                      <div style={pdfStyles.skillsContainer}>
                        <span style={pdfStyles.skillCategory}>Others: </span>
                        <span style={pdfStyles.skillList}>
                          {skillsByCategory.other
                            .map((skill) => skill.name)
                            .join(", ")}
                        </span>
                      </div>
                    )}
                  </div>
                );

              case "custom":
                const customSection = resumeData.customSections.find(
                  (s) => s.id === module.customSectionId
                );
                if (!customSection) return null;
                const includedCustomItems = customSection.items.filter(
                  (item) => item.included
                );
                if (includedCustomItems.length === 0) return null;

                return (
                  <div key={module.id} style={pdfStyles.section}>
                    <h2 style={pdfStyles.sectionTitle}>{module.title}</h2>
                    {includedCustomItems.map((item, index) => (
                      <div
                        key={item.id}
                        style={{
                          ...pdfStyles.experienceItem,
                          marginBottom:
                            index < includedCustomItems.length - 1
                              ? pdfStyles.experienceItem.marginBottom
                              : 0,
                        }}
                      >
                        <div style={pdfStyles.experienceHeader}>
                          <div>
                            <span style={pdfStyles.jobTitle}>{item.title}</span>
                            {item.subtitle && <span> - {item.subtitle}</span>}
                          </div>
                          {item.date && (
                            <div style={pdfStyles.date}>{item.date}</div>
                          )}
                        </div>
                        {item.description && (
                          <div style={pdfStyles.description}>
                            {item.description.split("\n").map((line, i) => (
                              <div key={i}>{line}</div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                );

              default:
                return null;
            }
          })}
        </div>
      </CardContent>
    </Card>
  );
}
