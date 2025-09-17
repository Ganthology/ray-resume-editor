"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/platform/component/ui/card";
import { Github, Globe, Linkedin, MapPin, Mail, Phone, User, Save, RotateCcw } from "lucide-react";
import React, { useState } from "react";

import { Badge } from "@/platform/component/ui/badge";
import { Button } from "@/platform/component/ui/button";
import { useProfileStore } from "../../store/profileStore";

export default function ProfileSection() {
  const { profileData, updatePersonalInfo, updatePreferences, clearProfile } = useProfileStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profileData.personalInfo);
  const [preferences, setPreferences] = useState(profileData.preferences);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePreferenceChange = (field: string, value: string | boolean) => {
    setPreferences(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    updatePersonalInfo(formData);
    updatePreferences(preferences);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(profileData.personalInfo);
    setPreferences(profileData.preferences);
    setIsEditing(false);
  };

  const handleClear = () => {
    if (confirm("Are you sure you want to clear all profile data? This action cannot be undone.")) {
      clearProfile();
      setFormData(profileData.personalInfo);
      setPreferences(profileData.preferences);
      setIsEditing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Management</h1>
          <p className="text-gray-600">
            Manage your personal information to prefill resume data and speed up the creation process.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={handleClear} className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                Clear Profile
              </Button>
              <Button onClick={() => setIsEditing(true)} className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Edit Profile
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </CardTitle>
            <CardDescription>
              Basic contact information that will be used to prefill your resume
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900 py-2">{formData.name || "Not set"}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  City
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="Enter your city"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{formData.city || "Not set"}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Country
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    placeholder="Enter your country"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{formData.country || "Not set"}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  <Phone className="w-4 h-4 inline mr-1" />
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Enter your phone number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{formData.phone || "Not set"}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{formData.email || "Not set"}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Profiles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Social Profiles & Links
            </CardTitle>
            <CardDescription>
              Professional social media and personal website links
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                <Linkedin className="w-4 h-4 inline mr-1" />
                LinkedIn Profile
              </label>
              {isEditing ? (
                <input
                  type="url"
                  value={formData.linkedinUrl}
                  onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                  placeholder="https://linkedin.com/in/yourprofile"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900 py-2">
                  {formData.linkedinUrl ? (
                    <a href={formData.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {formData.linkedinUrl}
                    </a>
                  ) : "Not set"}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                <Github className="w-4 h-4 inline mr-1" />
                GitHub Profile
              </label>
              {isEditing ? (
                <input
                  type="url"
                  value={formData.githubUrl}
                  onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                  placeholder="https://github.com/yourusername"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900 py-2">
                  {formData.githubUrl ? (
                    <a href={formData.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {formData.githubUrl}
                    </a>
                  ) : "Not set"}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                <Globe className="w-4 h-4 inline mr-1" />
                Portfolio Website
              </label>
              {isEditing ? (
                <input
                  type="url"
                  value={formData.portfolioUrl}
                  onChange={(e) => handleInputChange('portfolioUrl', e.target.value)}
                  placeholder="https://yourportfolio.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900 py-2">
                  {formData.portfolioUrl ? (
                    <a href={formData.portfolioUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {formData.portfolioUrl}
                    </a>
                  ) : "Not set"}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Career Preferences */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Career Preferences
            </CardTitle>
            <CardDescription>
              Help us understand your career goals and current situation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Preferred Industry
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={preferences.preferredIndustry}
                    onChange={(e) => handlePreferenceChange('preferredIndustry', e.target.value)}
                    placeholder="e.g., Technology, Healthcare, Finance"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{preferences.preferredIndustry || "Not set"}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Experience Level
                </label>
                {isEditing ? (
                  <select
                    value={preferences.experienceLevel}
                    onChange={(e) => handlePreferenceChange('experienceLevel', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="entry">Entry Level</option>
                    <option value="mid">Mid Level</option>
                    <option value="senior">Senior Level</option>
                    <option value="executive">Executive</option>
                  </select>
                ) : (
                  <div className="py-2">
                    <Badge variant={preferences.experienceLevel === 'entry' ? 'secondary' : 'outline'}>
                      {preferences.experienceLevel.charAt(0).toUpperCase() + preferences.experienceLevel.slice(1)} Level
                    </Badge>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                {isEditing ? (
                  <input
                    type="checkbox"
                    checked={preferences.lookingForWork}
                    onChange={(e) => handlePreferenceChange('lookingForWork', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                ) : (
                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${preferences.lookingForWork ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                    {preferences.lookingForWork && <div className="w-2 h-2 bg-white rounded-sm" />}
                  </div>
                )}
                Currently looking for work opportunities
              </label>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Profile Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Summary</CardTitle>
          <CardDescription>
            This information will be used to prefill your resume and provide better AI recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Profile Completeness:</span>
              <div className="mt-1">
                {(() => {
                  const fields = Object.values(formData).filter(v => v.trim() !== '');
                  const completion = Math.round((fields.length / Object.keys(formData).length) * 100);
                  return (
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${completion >= 70 ? 'bg-green-500' : completion >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${completion}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{completion}%</span>
                    </div>
                  );
                })()}
              </div>
            </div>
            <div>
              <span className="text-gray-500">Last Updated:</span>
              <p className="text-gray-900">{new Date(profileData.lastUpdated).toLocaleDateString()}</p>
            </div>
            <div>
              <span className="text-gray-500">Status:</span>
              <p className="text-gray-900">
                <Badge variant={preferences.lookingForWork ? 'default' : 'secondary'}>
                  {preferences.lookingForWork ? 'Job Seeking' : 'Not Seeking'}
                </Badge>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}