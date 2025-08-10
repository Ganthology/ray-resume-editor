"use client";

import { Edit3, Eye, FileText, MessageCircle } from "lucide-react";

import React from "react";
import { cn } from "@/platform/style/utils";

export type ResumeTabValue = "chat" | "preview" | "edit" | "context";

type ResumeTabsProps = {
  value: ResumeTabValue;
  onChange: (value: ResumeTabValue) => void;
  className?: string;
  includeChat?: boolean;
};

export default function ResumeTabs({
  value,
  onChange,
  className,
  includeChat = true,
}: ResumeTabsProps) {
  const TabButton: React.FC<{
    tab: ResumeTabValue;
    label: string;
    icon: React.ReactNode;
  }> = ({ tab, label, icon }) => (
    <button
      onClick={() => onChange(tab)}
      className={cn(
        "flex-1 px-4 py-2.5 text-sm font-medium flex items-center justify-center gap-2 rounded-full transition-colors",
        value === tab
          ? "bg-stone-100 text-stone-900 border border-stone-300 shadow-sm"
          : "text-stone-700 hover:text-stone-900 hover:bg-stone-50"
      )}
      aria-pressed={value === tab}
      type="button"
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div
      className={cn(
        "flex bg-white p-1 rounded-full border border-stone-200 shadow-sm",
        className
      )}
    >
      {includeChat && (
        <TabButton
          tab="chat"
          label="Chat"
          icon={<MessageCircle className="w-4 h-4" />}
        />
      )}
      <TabButton
        tab="preview"
        label="Preview"
        icon={<Eye className="w-4 h-4" />}
      />
      <TabButton tab="edit" label="Edit" icon={<Edit3 className="w-4 h-4" />} />
      <TabButton
        tab="context"
        label="Context"
        icon={<FileText className="w-4 h-4" />}
      />
    </div>
  );
}
