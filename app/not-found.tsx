import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found - Ray Resume Editor",
  description:
    "The page you&apos;re looking for doesn&apos;t exist. Return to Ray Resume Editor to build your professional resume.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center p-8">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            Sorry, the page you&apos;re looking for doesn&apos;t exist.
            Let&apos;s get you back to building your professional resume.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Return to Resume Builder
          </Link>

          <div className="text-sm text-gray-500">
            <p>
              <strong>Ray Resume Editor</strong> - Free professional resume
              builder with PDF export
            </p>
          </div>
        </div>

        {/* SEO content */}
        <div className="sr-only">
          <h3>About Ray Resume Editor</h3>
          <p>
            Ray Resume Editor is a free online resume builder that helps you
            create professional resumes with PDF export, multiple sections, and
            clean formatting.
          </p>
          <p>
            Features include experience tracking, education management, skills
            listing, project showcase, leadership experience, research
            experience, and portfolio sections.
          </p>
        </div>
      </div>
    </div>
  );
}
