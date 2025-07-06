"use client";

import { ArrowUpDown, GripVertical } from "lucide-react";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/platform/component/ui/popover";
import React, { useState } from "react";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { Button } from "@/platform/component/ui/button";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

// Generic interface for any item with an id
interface SortableItem {
  id: string;
}

interface SortOrderPopoverProps<T extends SortableItem> {
  items: T[];
  getSummary: (item: T) => string;
  onReorder: (newOrder: T[]) => void;
  title: string;
  disabled?: boolean;
}

// Sortable Item Component
function SortableItemComponent<T extends SortableItem>({
  item,
  getSummary,
}: {
  item: T;
  getSummary: (item: T) => string;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-md shadow-sm ${
        isDragging ? "shadow-lg" : ""
      }`}
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
      >
        <GripVertical className="w-4 h-4" />
      </div>
      <div className="flex-1 text-xs font-medium text-gray-900 line-clamp-2">
        {getSummary(item)}
      </div>
    </div>
  );
}

export default function SortOrderPopover<T extends SortableItem>({
  items,
  getSummary,
  onReorder,
  title,
  disabled = false,
}: SortOrderPopoverProps<T>) {
  const [localItems, setLocalItems] = useState<T[]>(items);
  const [open, setOpen] = useState(false);

  // Update local items when props change or popover opens
  React.useEffect(() => {
    if (open) {
      setLocalItems(items);
    }
  }, [items, open]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setLocalItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleSave = () => {
    onReorder(localItems);
    setOpen(false);
  };

  const handleCancel = () => {
    setLocalItems(items); // Reset to original order
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={disabled}
          className="h-8 gap-1 text-xs"
        >
          <ArrowUpDown className="w-3 h-3" />
          Sort Order
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <div className="max-h-96 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b">
            <h3 className="text-sm font-semibold text-gray-900">
              Sort Order - {title}
            </h3>
            <p className="text-xs text-gray-600 mt-1">
              Drag items to reorder. Top item appears first.
            </p>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-3">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={localItems.map((item) => item.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-1.5">
                  {localItems.map((item) => (
                    <SortableItemComponent
                      key={item.id}
                      item={item}
                      getSummary={getSummary}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>

          {/* Footer */}
          <div className="flex gap-2 p-3 border-t bg-gray-50">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              className="flex-1 text-xs"
            >
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave} className="flex-1 text-xs">
              Save Order
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
