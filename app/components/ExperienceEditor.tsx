"use client";

import { Plus, Trash2 } from "lucide-react";

import { Experience } from "../types/resume";
import React from "react";

interface ExperienceEditorProps {
  experiences: Experience[];
  onAdd: () => void;
  onUpdate: (id: string, updates: Partial<Experience>) => void;
  onDelete: (id: string) => void;
}

export default function ExperienceEditor({
  experiences,
  onAdd,
  onUpdate,
  onDelete,
}: ExperienceEditorProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Professional Experience
        </h2>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
        >
          <Plus size={16} />
          Add Experience
        </button>
      </div>

      {experiences.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No experiences added yet. Click &quot;Add Experience&quot; to get
          started.
        </p>
      ) : (
        <div className="space-y-6">
          {experiences.map((exp) => (
            <div key={exp.id} className="border rounded-lg p-4 relative">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id={`exp-${exp.id}`}
                    checked={exp.included}
                    onChange={(e) =>
                      onUpdate(exp.id, { included: e.target.checked })
                    }
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor={`exp-${exp.id}`}
                    className="text-sm font-medium text-gray-700"
                  >
                    Include in resume
                  </label>
                </div>
                <button
                  onClick={() => onDelete(exp.id)}
                  className="text-red-600 hover:text-red-800 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Position Title *
                  </label>
                  <input
                    type="text"
                    value={exp.position}
                    onChange={(e) =>
                      onUpdate(exp.id, { position: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Software Engineer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company *
                  </label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) =>
                      onUpdate(exp.id, { company: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tech Company Inc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department (Optional)
                  </label>
                  <input
                    type="text"
                    value={exp.department || ""}
                    onChange={(e) =>
                      onUpdate(exp.id, { department: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Engineering"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) =>
                      onUpdate(exp.id, { startDate: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="month"
                      value={exp.endDate === "Present" ? "" : exp.endDate}
                      onChange={(e) =>
                        onUpdate(exp.id, { endDate: e.target.value })
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={exp.endDate === "Present"}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        onUpdate(exp.id, {
                          endDate: exp.endDate === "Present" ? "" : "Present",
                        })
                      }
                      className={`px-3 py-2 text-sm rounded-md transition-colors ${
                        exp.endDate === "Present"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      Present
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={exp.description}
                  onChange={(e) =>
                    onUpdate(exp.id, { description: e.target.value })
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={`• Developed and maintained web applications using React and Node.js
• Collaborated with cross-functional teams to deliver high-quality software
• Implemented automated testing strategies, improving code reliability by 30%`}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
