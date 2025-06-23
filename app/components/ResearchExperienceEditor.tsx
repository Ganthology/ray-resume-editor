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

export default function ResearchExperienceEditor() {
  const researchExperiences = useResumeStore(
    (state) => state.resumeData.researchExperiences
  );
  const {
    addResearchExperience,
    updateResearchExperience,
    deleteResearchExperience,
  } = useResumeStore();

  return (
    <Card className="border-0">
      <AccordionTrigger className="px-6 py-4 hover:no-underline">
        <CardTitle className="text-lg font-semibold text-gray-900">
          Research Experience
        </CardTitle>
      </AccordionTrigger>

      <AccordionContent className="px-0 pb-0">
        <CardContent className="p-6 pt-0">
          <div className="flex justify-between items-center mb-4">
            <div></div>
            <Button onClick={addResearchExperience} size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Research Experience
            </Button>
          </div>

          {researchExperiences.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-sm">No research experiences added yet.</p>
              <p className="text-xs mt-1">
                Click &quot;Add Research Experience&quot; to get started.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {researchExperiences.map((exp) => (
                <Card key={exp.id} className="border-gray-200/40 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={exp.included}
                          onCheckedChange={(checked) =>
                            updateResearchExperience(exp.id, {
                              included: !!checked,
                            })
                          }
                        />
                        <Label className="text-sm font-medium text-gray-700 cursor-pointer">
                          Include in resume
                        </Label>
                      </div>
                      <Button
                        onClick={() => deleteResearchExperience(exp.id)}
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
                          Research Role *
                        </Label>
                        <Input
                          value={exp.position}
                          onChange={(e) =>
                            updateResearchExperience(exp.id, {
                              position: e.target.value,
                            })
                          }
                          placeholder="Research Assistant, Graduate Researcher, etc."
                          className="border-gray-200/60 focus:border-blue-500 focus:ring-blue-500/20"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">
                          Institution/Lab *
                        </Label>
                        <Input
                          value={exp.organization}
                          onChange={(e) =>
                            updateResearchExperience(exp.id, {
                              organization: e.target.value,
                            })
                          }
                          placeholder="AI Research Lab, University Hospital, etc."
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
                            updateResearchExperience(exp.id, {
                              department: e.target.value,
                            })
                          }
                          placeholder="Computer Science, Biology, etc."
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
                            updateResearchExperience(exp.id, {
                              location: e.target.value,
                            })
                          }
                          placeholder="University, Lab Location, etc."
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
                            updateResearchExperience(exp.id, {
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
                            updateResearchExperience(exp.id, { endDate: value })
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
                          updateResearchExperience(exp.id, {
                            description: html,
                          })
                        }
                        placeholder="• Conducted research on machine learning algorithms for medical diagnosis&#10;• Published 2 papers in peer-reviewed conferences with over 50 citations&#10;• Collaborated with interdisciplinary team of 8 researchers and medical professionals"
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
