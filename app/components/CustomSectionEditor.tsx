"use client";

import { AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Edit3, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import TiptapEditor from "@/components/ui/tiptap-editor";
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
    <Card className="border-0">
      <AccordionTrigger className="px-6 py-4 hover:no-underline">
        <div className="flex justify-between items-center w-full mr-4">
          <div className="flex items-center gap-3 flex-1">
            <Edit3 className="w-5 h-5 text-gray-500" />
            <Input
              value={section.title}
              onChange={(e) =>
                updateCustomSection(section.id, { title: e.target.value })
              }
              className="text-lg font-semibold bg-transparent focus:border-blue-500 rounded-none shadow-none px-0 focus-visible:ring-0"
              placeholder="Custom Section Title"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              deleteCustomSection(section.id);
            }}
            variant="ghost"
            size="sm"
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </AccordionTrigger>

      <AccordionContent className="px-0 pb-0">
        <CardContent className="p-6 pt-0">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Content</Label>
            <TiptapEditor
              value={section.content}
              onChange={(html) =>
                updateCustomSection(section.id, { content: html })
              }
              placeholder="• Add your content here&#10;• Use the toolbar for formatting&#10;• This will appear in your resume PDF"
            />
            <p className="text-xs text-gray-500">
              Tip: Use the toolbar above to format your content with bold,
              italic, and lists. This content will be rendered in the PDF with
              proper formatting.
            </p>
          </div>
        </CardContent>
      </AccordionContent>
    </Card>
  );
}
