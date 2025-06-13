"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MonthYearPicker from "./MonthYearPicker";
import React from "react";
import { useResumeStore } from "../store/resumeStore";

export default function EducationEditor() {
  const education = useResumeStore((state) => state.resumeData.education);
  const { addEducation, updateEducation, deleteEducation } = useResumeStore();

  return (
    <Card className="border-gray-200/60 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Education
          </CardTitle>
          <Button onClick={addEducation} size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Add Education
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {education.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-sm">No education entries added yet.</p>
            <p className="text-xs mt-1">
              Click &quot;Add Education&quot; to get started.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {education.map((edu) => (
              <Card key={edu.id} className="border-gray-200/40 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={edu.included}
                        onCheckedChange={(checked) =>
                          updateEducation(edu.id, { included: !!checked })
                        }
                      />
                      <Label className="text-sm font-medium text-gray-700 cursor-pointer">
                        Include in resume
                      </Label>
                    </div>
                    <Button
                      onClick={() => deleteEducation(edu.id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        Degree *
                      </Label>
                      <Input
                        value={edu.degree}
                        onChange={(e) =>
                          updateEducation(edu.id, { degree: e.target.value })
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

                    <div className="space-y-2 md:col-span-2">
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
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
