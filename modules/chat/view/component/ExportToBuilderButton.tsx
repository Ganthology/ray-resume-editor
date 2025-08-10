"use client";

import React from "react";
import { Button } from "@/platform/component/ui/button";
import { Upload, Sparkles } from "lucide-react";
import { useChatStore } from "@/app/store/chatStore";
import { useResumeStore } from "@/app/store/resumeStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type ExportToBuilderButtonProps = {
  variant?: "floating" | "inline";
};

export default function ExportToBuilderButton({ variant = "floating" }: ExportToBuilderButtonProps) {
  const { exportToMainBuilder } = useChatStore();
  const { loadFromJSON } = useResumeStore();
  const router = useRouter();

  const handleExport = () => {
    try {
      const chatResumeData = exportToMainBuilder();
      loadFromJSON(chatResumeData);
      
      toast.success("Resume exported to main builder!", {
        description: "Your AI-generated resume has been transferred to the free editor.",
        action: {
          label: "Go to Editor",
          onClick: () => router.push("/editor"),
        },
      });
      
      // Auto-redirect to editor after a short delay
      setTimeout(() => {
        router.push("/editor");
      }, 1500);
      
    } catch (error) {
      console.error("Failed to export resume:", error);
      toast.error("Failed to export resume", {
        description: "Please try again or contact support if the issue persists.",
      });
    }
  };

  if (variant === "inline") {
    return (
      <Button
        onClick={handleExport}
        size="sm"
        variant="outline"
        className="text-blue-700 border-blue-200 hover:bg-blue-50"
      >
        <Upload className="w-4 h-4 mr-2" />
        Export to Builder
      </Button>
    );
  }

  return null;
}