"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Edit3, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { useResumeStore } from "../store/resumeStore";

interface CustomSectionEditorProps {
  sectionId: string;
}

export default function CustomSectionEditor({
  sectionId,
}: CustomSectionEditorProps) {
  const section = useResumeStore((state) =>
    state.resumeData.customSections.find((s) => s.id === sectionId)
  );

  const { updateCustomSection, deleteCustomSection } = useResumeStore();

  if (!section) return null;

  return (
    <Card className="border-gray-200/60 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 flex-1">
            <Edit3 className="w-5 h-5 text-gray-500" />
            <Input
              value={section.title}
              onChange={(e) =>
                updateCustomSection(section.id, { title: e.target.value })
              }
              className="text-lg font-semibold bg-transparent border-0 border-b border-gray-300 focus:border-blue-500 rounded-none shadow-none px-0 focus-visible:ring-0"
              placeholder="Custom Section Title"
            />
          </div>
          <Button
            onClick={() => deleteCustomSection(section.id)}
            variant="ghost"
            size="sm"
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Content</Label>
          <Textarea
            value={section.content}
            onChange={(e) =>
              updateCustomSection(section.id, { content: e.target.value })
            }
            rows={8}
            placeholder="Enter your content here. You can add any text, achievements, projects, or other information you want to include in this section..."
            className="border-gray-200/60 focus:border-blue-500 focus:ring-blue-500/20 resize-y min-h-[200px]"
          />
          <p className="text-xs text-gray-500">
            Tip: You can use line breaks to organize your content. This text
            will appear exactly as you type it in the PDF.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
