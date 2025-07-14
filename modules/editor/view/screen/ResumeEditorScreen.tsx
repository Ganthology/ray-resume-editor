import Footer from "@/platform/component/ui/footer";
import type { Metadata } from "next";
import Navigation from "@/platform/component/ui/navigation";
import ResumeBuilder from "@/modules/editor/view/component/ResumeBuilder";

export const metadata: Metadata = {
  title: "Ray Resume Editor - Free Professional Resume Builder",
  description:
    "Create professional resumes effortlessly with Ray Resume Editor. Free online resume builder with PDF export, multiple sections, drag-and-drop functionality, and clean formatting. Build your perfect resume in minutes.",
};

export default function ResumeEditorScreen() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation className="max-w-7xl mx-auto" />

      <main className="flex-1">
        {/* Hidden SEO content for search engines */}
        <div className="sr-only">
          <h1>Ray Resume Editor - Free Professional Resume Builder</h1>
          <p>
            Create professional resumes effortlessly with our free online resume
            builder. Ray Resume Editor offers PDF export, multiple resume
            sections including experience, education, skills, projects,
            leadership, research, and portfolio. Build your perfect resume in
            minutes with drag-and-drop functionality and clean formatting.
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
            Build your resume quickly and professionally. Perfect for job
            seekers, students, and professionals looking to create polished CVs.
            No registration required - start building your resume immediately.
          </p>
          <h2>AI-Powered Chat Feature</h2>
          <p>
            Try our new AI-powered chat feature to build your resume through
            conversation. Simply tell us about your experience, skills, and
            achievements, and we&apos;ll help you create a professional resume
            automatically.
          </p>
        </div>

        {/* Main application */}
        <ResumeBuilder />
      </main>

      <Footer />
    </div>
  );
}
