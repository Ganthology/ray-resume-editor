import { ResumeData } from "@/modules/resume/data/entity/ResumeData";

export async function exportToPDFUseCase(resumeData: ResumeData) {
  // Dynamically import react-pdf components to avoid SSR issues
  const { pdf } = await import("@react-pdf/renderer");
  const { default: ResumePDF } = await import(
    "../../../resume/view/component/ResumePDF"
  );

  // Generate PDF with actual text elements
  const blob = await pdf(<ResumePDF resumeData={resumeData} />).toBlob();

  // Generate dynamic filename
  const now = new Date();
  const day = now.getDate().toString().padStart(2, "0");
  const month = now.toLocaleString("en-US", { month: "short" });
  const year = now.getFullYear();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");

  // Clean name for filename (remove spaces and special characters)
  const name = resumeData.personalInfo.name?.trim();
  const cleanName = name
    ? name
        .replace(/[^a-zA-Z0-9]/g, "_")
        .replace(/_{2,}/g, "_")
        .replace(/^_|_$/g, "")
    : "resume";

  const filename = `${cleanName}_resume_${day}${month}${year}_${hours}${minutes}.pdf`;

  // Create download link
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
