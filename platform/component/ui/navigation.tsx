import { ChevronDown, MessageCircle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

import { Button } from "./button";
import Link from "next/link";
import { cn } from "@/platform/style/utils";

interface NavigationAction {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick?: () => void;
  href?: string;
  variant?: "default" | "destructive";
}

interface NavigationProps {
  className?: string;
  children?: React.ReactNode;
  actions?: NavigationAction[];
  title?: string;
  subtitle?: string;
  showDefaultActions?: boolean;
}

export default function Navigation({
  className,
  children,
  actions = [],
  title = "RaysumeAI",
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
        <div className="flex flex-col sm:flex-row justify-between sm:items-center py-4 sm:py-2 gap-y-2">
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

            {/* Actions dropdown */}
            {actions.length > 0 && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    Actions
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48 p-1" align="end">
                  <div className="space-y-1">
                    {actions.map((action, index) => {
                      const IconComponent = action.icon;
                      
                      if (action.href) {
                        return (
                          <Link key={index} href={action.href}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className={cn(
                                "w-full justify-start gap-2",
                                action.variant === "destructive" &&
                                  "text-red-600 hover:text-red-700 hover:bg-red-50"
                              )}
                            >
                              <IconComponent className="w-4 h-4" />
                              {action.label}
                            </Button>
                          </Link>
                        );
                      }
                      
                      return (
                        <Button
                          key={index}
                          onClick={action.onClick}
                          variant="ghost"
                          size="sm"
                          className={cn(
                            "w-full justify-start gap-2",
                            action.variant === "destructive" &&
                              "text-red-600 hover:text-red-700 hover:bg-red-50"
                          )}
                        >
                          <IconComponent className="w-4 h-4" />
                          {action.label}
                        </Button>
                      );
                    })}
                  </div>
                </PopoverContent>
              </Popover>
            )}

            {/* Default actions */}
            {showDefaultActions && (
              <>
                <Link href="/chat">
                  <Button
                    variant="default"
                    size="sm"
                    className="flex items-center gap-2 hover:cursor-pointer"
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
