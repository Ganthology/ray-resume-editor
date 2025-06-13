import { style } from "@vanilla-extract/css";

// Shared style values that can be used across components
export const styleValues = {
  fonts: {
    primary: "Times New Roman, serif",
  },
  fontSize: {
    name: "14px",
    sectionTitle: "14px",
    contact: "12px",
    date: "11px",
    description: "12px",
    body: "12px",
    links: "11px",
    gpa: "11px",
  },
  spacing: {
    page: "30px",
    headerBottom: "20px",
    nameBottom: "8px",
    contactBottom: "4px",
    sectionBottom: "12px",
    sectionTitlePaddingBottom: "6px",
    sectionTitleMarginBottom: "6px",
    itemBottom: "6px",
    itemSubSpacing: "4px",
    descriptionTop: "4px",
    skillsBottom: "4px",
    headerSpacing: "2px",
  },
  colors: {
    text: "#000000",
    background: "#ffffff",
    border: "#000000",
  },
  lineHeight: "1.4",
  letterSpacing: "0.5px",
};

// Vanilla Extract styles for web preview
export const resumeContainer = style({
  fontFamily: styleValues.fonts.primary,
  fontSize: styleValues.fontSize.body,
  lineHeight: styleValues.lineHeight,
  color: styleValues.colors.text,
  backgroundColor: styleValues.colors.background,
});

export const personalInfoSection = style({
  textAlign: "center",
  marginBottom: styleValues.spacing.headerBottom,
  width: "100%",
});

export const nameHeader = style({
  fontSize: styleValues.fontSize.name,
  fontWeight: "bold",
  margin: `0 0 ${styleValues.spacing.nameBottom} 0`,
  textTransform: "uppercase",
  letterSpacing: styleValues.letterSpacing,
});

export const contactInfo = style({
  fontSize: styleValues.fontSize.contact,
  margin: `${styleValues.spacing.contactBottom} 0`,
});

export const linksInfo = style({
  fontSize: styleValues.fontSize.links,
  margin: `${styleValues.spacing.contactBottom} 0`,
});

export const section = style({
  marginBottom: styleValues.spacing.sectionBottom,
});

export const sectionTitle = style({
  fontSize: styleValues.fontSize.sectionTitle,
  fontWeight: "bold",
  textTransform: "uppercase",
  borderBottom: `1px solid ${styleValues.colors.border}`,
  paddingBottom: styleValues.spacing.sectionTitlePaddingBottom,
  marginBottom: styleValues.spacing.sectionTitleMarginBottom,
});

export const experienceItem = style({
  marginBottom: styleValues.spacing.itemBottom,
});

export const experienceHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: styleValues.spacing.headerSpacing,
});

export const jobTitle = style({
  fontWeight: "bold",
});

export const dateInfo = style({
  fontSize: styleValues.fontSize.date,
  fontStyle: "italic",
});

export const description = style({
  marginTop: styleValues.spacing.descriptionTop,
  fontSize: styleValues.fontSize.description,
});

export const skillsContainer = style({
  marginBottom: styleValues.spacing.skillsBottom,
});

export const skillCategory = style({
  fontWeight: "bold",
});

export const gpaInfo = style({
  fontSize: styleValues.fontSize.gpa,
});
