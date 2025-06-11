"use client";

import { PersonalInfo } from "../types/resume";
import React from "react";

interface PersonalInfoEditorProps {
  personalInfo: PersonalInfo;
  onUpdate: (personalInfo: PersonalInfo) => void;
}

export default function PersonalInfoEditor({
  personalInfo,
  onUpdate,
}: PersonalInfoEditorProps) {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onUpdate({ ...personalInfo, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            value={personalInfo.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={personalInfo.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="john.doe@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            value={personalInfo.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="(555) 123-4567"
          />
        </div>

        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            value={personalInfo.address}
            onChange={(e) => handleChange("address", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="City, State"
          />
        </div>

        <div>
          <label
            htmlFor="linkedinUrl"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            LinkedIn URL
          </label>
          <input
            type="url"
            id="linkedinUrl"
            value={personalInfo.linkedinUrl || ""}
            onChange={(e) => handleChange("linkedinUrl", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://linkedin.com/in/your-profile"
          />
        </div>

        <div>
          <label
            htmlFor="personalSiteUrl"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Personal Website/Portfolio
          </label>
          <input
            type="url"
            id="personalSiteUrl"
            value={personalInfo.personalSiteUrl || ""}
            onChange={(e) => handleChange("personalSiteUrl", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://your-portfolio.com"
          />
        </div>
      </div>
    </div>
  );
}
