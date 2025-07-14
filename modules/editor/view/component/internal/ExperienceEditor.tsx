"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/platform/component/ui/accordion";
import { Card, CardContent, CardTitle } from "@/platform/component/ui/card";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/platform/component/ui/button";
import { Checkbox } from "@/platform/component/ui/checkbox";
import { Experience } from "@/modules/resume/data/entity/Experience";
import { Input } from "@/platform/component/ui/input";
import { Label } from "@/platform/component/ui/label";
import MonthYearPicker from "./MonthYearPicker";
import React from "react";
import SortOrderPopover from "../../../../../platform/component/sortable/SortOrderPopover";
import TiptapEditor from "@/platform/component/ui/tiptap-editor";
import { useResumeStore } from "../../../../../app/store/resumeStore";

// Utility function to create summary text for experience items
const getExperienceSummary = (exp: Experience): string => {
  const title = exp.position || "Untitled Position";
  const company = exp.company || "No Company";
  const startDate = exp.startDate || "No Start";
  const endDate =
    exp.endDate === "Present" ? "Present" : exp.endDate || "No End";

  return `${title} - ${company} | ${startDate} - ${endDate}`;
};

export default function ExperienceEditor() {
  const experiences = useResumeStore((state) => state.resumeData.experiences);
  const {
    addExperience,
    updateExperience,
    deleteExperience,
    reorderExperiences,
  } = useResumeStore();

  return (
    <Card className="border-0 py-0">
      <AccordionTrigger className="px-6 py-4 hover:no-underline">
        <CardTitle className="text-lg font-semibold text-gray-900">
          Professional Experience
        </CardTitle>
      </AccordionTrigger>

      <AccordionContent className="px-0 pb-0">
        <CardContent className="p-6 pt-0">
          <div className="flex justify-between items-center mb-4">
            <div></div>
            <div className="flex gap-2">
              <SortOrderPopover
                items={experiences}
                getSummary={getExperienceSummary}
                onReorder={reorderExperiences}
                title="Professional Experience"
                disabled={experiences.length < 2}
              />
              <Button onClick={addExperience} size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Add Experience
              </Button>
            </div>
          </div>

          {experiences.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-sm">No experiences added yet.</p>
              <p className="text-xs mt-1">
                Click &quot;Add Experience&quot; to get started.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <Accordion type="multiple" className="space-y-4">
                {experiences.map((exp) => (
                  <AccordionItem
                    key={exp.id}
                    value={exp.id}
                    className="border border-gray-200/40 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center">
                      <div className="flex items-center gap-3 px-4 py-3">
                        <Checkbox
                          checked={exp.included}
                          onCheckedChange={(checked) =>
                            updateExperience(exp.id, { included: !!checked })
                          }
                        />
                        <Button
                          onClick={() => deleteExperience(exp.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <AccordionTrigger className="flex-1 px-4 py-3 hover:no-underline hover:bg-gray-50/50">
                        <div className="text-left">
                          <div className="font-medium text-gray-900 text-sm">
                            {getExperienceSummary(exp)}
                          </div>
                          {exp.location && (
                            <div className="text-xs text-gray-500 mt-1">
                              {exp.location}
                            </div>
                          )}
                        </div>
                      </AccordionTrigger>
                    </div>

                    <AccordionContent className="px-4 pb-4">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">
                              Position Title *
                            </Label>
                            <Input
                              value={exp.position}
                              onChange={(e) =>
                                updateExperience(exp.id, {
                                  position: e.target.value,
                                })
                              }
                              placeholder="Software Engineer"
                              className="border-gray-200/60 focus:border-blue-500 focus:ring-blue-500/20"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">
                              Company *
                            </Label>
                            <Input
                              value={exp.company}
                              onChange={(e) =>
                                updateExperience(exp.id, {
                                  company: e.target.value,
                                })
                              }
                              placeholder="Tech Company Inc."
                              className="border-gray-200/60 focus:border-blue-500 focus:ring-blue-500/20"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">
                              Department (Optional)
                            </Label>
                            <Input
                              value={exp.department || ""}
                              onChange={(e) =>
                                updateExperience(exp.id, {
                                  department: e.target.value,
                                })
                              }
                              placeholder="Engineering"
                              className="border-gray-200/60 focus:border-blue-500 focus:ring-blue-500/20"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">
                              Location (Optional)
                            </Label>
                            <Input
                              value={exp.location || ""}
                              onChange={(e) =>
                                updateExperience(exp.id, {
                                  location: e.target.value,
                                })
                              }
                              placeholder="San Francisco, CA"
                              className="border-gray-200/60 focus:border-blue-500 focus:ring-blue-500/20"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">
                              Start Date
                            </Label>
                            <MonthYearPicker
                              value={exp.startDate}
                              onChange={(value) =>
                                updateExperience(exp.id, { startDate: value })
                              }
                              placeholder="Select start date"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">
                              End Date
                            </Label>
                            <MonthYearPicker
                              value={exp.endDate}
                              onChange={(value) =>
                                updateExperience(exp.id, { endDate: value })
                              }
                              placeholder="Select end date"
                              allowPresent={true}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-700">
                            Description
                          </Label>
                          <TiptapEditor
                            value={exp.description}
                            onChange={(html) =>
                              updateExperience(exp.id, {
                                description: html,
                              })
                            }
                            placeholder="• Developed and maintained web applications using React and Node.js&#10;• Collaborated with cross-functional teams to deliver high-quality software&#10;• Implemented automated testing strategies, improving code reliability by 30%"
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
        </CardContent>
      </AccordionContent>
    </Card>
  );
}
