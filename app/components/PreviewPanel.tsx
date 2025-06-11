"use client";

import React from "react";
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
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className="bg-gray-100 px-4 py-2 border-b">
        <h2 className="text-sm font-medium text-gray-700">Resume Preview</h2>
        <p className="text-xs text-gray-500">
          This preview matches the PDF output exactly
        </p>
      </div>

      <div className="p-8 bg-white">
        <div
          id="resume-preview"
          style={{
            fontFamily: "Times New Roman, serif",
            fontSize: "12px",
            lineHeight: "1.4",
            color: "#000000",
            width: "100%",
            minHeight: "auto",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            paddingLeft: `${resumeData.spacing}px`,
            paddingRight: `${resumeData.spacing}px`,
            paddingTop: "20px",
            paddingBottom: "20px",
            boxSizing: "border-box",
          }}
        >
          {/* Personal Information */}
          <div
            style={{ textAlign: "center", marginBottom: "20px", width: "100%" }}
          >
            <h1
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                margin: "0 0 8px 0",
                textTransform: "uppercase",
                letterSpacing: "0.5px", // Reduced from '1px' to '0.5px' for tighter spacing
              }}
            >
              {resumeData.personalInfo.name || "Your Name"}
            </h1>
            <div style={{ fontSize: "12px", margin: "4px 0" }}>
              {resumeData.personalInfo.email && (
                <span>{resumeData.personalInfo.email}</span>
              )}
              {resumeData.personalInfo.email &&
                resumeData.personalInfo.phone &&
                " | "}
              {resumeData.personalInfo.phone && (
                <span>{resumeData.personalInfo.phone}</span>
              )}
            </div>
            {resumeData.personalInfo.address && (
              <div style={{ fontSize: "12px", margin: "4px 0" }}>
                {resumeData.personalInfo.address}
              </div>
            )}
            {(resumeData.personalInfo.linkedinUrl ||
              resumeData.personalInfo.personalSiteUrl) && (
              <div style={{ fontSize: "11px", margin: "4px 0" }}>
                {resumeData.personalInfo.linkedinUrl && (
                  <span>{resumeData.personalInfo.linkedinUrl}</span>
                )}
                {resumeData.personalInfo.linkedinUrl &&
                  resumeData.personalInfo.personalSiteUrl &&
                  " | "}
                {resumeData.personalInfo.personalSiteUrl && (
                  <span>{resumeData.personalInfo.personalSiteUrl}</span>
                )}
              </div>
            )}
          </div>

          {sortedModules.map((module) => {
            switch (module.type) {
              case "experience":
                if (includedExperiences.length === 0) return null;
                return (
                  <div key={module.id} style={{ marginBottom: "20px" }}>
                    <h2
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        borderBottom: "1px solid #000",
                        paddingBottom: "4px",
                        marginBottom: "12px",
                      }}
                    >
                      {module.title}
                    </h2>
                    {includedExperiences.map((exp, index) => (
                      <div
                        key={exp.id}
                        style={{
                          marginBottom:
                            index < includedExperiences.length - 1
                              ? "12px"
                              : "0",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            marginBottom: "2px",
                          }}
                        >
                          <div>
                            <strong>{exp.position}</strong>
                            {exp.company && <span> - {exp.company}</span>}
                            {exp.department && <span>, {exp.department}</span>}
                          </div>
                          <div
                            style={{ fontSize: "11px", fontStyle: "italic" }}
                          >
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
                          <div style={{ marginTop: "4px", fontSize: "12px" }}>
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
                  <div key={module.id} style={{ marginBottom: "20px" }}>
                    <h2
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        borderBottom: "1px solid #000",
                        paddingBottom: "4px",
                        marginBottom: "12px",
                      }}
                    >
                      {module.title}
                    </h2>
                    {includedEducation.map((edu, index) => (
                      <div
                        key={edu.id}
                        style={{
                          marginBottom:
                            index < includedEducation.length - 1 ? "12px" : "0",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            marginBottom: "2px",
                          }}
                        >
                          <div>
                            <strong>{edu.degree}</strong>
                            {edu.fieldOfStudy && (
                              <span> in {edu.fieldOfStudy}</span>
                            )}
                            {edu.institution && (
                              <span> - {edu.institution}</span>
                            )}
                          </div>
                          <div
                            style={{ fontSize: "11px", fontStyle: "italic" }}
                          >
                            {edu.graduationDate}
                          </div>
                        </div>
                        {edu.gpa && (
                          <div style={{ fontSize: "11px" }}>GPA: {edu.gpa}</div>
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
                  <div key={module.id} style={{ marginBottom: "20px" }}>
                    <h2
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        borderBottom: "1px solid #000",
                        paddingBottom: "4px",
                        marginBottom: "12px",
                      }}
                    >
                      {module.title}
                    </h2>

                    {skillsByCategory.skill.length > 0 && (
                      <div style={{ marginBottom: "8px" }}>
                        <strong>Skills: </strong>
                        {skillsByCategory.skill
                          .map((skill) => skill.name)
                          .join(", ")}
                      </div>
                    )}

                    {skillsByCategory.certification.length > 0 && (
                      <div style={{ marginBottom: "8px" }}>
                        <strong>Certifications: </strong>
                        {skillsByCategory.certification
                          .map((skill) => skill.name)
                          .join(", ")}
                      </div>
                    )}

                    {skillsByCategory.other.length > 0 && (
                      <div style={{ marginBottom: "8px" }}>
                        <strong>Others: </strong>
                        {skillsByCategory.other
                          .map((skill) => skill.name)
                          .join(", ")}
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
                  <div key={module.id} style={{ marginBottom: "20px" }}>
                    <h2
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        borderBottom: "1px solid #000",
                        paddingBottom: "4px",
                        marginBottom: "12px",
                      }}
                    >
                      {module.title}
                    </h2>
                    {includedCustomItems.map((item, index) => (
                      <div
                        key={item.id}
                        style={{
                          marginBottom:
                            index < includedCustomItems.length - 1
                              ? "12px"
                              : "0",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            marginBottom: "2px",
                          }}
                        >
                          <div>
                            <strong>{item.title}</strong>
                            {item.subtitle && <span> - {item.subtitle}</span>}
                          </div>
                          {item.date && (
                            <div
                              style={{ fontSize: "11px", fontStyle: "italic" }}
                            >
                              {item.date}
                            </div>
                          )}
                        </div>
                        {item.description && (
                          <div style={{ marginTop: "4px", fontSize: "12px" }}>
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
      </div>
    </div>
  );
}
