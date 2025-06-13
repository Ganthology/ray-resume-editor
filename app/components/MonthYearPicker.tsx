"use client";

import { Calendar, Check } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [selectedYear, setSelectedYear] = useState<string>(() => {
    if (value && value !== "Present") {
      return value.split("-")[0] || new Date().getFullYear().toString();
    }
    return new Date().getFullYear().toString();
  });
  const [selectedMonth, setSelectedMonth] = useState<string>(() => {
    if (value && value !== "Present") {
      return value.split("-")[1] || "01";
    }
    return "01";
  });

  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  // Generate years from 1950 to current year + 10
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1950 + 11 }, (_, i) =>
    (currentYear + 10 - i).toString()
  );

  const formatDisplayValue = (val: string) => {
    if (val === "Present") return "Present";
    if (!val) return placeholder;

    const [year, month] = val.split("-");
    if (!year || !month) return placeholder;

    const monthName = months.find((m) => m.value === month)?.label;
    return `${monthName} ${year}`;
  };

  const handleSelect = () => {
    const newValue = `${selectedYear}-${selectedMonth}`;
    onChange(newValue);
    setIsOpen(false);
  };

  const handlePresentSelect = () => {
    onChange("Present");
    setIsOpen(false);
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
      <PopoverContent className="w-80 p-4" align="start">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Month</label>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month.value} value={month.value}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Year</label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button onClick={handleSelect} size="sm" className="flex-1 gap-2">
              <Check className="w-3 h-3" />
              Select Date
            </Button>

            {allowPresent && (
              <Button
                onClick={handlePresentSelect}
                variant={value === "Present" ? "default" : "outline"}
                size="sm"
                className="flex-1"
              >
                Present
              </Button>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
