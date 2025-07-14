"use client";

import {
  AccordionContent,
  AccordionTrigger,
} from "@/platform/component/ui/accordion";
import { Card, CardContent, CardTitle } from "@/platform/component/ui/card";
import { Plus, Trash2 } from "lucide-react";
import React, { memo, useCallback } from "react";

import { Button } from "@/platform/component/ui/button";
import { Checkbox } from "@/platform/component/ui/checkbox";
import { Input } from "@/platform/component/ui/input";
import { Skill } from "@/modules/resume/data/entity/Skill";
import { useResumeStore } from "../../../../../app/store/resumeStore";

interface SkillSectionProps {
  title: string;
  category:
    | "skill"
    | "certification"
    | "other"
    | "language"
    | "interest"
    | "activity";
  items: Skill[];
  addLabel: string;
  onAddSkill: (category: SkillSectionProps["category"]) => void;
  onUpdateSkill: (id: string, updates: Partial<Skill>) => void;
  onDeleteSkill: (id: string) => void;
}

const SkillSection = memo(
  ({
    title,
    category,
    items,
    addLabel,
    onAddSkill,
    onUpdateSkill,
    onDeleteSkill,
  }: SkillSectionProps) => {
    const handleNameChange = useCallback(
      (id: string, value: string) => {
        onUpdateSkill(id, { name: value });
      },
      [onUpdateSkill]
    );

    const handleIncludedChange = useCallback(
      (id: string, checked: boolean) => {
        onUpdateSkill(id, { included: checked });
      },
      [onUpdateSkill]
    );

    const handleDelete = useCallback(
      (id: string) => {
        onDeleteSkill(id);
      },
      [onDeleteSkill]
    );

    const handleAddSkill = useCallback(() => {
      onAddSkill(category);
    }, [onAddSkill, category]);

    return (
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h4 className="font-medium text-gray-800">{title}</h4>
          <Button
            onClick={handleAddSkill}
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
                    handleIncludedChange(item.id, !!checked)
                  }
                />
                <Input
                  value={item.name}
                  onChange={(e) => handleNameChange(item.id, e.target.value)}
                  placeholder={`Enter ${category} name`}
                  className="flex-1 border-gray-200/60 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                />
                <Button
                  onClick={() => handleDelete(item.id)}
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
  }
);

SkillSection.displayName = "SkillSection";

export default function SkillsEditor() {
  const skills = useResumeStore((state) => state.resumeData.skills);
  const { addSkill, updateSkill, deleteSkill } = useResumeStore();

  const skillsByCategory = {
    skill: skills.filter((s) => s.category === "skill"),
    certification: skills.filter((s) => s.category === "certification"),
    language: skills.filter((s) => s.category === "language"),
    interest: skills.filter((s) => s.category === "interest"),
    activity: skills.filter((s) => s.category === "activity"),
    other: skills.filter((s) => s.category === "other"),
  };

  return (
    <Card className="border-0 py-0">
      <AccordionTrigger className="px-6 py-4 hover:no-underline">
        <CardTitle className="text-lg font-semibold text-gray-900">
          Skills, Certifications & Others
        </CardTitle>
      </AccordionTrigger>

      <AccordionContent className="px-0 pb-0">
        <CardContent className="space-y-6 p-6 pt-0">
          <SkillSection
            title="Skills"
            category="skill"
            items={skillsByCategory.skill}
            addLabel="Add Skill"
            onAddSkill={addSkill}
            onUpdateSkill={updateSkill}
            onDeleteSkill={deleteSkill}
          />

          <SkillSection
            title="Certifications"
            category="certification"
            items={skillsByCategory.certification}
            addLabel="Add Certification"
            onAddSkill={addSkill}
            onUpdateSkill={updateSkill}
            onDeleteSkill={deleteSkill}
          />

          <SkillSection
            title="Languages"
            category="language"
            items={skillsByCategory.language}
            addLabel="Add Language"
            onAddSkill={addSkill}
            onUpdateSkill={updateSkill}
            onDeleteSkill={deleteSkill}
          />

          <SkillSection
            title="Interests"
            category="interest"
            items={skillsByCategory.interest}
            addLabel="Add Interest"
            onAddSkill={addSkill}
            onUpdateSkill={updateSkill}
            onDeleteSkill={deleteSkill}
          />

          <SkillSection
            title="Activities"
            category="activity"
            items={skillsByCategory.activity}
            addLabel="Add Activity"
            onAddSkill={addSkill}
            onUpdateSkill={updateSkill}
            onDeleteSkill={deleteSkill}
          />

          <SkillSection
            title="Others"
            category="other"
            items={skillsByCategory.other}
            addLabel="Add Other"
            onAddSkill={addSkill}
            onUpdateSkill={updateSkill}
            onDeleteSkill={deleteSkill}
          />
        </CardContent>
      </AccordionContent>
    </Card>
  );
}
