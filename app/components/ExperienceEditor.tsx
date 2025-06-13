"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MonthYearPicker from "./MonthYearPicker";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { useResumeStore } from "../store/resumeStore";

export default function ExperienceEditor() {
  const experiences = useResumeStore((state) => state.resumeData.experiences);
  const { addExperience, updateExperience, deleteExperience } =
    useResumeStore();

  return (
    <Card className="border-gray-200/60 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Professional Experience
          </CardTitle>
          <Button onClick={addExperience} size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Add Experience
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {experiences.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-sm">No experiences added yet.</p>
            <p className="text-xs mt-1">
              Click &quot;Add Experience&quot; to get started.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {experiences.map((exp) => (
              <Card key={exp.id} className="border-gray-200/40 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={exp.included}
                        onCheckedChange={(checked) =>
                          updateExperience(exp.id, { included: !!checked })
                        }
                      />
                      <Label className="text-sm font-medium text-gray-700 cursor-pointer">
                        Include in resume
                      </Label>
                    </div>
                    <Button
                      onClick={() => deleteExperience(exp.id)}
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
                        Position Title *
                      </Label>
                      <Input
                        value={exp.position}
                        onChange={(e) =>
                          updateExperience(exp.id, { position: e.target.value })
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
                          updateExperience(exp.id, { company: e.target.value })
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

                    <div className="space-y-2 md:col-span-2">
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
                    <Textarea
                      value={exp.description}
                      onChange={(e) =>
                        updateExperience(exp.id, {
                          description: e.target.value,
                        })
                      }
                      rows={4}
                      placeholder="• Developed and maintained web applications using React and Node.js&#10;• Collaborated with cross-functional teams to deliver high-quality software&#10;• Implemented automated testing strategies, improving code reliability by 30%"
                      className="border-gray-200/60 focus:border-blue-500 focus:ring-blue-500/20 resize-none"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
