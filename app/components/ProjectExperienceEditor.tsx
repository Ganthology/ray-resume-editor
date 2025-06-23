"use client";

import { AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MonthYearPicker from "./MonthYearPicker";
import React from "react";
import TiptapEditor from "@/components/ui/tiptap-editor";
import { useResumeStore } from "../store/resumeStore";

export default function ProjectExperienceEditor() {
  const projectExperiences = useResumeStore(
    (state) => state.resumeData.projectExperiences
  );
  const {
    addProjectExperience,
    updateProjectExperience,
    deleteProjectExperience,
  } = useResumeStore();

  return (
    <Card className="border-0">
      <AccordionTrigger className="px-6 py-4 hover:no-underline">
        <CardTitle className="text-lg font-semibold text-gray-900">
          Project Experience
        </CardTitle>
      </AccordionTrigger>

      <AccordionContent className="px-0 pb-0">
        <CardContent className="p-6 pt-0">
          <div className="flex justify-between items-center mb-4">
            <div></div>
            <Button onClick={addProjectExperience} size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Project Experience
            </Button>
          </div>

          {projectExperiences.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-sm">No project experiences added yet.</p>
              <p className="text-xs mt-1">
                Click &quot;Add Project Experience&quot; to get started.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {projectExperiences.map((exp) => (
                <Card key={exp.id} className="border-gray-200/40 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={exp.included}
                          onCheckedChange={(checked) =>
                            updateProjectExperience(exp.id, {
                              included: !!checked,
                            })
                          }
                        />
                        <Label className="text-sm font-medium text-gray-700 cursor-pointer">
                          Include in resume
                        </Label>
                      </div>
                      <Button
                        onClick={() => deleteProjectExperience(exp.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">
                          Project Role *
                        </Label>
                        <Input
                          value={exp.position}
                          onChange={(e) =>
                            updateProjectExperience(exp.id, {
                              position: e.target.value,
                            })
                          }
                          placeholder="Lead Developer, Project Manager, etc."
                          className="border-gray-200/60 focus:border-blue-500 focus:ring-blue-500/20"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">
                          Project/Organization *
                        </Label>
                        <Input
                          value={exp.organization}
                          onChange={(e) =>
                            updateProjectExperience(exp.id, {
                              organization: e.target.value,
                            })
                          }
                          placeholder="E-commerce Platform, Mobile App, etc."
                          className="border-gray-200/60 focus:border-blue-500 focus:ring-blue-500/20"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">
                          Team/Department (Optional)
                        </Label>
                        <Input
                          value={exp.department || ""}
                          onChange={(e) =>
                            updateProjectExperience(exp.id, {
                              department: e.target.value,
                            })
                          }
                          placeholder="Development Team, Design Team, etc."
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
                            updateProjectExperience(exp.id, {
                              location: e.target.value,
                            })
                          }
                          placeholder="Remote, University, etc."
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
                            updateProjectExperience(exp.id, {
                              startDate: value,
                            })
                          }
                          placeholder="Select start date"
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label className="text-sm font-medium text-gray-700">
                          End Date
                        </Label>
                        <MonthYearPicker
                          value={exp.endDate}
                          onChange={(value) =>
                            updateProjectExperience(exp.id, { endDate: value })
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
                          updateProjectExperience(exp.id, {
                            description: html,
                          })
                        }
                        placeholder="• Designed and developed a full-stack web application using React and Node.js&#10;• Implemented user authentication and payment processing features&#10;• Collaborated with a team of 4 developers using Agile methodology"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </AccordionContent>
    </Card>
  );
}
