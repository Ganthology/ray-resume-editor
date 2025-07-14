import { Github, MessageCircle } from "lucide-react";

import { Button } from "./button";
import Link from "next/link";
import { cn } from "@/platform/style/utils";

interface NavigationProps {
  className?: string;
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  showDefaultActions?: boolean;
}

export default function Navigation({
  className,
  children,
  title = "Ray Resume Editor",
  subtitle,
  showDefaultActions = true,
}: NavigationProps) {
  return (
    <nav
      className={cn(
        "border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50",
        className
      )}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo/Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-x-2 justify-start">
                <h1 className="text-xl font-semibold text-gray-900 tracking-tight">
                  {title}
                </h1>
                {subtitle && (
                  <span className="text-sm text-gray-500">{subtitle}</span>
                )}
              </div>
            </Link>
          </div>

          {/* Right side - Navigation items */}
          <div className="flex items-center space-x-4">
            {/* Custom children actions */}
            {children}

            {/* Default actions */}
            {showDefaultActions && (
              <>
                <Link
                  href="https://github.com/Ganthology/ray-resume-editor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span className="hidden sm:inline">GitHub</span>
                </Link>

                <Link href="/chat">
                  <Button
                    variant="default"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat to Build</span>
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
