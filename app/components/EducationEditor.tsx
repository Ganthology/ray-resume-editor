"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Education } from "../types/resume";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MonthYearPicker from "./MonthYearPicker";
import React from "react";
import TiptapEditor from "@/components/ui/tiptap-editor";
import { useResumeStore } from "../store/resumeStore";

// Utility function to create summary text for education items
const getEducationSummary = (edu: Education): string => {
  const degree = edu.degree || "Degree";
  const field = edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : "";
  const institution = edu.institution || "Institution";
  const graduationDate = edu.endDate || edu.graduationDate || "No Date";

  return `${degree}${field} - ${institution} | ${graduationDate}`;
};

export default function EducationEditor() {
  const education = useResumeStore((state) => state.resumeData.education);
  const { addEducation, updateEducation, deleteEducation } = useResumeStore();

  return (
    <Card className="border-0">
      <AccordionTrigger className="px-6 py-4 hover:no-underline">
        <CardTitle className="text-lg font-semibold text-gray-900">
          Education
        </CardTitle>
      </AccordionTrigger>

      <AccordionContent className="px-0 pb-0">
        <CardContent className="p-6 pt-0">
          <div className="flex justify-between items-center mb-4">
            <div></div>
            <Button onClick={addEducation} size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Education
            </Button>
          </div>

          {education.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-sm">No education entries added yet.</p>
              <p className="text-xs mt-1">
                Click &quot;Add Education&quot; to get started.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <Accordion type="multiple" className="space-y-4">
                {education.map((edu) => (
                  <AccordionItem
                    key={edu.id}
                    value={edu.id}
                    className="border border-gray-200/40 rounded-lg shadow-sm"
                  >
                    <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-gray-50/50">
                      <div className="flex items-center justify-between w-full mr-4">
                        <div className="flex items-center gap-3">
                          <Checkbox
                            checked={edu.included}
                            onCheckedChange={(checked) =>
                              updateEducation(edu.id, { included: !!checked })
                            }
                            onClick={(e) => e.stopPropagation()}
                          />
                          <div className="text-left">
                            <div className="font-medium text-gray-900 text-sm">
                              {getEducationSummary(edu)}
                            </div>
                            {edu.gpa && (
                              <div className="text-xs text-gray-500 mt-1">
                                GPA: {edu.gpa}
                              </div>
                            )}
                          </div>
                        </div>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteEducation(edu.id);
                          }}
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="px-4 pb-4">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">
                              Degree *
                            </Label>
                            <Input
                              value={edu.degree}
                              onChange={(e) =>
                                updateEducation(edu.id, {
                                  degree: e.target.value,
                                })
                              }
                              placeholder="Bachelor of Science"
                              className="border-gray-200/60 focus:border-blue-500 focus:ring-blue-500/20"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">
                              Field of Study
                            </Label>
                            <Input
                              value={edu.fieldOfStudy || ""}
                              onChange={(e) =>
                                updateEducation(edu.id, {
                                  fieldOfStudy: e.target.value,
                                })
                              }
                              placeholder="Computer Science"
                              className="border-gray-200/60 focus:border-blue-500 focus:ring-blue-500/20"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">
                              Institution *
                            </Label>
                            <Input
                              value={edu.institution}
                              onChange={(e) =>
                                updateEducation(edu.id, {
                                  institution: e.target.value,
                                })
                              }
                              placeholder="University of Technology"
                              className="border-gray-200/60 focus:border-blue-500 focus:ring-blue-500/20"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">
                              Start Date
                            </Label>
                            <MonthYearPicker
                              value={edu.startDate}
                              onChange={(value) =>
                                updateEducation(edu.id, { startDate: value })
                              }
                              placeholder="Select start date"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">
                              End Date
                            </Label>
                            <MonthYearPicker
                              value={edu.endDate}
                              onChange={(value) =>
                                updateEducation(edu.id, { endDate: value })
                              }
                              placeholder="Select end date"
                              allowPresent={true}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">
                              GPA (optional)
                            </Label>
                            <Input
                              value={edu.gpa || ""}
                              onChange={(e) =>
                                updateEducation(edu.id, { gpa: e.target.value })
                              }
                              placeholder="3.8/4.0"
                              className="border-gray-200/60 focus:border-blue-500 focus:ring-blue-500/20"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-700">
                            Description (optional)
                          </Label>
                          <TiptapEditor
                            value={edu.description || ""}
                            onChange={(html) =>
                              updateEducation(edu.id, {
                                description: html,
                              })
                            }
                            placeholder="• Relevant coursework: Computer Science, Data Structures, Algorithms&#10;• Activities: Dean's List, Computer Science Club President&#10;• Thesis: Machine Learning Applications in Healthcare"
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
