"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import React from "react";
import { useResumeStore } from "../store/resumeStore";

export default function SkillsEditor() {
  const skills = useResumeStore((state) => state.resumeData.skills);
  const { addSkill, updateSkill, deleteSkill } = useResumeStore();

  const skillsByCategory = {
    skill: skills.filter((s) => s.category === "skill"),
    certification: skills.filter((s) => s.category === "certification"),
    other: skills.filter((s) => s.category === "other"),
  };

  const SkillSection = ({
    title,
    category,
    items,
    addLabel,
  }: {
    title: string;
    category: "skill" | "certification" | "other";
    items: typeof skills;
    addLabel: string;
  }) => (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h4 className="font-medium text-gray-800">{title}</h4>
        <Button
          onClick={() => addSkill(category)}
          size="sm"
          variant="outline"
          className="gap-1 h-7 text-xs bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-300"
        >
          <Plus className="w-3 h-3" />
          {addLabel}
        </Button>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-400 text-xs italic py-2">
          No {title.toLowerCase()} added yet.
        </p>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <Checkbox
                checked={item.included}
                onCheckedChange={(checked) =>
                  updateSkill(item.id, { included: !!checked })
                }
              />
              <Input
                value={item.name}
                onChange={(e) => updateSkill(item.id, { name: e.target.value })}
                placeholder={`Enter ${category} name`}
                className="flex-1 border-gray-200/60 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
              />
              <Button
                onClick={() => deleteSkill(item.id)}
                variant="ghost"
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <Card className="border-gray-200/60 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-gray-900">
          Skills, Certifications & Others
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <SkillSection
          title="Skills"
          category="skill"
          items={skillsByCategory.skill}
          addLabel="Add Skill"
        />

        <SkillSection
          title="Certifications"
          category="certification"
          items={skillsByCategory.certification}
          addLabel="Add Certification"
        />

        <SkillSection
          title="Others"
          category="other"
          items={skillsByCategory.other}
          addLabel="Add Other"
        />
      </CardContent>
    </Card>
  );
}
