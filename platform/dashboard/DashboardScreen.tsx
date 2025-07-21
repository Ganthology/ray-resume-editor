"use client";

import {
  FileText,
  MessageSquare,
  Plus,
  Settings,
  User,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/platform/component/ui/card";

import { Badge } from "@/platform/component/ui/badge";
import { Button } from "@/platform/component/ui/button";
import Link from "next/link";
import Navigation from "@/platform/component/ui/navigation";
import { useAuth } from "../auth/AuthContext";

export default function DashboardScreen() {
  const { user, logout } = useAuth();

  const navigationActions = [
    {
      icon: Settings,
      label: "Settings",
      onClick: () => {
        // Handle settings
      },
    },
    {
      icon: User,
      label: "Sign Out",
      onClick: logout,
      variant: "destructive" as const,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation
        title="RaysumeAI"
        subtitle="Dashboard"
        showDefaultActions={false}
        actions={navigationActions}
      />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back{user?.name ? `, ${user.name}` : ""}!
            </h1>
            <p className="text-gray-600">
              Manage your resumes and continue building your career with AI assistance.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Link href="/editor">
              <Card className="border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors cursor-pointer">
                <CardHeader className="text-center py-8">
                  <Plus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <CardTitle className="text-lg">Create New Resume</CardTitle>
                  <CardDescription>
                    Start building a new resume from scratch
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/chat">
              <Card className="bg-blue-50 border-blue-200 hover:border-blue-300 transition-colors cursor-pointer">
                <CardHeader className="text-center py-8">
                  <MessageSquare className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle className="text-lg text-blue-900">
                    AI Resume Coach
                  </CardTitle>
                  <CardDescription className="text-blue-700">
                    Build your resume through conversation
                  </CardDescription>
                  <Badge className="mt-2 bg-blue-100 text-blue-800">
                    AI-Powered
                  </Badge>
                </CardHeader>
              </Card>
            </Link>

            <Card className="bg-gray-50 border-gray-200">
              <CardHeader className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <CardTitle className="text-lg text-gray-600">
                  Resume Templates
                </CardTitle>
                <CardDescription className="text-gray-500">
                  Browse professional templates
                </CardDescription>
                <Badge className="mt-2 bg-gray-200 text-gray-600">
                  Coming Soon
                </Badge>
              </CardHeader>
            </Card>
          </div>

          {/* Recent Resumes Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Recent Resumes</h2>
              <Link href="/editor">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No resumes yet
              </h3>
              <p className="text-gray-600 mb-4">
                Get started by creating your first resume or using our AI Resume Coach
              </p>
              <div className="flex gap-3 justify-center">
                <Link href="/editor">
                  <Button>Create Resume</Button>
                </Link>
                <Link href="/chat">
                  <Button variant="outline">Try AI Coach</Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Stats/Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Plan Status</CardTitle>
                <CardDescription>Your current subscription</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Free Plan</Badge>
                  <Link href="#pricing">
                    <Button variant="outline" size="sm">
                      Upgrade
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">AI Usage</CardTitle>
                <CardDescription>Available AI credits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">0/0</div>
                <p className="text-sm text-gray-600">Upgrade to use AI features</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Resumes Created</CardTitle>
                <CardDescription>Total resumes built</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">0</div>
                <p className="text-sm text-gray-600">Start building today</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}