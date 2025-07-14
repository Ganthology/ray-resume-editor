import { Github } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Built with ❤️ by Ray</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/Ganthology/ray-resume-editor"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>View on GitHub</span>
            </Link>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>
              Resume Editor is free to use, AI is paid experimentation
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
