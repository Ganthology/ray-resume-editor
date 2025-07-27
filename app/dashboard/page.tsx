"use client";

import {
  Bot,
  Building,
  Edit,
  FileText,
  Globe,
  MapPin,
  MessageSquare,
  Settings,
  User,
  Briefcase,
  Clock,
  Target,
  CreditCard,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/platform/component/ui/card";
import React, { useState } from "react";

import { Badge } from "@/platform/component/ui/badge";
import { Button } from "@/platform/component/ui/button";
import Footer from "@/platform/component/ui/footer";
import Link from "next/link";
import Navigation from "@/platform/component/ui/navigation";
import ProfileSection from "@/modules/profile/view/component/ProfileSection";
import ContextSection from "@/modules/profile/view/component/ContextSection";

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState<"overview" | "profile" | "context">("overview");

  const navigationActions = [
    {
      icon: CreditCard,
      label: "Billing",
      href: "/billing",
    },
    {
      icon: Settings,
      label: "Settings",
      onClick: () => {
        setActiveSection("profile");
      },
    },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileSection />;
      case "context":
        return <ContextSection />;
      default:
        return (
          <>
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome to RaysumeAI
              </h1>
              <p className="text-gray-600">
                Your intelligent resume building companion. Create professional resumes with AI assistance.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Link href="/chat">
                <Card className="bg-blue-50 border-blue-200 hover:border-blue-300 transition-colors cursor-pointer h-full">
                  <CardHeader className="text-center py-8">
                    <Bot className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <CardTitle className="text-xl text-blue-900">
                      Start AI Chat Session
                    </CardTitle>
                    <CardDescription className="text-blue-700">
                      Build your resume through intelligent conversation with our AI assistant
                    </CardDescription>
                    <Badge className="mt-3 bg-blue-100 text-blue-800">
                      Recommended
                    </Badge>
                  </CardHeader>
                </Card>
              </Link>

              <Link href="/editor">
                <Card className="bg-green-50 border-green-200 hover:border-green-300 transition-colors cursor-pointer h-full">
                  <CardHeader className="text-center py-8">
                    <Edit className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <CardTitle className="text-xl text-green-900">
                      Manual Resume Editor
                    </CardTitle>
                    <CardDescription className="text-green-700">
                      Create and customize your resume using our comprehensive editor
                    </CardDescription>
                    <Badge className="mt-3 bg-green-100 text-green-800">
                      Full Control
                    </Badge>
                  </CardHeader>
                </Card>
              </Link>
            </div>

            {/* Dashboard Sections */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="border-purple-200 hover:border-purple-300 transition-colors cursor-pointer" onClick={() => setActiveSection("profile")}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <User className="w-8 h-8 text-purple-600" />
                      <div>
                        <CardTitle className="text-lg text-purple-900">Profile</CardTitle>
                        <CardDescription className="text-purple-700">
                          Manage your personal information
                        </CardDescription>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>Location, contact details</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      <span>Social profiles & links</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      <span>Career preferences</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-200 hover:border-orange-300 transition-colors cursor-pointer" onClick={() => setActiveSection("context")}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="w-8 h-8 text-orange-600" />
                      <div>
                        <CardTitle className="text-lg text-orange-900">Context</CardTitle>
                        <CardDescription className="text-orange-700">
                          AI-generated conversation summaries
                        </CardDescription>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      <span>Career goals & objectives</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Conversation history</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4" />
                      <span>AI insights & recommendations</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Link href="/billing">
                <Card className="border-blue-200 hover:border-blue-300 transition-colors cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-8 h-8 text-blue-600" />
                        <div>
                          <CardTitle className="text-lg text-blue-900">Billing</CardTitle>
                          <CardDescription className="text-blue-700">
                            Manage subscription and usage
                          </CardDescription>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <CreditCard className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        <span>AI message credits</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        <span>Payment history</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Settings className="w-4 h-4" />
                        <span>Subscription management</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>

            {/* Features Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center">
                <CardHeader>
                  <MessageSquare className="w-10 h-10 text-blue-600 mx-auto mb-2" />
                  <CardTitle className="text-lg">AI Conversation</CardTitle>
                  <CardDescription>
                    Natural language resume building
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Chat with our AI to build your resume naturally and get personalized suggestions.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Edit className="w-10 h-10 text-green-600 mx-auto mb-2" />
                  <CardTitle className="text-lg">Visual Editor</CardTitle>
                  <CardDescription>
                    Drag-and-drop customization
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Full control over your resume layout, styling, and content organization.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <FileText className="w-10 h-10 text-purple-600 mx-auto mb-2" />
                  <CardTitle className="text-lg">PDF Export</CardTitle>
                  <CardDescription>
                    Professional output
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Generate high-quality PDF resumes ready for job applications.
                  </p>
                </CardContent>
              </Card>
            </div>
          </>
        );
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navigation
          title="RaysumeAI"
          subtitle="Dashboard"
          showDefaultActions={false}
          actions={navigationActions}
        >
          <div className="flex items-center gap-2">
            <Button
              variant={activeSection === "overview" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveSection("overview")}
              className="flex items-center gap-2"
            >
              <Building className="w-4 h-4" />
              Overview
            </Button>
            <Button
              variant={activeSection === "profile" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveSection("profile")}
              className="flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              Profile
            </Button>
            <Button
              variant={activeSection === "context" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveSection("context")}
              className="flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Context
            </Button>
          </div>
        </Navigation>

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}