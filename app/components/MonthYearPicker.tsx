"use client";

import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";

interface MonthYearPickerProps {
  value: string; // Format: "YYYY-MM" or "Present"
  onChange: (value: string) => void;
  placeholder?: string;
  allowPresent?: boolean;
  disabled?: boolean;
}

export default function MonthYearPicker({
  value,
  onChange,
  placeholder = "Select date",
  allowPresent = false,
  disabled = false,
}: MonthYearPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number>(() => {
    if (value && value !== "Present") {
      return parseInt(value.split("-")[0]) || new Date().getFullYear();
    }
    return new Date().getFullYear();
  });

  const months = [
    { value: "01", label: "Jan", fullLabel: "January" },
    { value: "02", label: "Feb", fullLabel: "February" },
    { value: "03", label: "Mar", fullLabel: "March" },
    { value: "04", label: "Apr", fullLabel: "April" },
    { value: "05", label: "May", fullLabel: "May" },
    { value: "06", label: "Jun", fullLabel: "June" },
    { value: "07", label: "Jul", fullLabel: "July" },
    { value: "08", label: "Aug", fullLabel: "August" },
    { value: "09", label: "Sep", fullLabel: "September" },
    { value: "10", label: "Oct", fullLabel: "October" },
    { value: "11", label: "Nov", fullLabel: "November" },
    { value: "12", label: "Dec", fullLabel: "December" },
  ];

  const formatDisplayValue = (val: string) => {
    if (val === "Present") return "Present";
    if (!val) return placeholder;

    const [year, month] = val.split("-");
    if (!year || !month) return placeholder;

    const monthName = months.find((m) => m.value === month)?.fullLabel;
    return `${monthName} ${year}`;
  };

  const handleMonthSelect = (monthValue: string) => {
    const newValue = `${selectedYear}-${monthValue}`;
    onChange(newValue);
    setIsOpen(false);
  };

  const handlePresentSelect = () => {
    onChange("Present");
    setIsOpen(false);
  };

  const getCurrentMonth = () => {
    if (value && value !== "Present") {
      return value.split("-")[1];
    }
    return null;
  };

  const goToPreviousYear = () => {
    setSelectedYear((prev) => Math.max(prev - 1, 1950));
  };

  const goToNextYear = () => {
    setSelectedYear((prev) =>
      Math.min(prev + 1, new Date().getFullYear() + 10)
    );
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal border-gray-200/60 focus:border-blue-500 focus:ring-blue-500/20"
          disabled={disabled}
        >
          <Calendar className="mr-2 h-4 w-4" />
          {formatDisplayValue(value)}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200">
          {/* Year Navigation Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <Button
              variant="ghost"
              size="sm"
              onClick={goToPreviousYear}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="text-lg font-semibold text-gray-900">
              {selectedYear}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={goToNextYear}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Months Grid */}
          <div className="p-4">
            <div className="grid grid-cols-4 gap-2">
              {months.map((month) => {
                const isSelected =
                  getCurrentMonth() === month.value &&
                  parseInt(value?.split("-")[0] || "0") === selectedYear;

                return (
                  <Button
                    key={month.value}
                    variant={isSelected ? "default" : "ghost"}
                    className={`h-12 text-sm font-medium ${
                      isSelected
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => handleMonthSelect(month.value)}
                  >
                    {month.label}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Present Option Footer */}
          {allowPresent && (
            <div className="border-t border-gray-100 p-4">
              <Button
                variant={value === "Present" ? "default" : "outline"}
                className={`w-full ${
                  value === "Present"
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "text-gray-700 border-gray-200 hover:bg-gray-50"
                }`}
                onClick={handlePresentSelect}
              >
                Present
              </Button>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
