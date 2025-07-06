"use client";

import {
  AccordionContent,
  AccordionTrigger,
} from "@/platform/component/ui/accordion";
import { Card, CardContent, CardTitle } from "@/platform/component/ui/card";

import { Checkbox } from "@/platform/component/ui/checkbox";
import { Label } from "@/platform/component/ui/label";
import React from "react";
import TiptapEditor from "@/platform/component/ui/tiptap-editor";
import { useResumeStore } from "../../../../../app/store/resumeStore";

export default function SummaryEditor() {
  const summary = useResumeStore((state) => state.resumeData.summary);
  const { updateSummary } = useResumeStore();

  return (
    <Card className="border-0">
      <AccordionTrigger className="px-6 py-4 hover:no-underline">
        <CardTitle className="text-lg font-semibold text-gray-900">
          Summary
        </CardTitle>
      </AccordionTrigger>

      <AccordionContent className="px-0 pb-0">
        <CardContent className="p-6 pt-0">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Checkbox
                checked={summary.included}
                onCheckedChange={(checked) =>
                  updateSummary({ included: !!checked })
                }
              />
              <Label className="text-sm font-medium text-gray-700 cursor-pointer">
                Include summary in resume
              </Label>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Summary Content
              </Label>
              <TiptapEditor
                value={summary.content}
                onChange={(html) => updateSummary({ content: html })}
                placeholder="Write a compelling summary that highlights your key qualifications, achievements, and career objectives. This section should give recruiters a quick overview of who you are professionally and what you bring to the table."
              />
              <p className="text-xs text-gray-500 mt-1">
                Tip: Keep your summary concise (2-4 sentences) and focus on your
                most relevant skills and experiences for the position
                you&apos;re targeting.
              </p>
            </div>
          </div>
        </CardContent>
      </AccordionContent>
    </Card>
  );
}
