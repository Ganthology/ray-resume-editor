import type { Metadata } from "next";
import ResumeBuilder from "@/modules/editor/view/component/ResumeBuilder";

export const metadata: Metadata = {
  title: "Ray Resume Editor - Free Professional Resume Builder",
  description:
    "Create professional resumes effortlessly with Ray Resume Editor. Free online resume builder with PDF export, multiple sections, drag-and-drop functionality, and clean formatting. Build your perfect resume in minutes.",
};

export default function ResumeEditorScreen() {
  return (
    <main className="min-h-screen">
      {/* Hidden SEO content for search engines */}
      <div className="sr-only">
        <h1>Ray Resume Editor - Free Professional Resume Builder</h1>
        <p>
          Create professional resumes effortlessly with our free online resume
          builder. Ray Resume Editor offers PDF export, multiple resume sections
          including experience, education, skills, projects, leadership,
          research, and portfolio. Build your perfect resume in minutes with
          drag-and-drop functionality and clean formatting.
        </p>
        <h2>Features</h2>
        <ul>
          <li>Free professional resume builder</li>
          <li>PDF export functionality</li>
          <li>Multiple resume sections</li>
          <li>Experience and education management</li>
          <li>Skills and projects tracking</li>
          <li>Leadership and research experience</li>
          <li>Portfolio showcase</li>
          <li>Drag-and-drop interface</li>
          <li>Clean professional formatting</li>
          <li>Save and load drafts</li>
        </ul>
        <h2>Benefits</h2>
        <p>
          Build your resume quickly and professionally. Perfect for job seekers,
          students, and professionals looking to create polished CVs. No
          registration required - start building your resume immediately.
        </p>
      </div>

      {/* Main application */}
      <ResumeBuilder />
    </main>
  );
}
