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
import { Input } from "@/platform/component/ui/input";
import { Label } from "@/platform/component/ui/label";
import { LeadershipExperience } from "@/modules/resume/data/entity/LeadershipExperience";
import MonthYearPicker from "./MonthYearPicker";
import React from "react";
import SortOrderPopover from "../../../../../platform/component/sortable/SortOrderPopover";
import TiptapEditor from "@/platform/component/ui/tiptap-editor";
import { useResumeStore } from "../../../../../app/store/resumeStore";

// Utility function to create summary text for leadership experience items
const getLeadershipSummary = (exp: LeadershipExperience): string => {
  const position = exp.position || "Leadership Role";
  const organization = exp.organization || "Organization";
  const startDate = exp.startDate || "No Start";
  const endDate =
    exp.endDate === "Present" ? "Present" : exp.endDate || "No End";

  return `${position} - ${organization} | ${startDate} - ${endDate}`;
};

export default function LeadershipExperienceEditor() {
  const leadershipExperiences = useResumeStore(
    (state) => state.resumeData.leadershipExperiences
  );
  const {
    addLeadershipExperience,
    updateLeadershipExperience,
    deleteLeadershipExperience,
    reorderLeadershipExperiences,
  } = useResumeStore();

  return (
    <Card className="border-0">
      <AccordionTrigger className="px-6 py-4 hover:no-underline">
        <CardTitle className="text-lg font-semibold text-gray-900">
          Leadership Experience
        </CardTitle>
      </AccordionTrigger>

      <AccordionContent className="px-0 pb-0">
        <CardContent className="p-6 pt-0">
          <div className="flex justify-between items-center mb-4">
            <div></div>
            <div className="flex gap-2">
              <SortOrderPopover
                items={leadershipExperiences}
                getSummary={getLeadershipSummary}
                onReorder={reorderLeadershipExperiences}
                title="Leadership Experience"
                disabled={leadershipExperiences.length < 2}
              />
              <Button
                onClick={addLeadershipExperience}
                size="sm"
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Leadership Experience
              </Button>
            </div>
          </div>

          {leadershipExperiences.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-sm">No leadership experiences added yet.</p>
              <p className="text-xs mt-1">
                Click &quot;Add Leadership Experience&quot; to get started.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <Accordion type="multiple" className="space-y-4">
                {leadershipExperiences.map((exp) => (
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
                            updateLeadershipExperience(exp.id, {
                              included: !!checked,
                            })
                          }
                        />
                        <Button
                          onClick={() => deleteLeadershipExperience(exp.id)}
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
                            {getLeadershipSummary(exp)}
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
                              Leadership Role *
                            </Label>
                            <Input
                              value={exp.position}
                              onChange={(e) =>
                                updateLeadershipExperience(exp.id, {
                                  position: e.target.value,
                                })
                              }
                              placeholder="Team Captain, Club President, etc."
                              className="border-gray-200/60 focus:border-blue-500 focus:ring-blue-500/20"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">
                              Organization *
                            </Label>
                            <Input
                              value={exp.organization}
                              onChange={(e) =>
                                updateLeadershipExperience(exp.id, {
                                  organization: e.target.value,
                                })
                              }
                              placeholder="Student Government, Sports Team, etc."
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
                                updateLeadershipExperience(exp.id, {
                                  department: e.target.value,
                                })
                              }
                              placeholder="Marketing, Operations, etc."
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
                                updateLeadershipExperience(exp.id, {
                                  location: e.target.value,
                                })
                              }
                              placeholder="University, City, State"
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
                                updateLeadershipExperience(exp.id, {
                                  startDate: value,
                                })
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
                                updateLeadershipExperience(exp.id, {
                                  endDate: value,
                                })
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
                              updateLeadershipExperience(exp.id, {
                                description: html,
                              })
                            }
                            placeholder="• Led a team of 15 members in organizing campus events&#10;• Increased club membership by 40% through strategic recruitment initiatives&#10;• Managed a budget of $10,000 and coordinated with university administration"
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
