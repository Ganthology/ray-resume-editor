"use client";

import { Edit3, Plus, Trash2 } from "lucide-react";

import React from "react";
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
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3 flex-1">
          <Edit3 size={18} className="text-gray-500" />
          <input
            type="text"
            value={section.title}
            onChange={(e) =>
              updateCustomSection(section.id, { title: e.target.value })
            }
            className="text-lg font-semibold text-gray-900 bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none"
            placeholder="Custom Section Title"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => addCustomSectionItem(section.id)}
            className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            <Plus size={16} />
            Add Item
          </button>
          <button
            onClick={() => deleteCustomSection(section.id)}
            className="text-red-600 hover:text-red-800 transition-colors p-2"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {section.items.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No items added yet. Click &quot;Add Item&quot; to get started.
        </p>
      ) : (
        <div className="space-y-4">
          {section.items.map((item) => (
            <div key={item.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id={`custom-${item.id}`}
                    checked={item.included}
                    onChange={(e) =>
                      updateCustomSectionItem(section.id, item.id, {
                        included: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor={`custom-${item.id}`}
                    className="text-sm font-medium text-gray-700"
                  >
                    Include in resume
                  </label>
                </div>
                <button
                  onClick={() => deleteCustomSectionItem(section.id, item.id)}
                  className="text-red-600 hover:text-red-800 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) =>
                      updateCustomSectionItem(section.id, item.id, {
                        title: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Item title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subtitle (Optional)
                  </label>
                  <input
                    type="text"
                    value={item.subtitle || ""}
                    onChange={(e) =>
                      updateCustomSectionItem(section.id, item.id, {
                        subtitle: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Organization, location, etc."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date (Optional)
                  </label>
                  <input
                    type="text"
                    value={item.date || ""}
                    onChange={(e) =>
                      updateCustomSectionItem(section.id, item.id, {
                        date: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="2023, Jan 2023 - Present, etc."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (Optional)
                </label>
                <textarea
                  value={item.description || ""}
                  onChange={(e) =>
                    updateCustomSectionItem(section.id, item.id, {
                      description: e.target.value,
                    })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Description, achievements, details..."
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
