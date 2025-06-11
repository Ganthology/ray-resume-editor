"use client";

import { Plus, Trash2 } from "lucide-react";

import { Education } from "../types/resume";
import React from "react";

interface EducationEditorProps {
  education: Education[];
  onAdd: () => void;
  onUpdate: (id: string, updates: Partial<Education>) => void;
  onDelete: (id: string) => void;
}

export default function EducationEditor({
  education,
  onAdd,
  onUpdate,
  onDelete,
}: EducationEditorProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Education</h2>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
        >
          <Plus size={16} />
          Add Education
        </button>
      </div>

      {education.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No education entries added yet. Click &quot;Add Education&quot; to get
          started.
        </p>
      ) : (
        <div className="space-y-6">
          {education.map((edu) => (
            <div key={edu.id} className="border rounded-lg p-4 relative">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id={`edu-${edu.id}`}
                    checked={edu.included}
                    onChange={(e) =>
                      onUpdate(edu.id, { included: e.target.checked })
                    }
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor={`edu-${edu.id}`}
                    className="text-sm font-medium text-gray-700"
                  >
                    Include in resume
                  </label>
                </div>
                <button
                  onClick={() => onDelete(edu.id)}
                  className="text-red-600 hover:text-red-800 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Degree *
                  </label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) =>
                      onUpdate(edu.id, { degree: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Bachelor of Science"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Field of Study
                  </label>
                  <input
                    type="text"
                    value={edu.fieldOfStudy || ""}
                    onChange={(e) =>
                      onUpdate(edu.id, { fieldOfStudy: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Computer Science"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Institution *
                  </label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) =>
                      onUpdate(edu.id, { institution: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="University of Technology"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Graduation Date
                  </label>
                  <input
                    type="text"
                    value={edu.graduationDate}
                    onChange={(e) =>
                      onUpdate(edu.id, { graduationDate: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="May 2023"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GPA (optional)
                  </label>
                  <input
                    type="text"
                    value={edu.gpa || ""}
                    onChange={(e) => onUpdate(edu.id, { gpa: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="3.8/4.0"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
