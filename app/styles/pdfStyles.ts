import { StyleSheet } from "@react-pdf/renderer";
import { styleValues } from "./resume.css";

// Convert shared style values to react-pdf StyleSheet format
export const pdfStyles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: styleValues.colors.background,
    padding: parseInt(styleValues.spacing.page),
    fontFamily: "Times-Roman",
    fontSize: parseInt(styleValues.fontSize.body),
    lineHeight: parseFloat(styleValues.lineHeight),
  },
  header: {
    textAlign: "center",
    marginBottom: parseInt(styleValues.spacing.headerBottom),
  },
  name: {
    fontSize: parseInt(styleValues.fontSize.name),
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: parseFloat(styleValues.letterSpacing),
    marginBottom: parseInt(styleValues.spacing.nameBottom),
    lineHeight: 1,
  },
  headerItem: {
    fontSize: parseInt(styleValues.fontSize.contact),
    marginBottom: parseInt(styleValues.spacing.contactBottom),
    lineHeight: 1,
  },
  section: {
    marginBottom: parseInt(styleValues.spacing.sectionBottom),
  },
  sectionTitle: {
    fontSize: parseInt(styleValues.fontSize.sectionTitle),
    fontWeight: "bold",
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: styleValues.colors.border,
    paddingBottom: parseInt(styleValues.spacing.sectionTitlePaddingBottom),
    marginBottom: parseInt(styleValues.spacing.sectionTitleMarginBottom),
  },
  experienceItem: {
    marginBottom: parseInt(styleValues.spacing.itemBottom),
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: parseInt(styleValues.spacing.headerSpacing),
  },
  jobTitle: {
    fontWeight: "bold",
  },
  company: {
    fontWeight: "normal",
  },
  date: {
    fontSize: parseInt(styleValues.fontSize.date),
    fontStyle: "italic",
  },
  description: {
    marginTop: parseInt(styleValues.spacing.descriptionTop),
    fontSize: parseInt(styleValues.fontSize.description),
  },
  skillsContainer: {
    marginBottom: parseInt(styleValues.spacing.skillsBottom),
  },
  skillCategory: {
    fontWeight: "bold",
  },
  skillList: {
    fontWeight: "normal",
  },
});
