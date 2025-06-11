"use client";

import { Plus, Trash2 } from "lucide-react";

import React from "react";
import { Skill } from "../types/resume";

interface SkillsEditorProps {
  skills: Skill[];
  onAdd: (category?: "skill" | "certification" | "other") => void;
  onUpdate: (id: string, updates: Partial<Skill>) => void;
  onDelete: (id: string) => void;
}

export default function SkillsEditor({
  skills,
  onAdd,
  onUpdate,
  onDelete,
}: SkillsEditorProps) {
  const skillsByCategory = {
    skill: skills.filter((s) => s.category === "skill"),
    certification: skills.filter((s) => s.category === "certification"),
    other: skills.filter((s) => s.category === "other"),
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Skills, Certifications & Others
        </h2>
      </div>

      <div className="space-y-6">
        {/* Skills Section */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-md font-medium text-gray-800">Skills</h3>
            <button
              onClick={() => onAdd("skill")}
              className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700 transition-colors"
            >
              <Plus size={14} />
              Add Skill
            </button>
          </div>
          {skillsByCategory.skill.length === 0 ? (
            <p className="text-gray-400 text-sm italic">No skills added yet.</p>
          ) : (
            <div className="space-y-2">
              {skillsByCategory.skill.map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center gap-3 p-2 bg-gray-50 rounded"
                >
                  <input
                    type="checkbox"
                    checked={skill.included}
                    onChange={(e) =>
                      onUpdate(skill.id, { included: e.target.checked })
                    }
                    className="w-4 h-4 text-blue-600"
                  />
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) =>
                      onUpdate(skill.id, { name: e.target.value })
                    }
                    className="flex-1 px-2 py-1 border rounded"
                    placeholder="Enter skill name"
                  />
                  <button
                    onClick={() => onDelete(skill.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Certifications Section */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-md font-medium text-gray-800">
              Certifications
            </h3>
            <button
              onClick={() => onAdd("certification")}
              className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700 transition-colors"
            >
              <Plus size={14} />
              Add Certification
            </button>
          </div>
          {skillsByCategory.certification.length === 0 ? (
            <p className="text-gray-400 text-sm italic">
              No certifications added yet.
            </p>
          ) : (
            <div className="space-y-2">
              {skillsByCategory.certification.map((cert) => (
                <div
                  key={cert.id}
                  className="flex items-center gap-3 p-2 bg-gray-50 rounded"
                >
                  <input
                    type="checkbox"
                    checked={cert.included}
                    onChange={(e) =>
                      onUpdate(cert.id, { included: e.target.checked })
                    }
                    className="w-4 h-4 text-blue-600"
                  />
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) =>
                      onUpdate(cert.id, { name: e.target.value })
                    }
                    className="flex-1 px-2 py-1 border rounded"
                    placeholder="Enter certification name"
                  />
                  <button
                    onClick={() => onDelete(cert.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Others Section */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-md font-medium text-gray-800">Others</h3>
            <button
              onClick={() => onAdd("other")}
              className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700 transition-colors"
            >
              <Plus size={14} />
              Add Other
            </button>
          </div>
          {skillsByCategory.other.length === 0 ? (
            <p className="text-gray-400 text-sm italic">
              No other items added yet.
            </p>
          ) : (
            <div className="space-y-2">
              {skillsByCategory.other.map((other) => (
                <div
                  key={other.id}
                  className="flex items-center gap-3 p-2 bg-gray-50 rounded"
                >
                  <input
                    type="checkbox"
                    checked={other.included}
                    onChange={(e) =>
                      onUpdate(other.id, { included: e.target.checked })
                    }
                    className="w-4 h-4 text-blue-600"
                  />
                  <input
                    type="text"
                    value={other.name}
                    onChange={(e) =>
                      onUpdate(other.id, { name: e.target.value })
                    }
                    className="flex-1 px-2 py-1 border rounded"
                    placeholder="Enter item name"
                  />
                  <button
                    onClick={() => onDelete(other.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
