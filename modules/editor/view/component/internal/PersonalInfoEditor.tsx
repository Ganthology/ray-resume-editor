"use client";

import { Input } from "@/platform/component/ui/input";
import { Label } from "@/platform/component/ui/label";
import { PersonalInfo } from "@/modules/resume/data/entity/PersonalInfo";
import React from "react";
import { useResumeStore } from "../../../../../app/store/resumeStore";

export default function PersonalInfoEditor() {
  const personalInfo = useResumeStore((state) => state.resumeData.personalInfo);
  const updatePersonalInfo = useResumeStore(
    (state) => state.updatePersonalInfo
  );

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    updatePersonalInfo({
      ...personalInfo,
      [field]: value,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium text-gray-700">
          Full Name *
        </Label>
        <Input
          id="name"
          value={personalInfo.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="John Doe"
          className="border-gray-200/60 focus:border-blue-500 focus:ring-blue-500/20"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email Address
        </Label>
        <Input
          type="email"
          id="email"
          value={personalInfo.email}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="john.doe@example.com"
          className="border-gray-200/60 focus:border-blue-500 focus:ring-blue-500/20"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
          Phone Number
        </Label>
        <Input
          type="tel"
          id="phone"
          value={personalInfo.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          placeholder="(555) 123-4567"
          className="border-gray-200/60 focus:border-blue-500 focus:ring-blue-500/20"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address" className="text-sm font-medium text-gray-700">
          Address
        </Label>
        <Input
          id="address"
          value={personalInfo.address}
          onChange={(e) => handleChange("address", e.target.value)}
          placeholder="City, State"
          className="border-gray-200/60 focus:border-blue-500 focus:ring-blue-500/20"
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="linkedinUrl"
          className="text-sm font-medium text-gray-700"
        >
          LinkedIn URL
        </Label>
        <Input
          type="url"
          id="linkedinUrl"
          value={personalInfo.linkedinUrl || ""}
          onChange={(e) => handleChange("linkedinUrl", e.target.value)}
          placeholder="https://linkedin.com/in/your-profile"
          className="border-gray-200/60 focus:border-blue-500 focus:ring-blue-500/20"
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="personalSiteUrl"
          className="text-sm font-medium text-gray-700"
        >
          Personal Website/Portfolio
        </Label>
        <Input
          type="url"
          id="personalSiteUrl"
          value={personalInfo.personalSiteUrl || ""}
          onChange={(e) => handleChange("personalSiteUrl", e.target.value)}
          placeholder="https://your-portfolio.com"
          className="border-gray-200/60 focus:border-blue-500 focus:ring-blue-500/20"
        />
      </div>
    </div>
  );
}
