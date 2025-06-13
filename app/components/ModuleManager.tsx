"use client";

import { Eye, EyeOff, GripVertical } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import { ResumeModule } from "../types/resume";
import { useResumeStore } from "../store/resumeStore";
import { useSortable } from "@dnd-kit/sortable";

interface ModuleManagerProps {
  modules: ResumeModule[];
}

function SortableModule({ module }: { module: ResumeModule }) {
  const updateModules = useResumeStore((state) => state.updateModules);
  const resumeData = useResumeStore((state) => state.resumeData);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: module.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const toggleVisibility = () => {
    const updatedModules = resumeData.modules.map((m) =>
      m.id === module.id ? { ...m, enabled: !m.enabled } : m
    );
    updateModules(updatedModules);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 p-3 rounded-lg border-2 border-dashed transition-colors ${
        module.enabled
          ? "bg-gray-50/50 border-gray-200 hover:border-gray-300"
          : "bg-gray-100/50 border-gray-300 hover:border-gray-400 opacity-60"
      }`}
    >
      <button
        {...attributes}
        {...listeners}
        className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
      >
        <GripVertical className="w-5 h-5" />
      </button>

      <div className="flex-1">
        <span
          className={`text-sm font-medium ${
            module.enabled ? "text-gray-700" : "text-gray-500"
          }`}
        >
          {module.title}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div className="text-xs text-gray-500">Order: {module.order}</div>

        <Button
          onClick={toggleVisibility}
          variant="ghost"
          size="sm"
          className={`h-8 w-8 p-0 ${
            module.enabled
              ? "text-green-600 hover:text-green-700 hover:bg-green-50"
              : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          }`}
        >
          {module.enabled ? (
            <Eye className="w-4 h-4" />
          ) : (
            <EyeOff className="w-4 h-4" />
          )}
        </Button>
      </div>
    </div>
  );
}

export default function ModuleManager({ modules }: ModuleManagerProps) {
  return (
    <div className="space-y-2">
      <div className="text-xs text-gray-500 mb-3 flex items-center gap-2">
        <Eye className="w-3 h-3" />
        <span>Click the eye icon to show/hide sections in your resume</span>
      </div>
      {modules.map((module) => (
        <SortableModule key={module.id} module={module} />
      ))}
    </div>
  );
}
