"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Edit3, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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

  const {
    updateCustomSection,
    deleteCustomSection,
    addCustomSectionItem,
    updateCustomSectionItem,
    deleteCustomSectionItem,
  } = useResumeStore();

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
          <div className="flex items-center gap-2">
            <Button
              onClick={() => addCustomSectionItem(section.id)}
              size="sm"
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Item
            </Button>
            <Button
              onClick={() => deleteCustomSection(section.id)}
              variant="ghost"
              size="sm"
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {section.items.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-sm">No items added yet.</p>
            <p className="text-xs mt-1">
              Click &quot;Add Item&quot; to get started.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {section.items.map((item) => (
              <Card key={item.id} className="border-gray-200/40 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={item.included}
                        onCheckedChange={(checked) =>
                          updateCustomSectionItem(section.id, item.id, {
                            included: !!checked,
                          })
                        }
                      />
                      <Label className="text-sm font-medium text-gray-700 cursor-pointer">
                        Include in resume
                      </Label>
                    </div>
                    <Button
                      onClick={() =>
                        deleteCustomSectionItem(section.id, item.id)
                      }
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        Title *
                      </Label>
                      <Input
                        value={item.title}
                        onChange={(e) =>
                          updateCustomSectionItem(section.id, item.id, {
                            title: e.target.value,
                          })
                        }
                        placeholder="Item title"
                        className="border-gray-200/60 focus:border-blue-500 focus:ring-blue-500/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        Subtitle (Optional)
                      </Label>
                      <Input
                        value={item.subtitle || ""}
                        onChange={(e) =>
                          updateCustomSectionItem(section.id, item.id, {
                            subtitle: e.target.value,
                          })
                        }
                        placeholder="Organization, location, etc."
                        className="border-gray-200/60 focus:border-blue-500 focus:ring-blue-500/20"
                      />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        Date (Optional)
                      </Label>
                      <Input
                        value={item.date || ""}
                        onChange={(e) =>
                          updateCustomSectionItem(section.id, item.id, {
                            date: e.target.value,
                          })
                        }
                        placeholder="2023, Jan 2023 - Present, etc."
                        className="border-gray-200/60 focus:border-blue-500 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Description (Optional)
                    </Label>
                    <Textarea
                      value={item.description || ""}
                      onChange={(e) =>
                        updateCustomSectionItem(section.id, item.id, {
                          description: e.target.value,
                        })
                      }
                      rows={3}
                      placeholder="Description, achievements, details..."
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
