"use client";

import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import React from "react";
import { ResumeModule } from "../types/resume";
import { useSortable } from "@dnd-kit/sortable";

interface ModuleManagerProps {
  modules: ResumeModule[];
}

function SortableModule({ module }: { module: ResumeModule }) {
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

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors"
    >
      <button
        {...attributes}
        {...listeners}
        className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
      >
        <GripVertical size={20} />
      </button>
      <div className="flex-1">
        <span className="text-sm font-medium text-gray-700">
          {module.title}
        </span>
      </div>
      <div className="text-xs text-gray-500">Order: {module.order}</div>
    </div>
  );
}

export default function ModuleManager({ modules }: ModuleManagerProps) {
  return (
    <div className="space-y-2">
      {modules.map((module) => (
        <SortableModule key={module.id} module={module} />
      ))}
    </div>
  );
}
