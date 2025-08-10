"use client";

// Replace Card components with minimal divs in this page
import { Badge } from "@/platform/component/ui/badge";
import { Button } from "@/platform/component/ui/button";
import { Input } from "@/platform/component/ui/input";
import { Label } from "@/platform/component/ui/label";
import { AppLayout } from "@/platform/component/layout/AppLayout";
import { useAuth } from "@/platform/auth/AuthContext";
import { User, Mail, Bot, Save, Phone, MapPin, Linkedin, Globe, Download, MessageSquare } from "lucide-react";
import React, { useState, useEffect } from "react";

interface SavedContext {
  id: string;
  title: string;
  content: string;
  timestamp: Date;
  resumeSnapshot?: Record<string, unknown>;
  messageCount?: number;
}

interface ConversationStats {
  totalMessages: number;
  totalConversations: number;
  contextsWithSnapshots: number;
}

export default function ProfilePage() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [personalSiteUrl, setPersonalSiteUrl] = useState("");
  const [region, setRegion] = useState("");
  const [savedContexts, setSavedContexts] = useState<SavedContext[]>([]);
  const [conversationStats, setConversationStats] = useState<ConversationStats>({
    totalMessages: 0,
    totalConversations: 0,
    contextsWithSnapshots: 0,
  });
  const [isSaving, setIsSaving] = useState(false);

  // Calculate conversation statistics
  const calculateStats = (contexts: SavedContext[]): ConversationStats => {
    const totalMessages = contexts.reduce((sum, ctx) => sum + (ctx.messageCount || 0), 0);
    const totalConversations = contexts.length;
    const contextsWithSnapshots = contexts.filter(ctx => ctx.resumeSnapshot).length;
    
    return {
      totalMessages,
      totalConversations,
      contextsWithSnapshots,
    };
  };

  // Export context data
  const exportContexts = () => {
    const dataToExport = {
      exportDate: new Date().toISOString(),
      user: { name, email },
      contexts: savedContexts,
      statistics: conversationStats,
    };
    
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
      type: 'application/json',
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `raysumeai-contexts-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Load contexts from API and profile fields from localStorage
  useEffect(() => {
    // load profile fields
    const savedProfile = localStorage.getItem("profile-data");
    if (savedProfile) {
      try {
        const profileData = JSON.parse(savedProfile);
        setPhone(profileData.phone || "");
        setLinkedinUrl(profileData.linkedinUrl || "");
        setPersonalSiteUrl(profileData.personalSiteUrl || "");
        setRegion(profileData.region || "");
      } catch (error) {
        console.error("Failed to load profile data:", error);
      }
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/chat/context", { method: "GET" });
        if (res.ok) {
          const data = await res.json();
          const list = (data?.history || []).map((c: any) => ({
            id: c.id,
            title: "Context",
            content: c.content,
            timestamp: new Date(c.updatedAt || c.createdAt),
          }));
          setSavedContexts(list);
          setConversationStats(calculateStats(list));
        }
      } catch (e) {
        console.error("Failed to fetch contexts:", e);
      }
    })();
  }, []);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      // Save profile data to localStorage
      const profileData = {
        phone,
        linkedinUrl,
        personalSiteUrl,
        region
      };
      localStorage.setItem("profile-data", JSON.stringify(profileData));
      
      // Save contexts to localStorage
      localStorage.setItem("profile-contexts", JSON.stringify(savedContexts));
      
      setTimeout(() => setIsSaving(false), 1000);
    } catch (error) {
      console.error("Failed to save profile:", error);
      setIsSaving(false);
    }
  };


  return (
    <AppLayout>
      <div className="flex-1 space-y-6 p-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Profile Settings</h1>
          <p className="text-muted-foreground">
            Manage your account information and saved contexts
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Profile Information */}
          <div className="">
            <div className="px-3 py-3">
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                <User className="w-5 h-5" />
                Resume Profile Information
              </h3>
              <p className="text-sm text-muted-foreground">
                Information that will appear on your resume
              </p>
            </div>
            <div className="space-y-4 px-3 pb-3">
              <div className="space-y-2">
                <Label htmlFor="profile-name">Full Name</Label>
                <Input
                  id="profile-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="profile-email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="profile-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="profile-phone">Contact Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="profile-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="profile-linkedin">LinkedIn Profile</Label>
                <div className="relative">
                  <Linkedin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="profile-linkedin"
                    type="url"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    placeholder="https://linkedin.com/in/yourprofile"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="profile-website">Personal Website</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="profile-website"
                    type="url"
                    value={personalSiteUrl}
                    onChange={(e) => setPersonalSiteUrl(e.target.value)}
                    placeholder="https://yourportfolio.com or GitHub"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="profile-region">Region/Country</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="profile-region"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    placeholder="New York, NY, USA"
                    className="pl-10"
                  />
                </div>
              </div>

              <Button 
                onClick={handleSaveProfile} 
                disabled={isSaving}
                className="w-full"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? "Saving..." : "Save Profile"}
              </Button>
            </div>
          </div>

          {/* Conversation Context Panel */}
          <div className="">
            <div className="px-3 py-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="flex items-center gap-2 text-lg font-semibold">
                    <Bot className="w-5 h-5" />
                    Conversation Contexts
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your AI chat history and resume snapshots
                  </p>
                </div>
                <Button onClick={exportContexts} size="sm" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
            <div className="space-y-4 px-3 pb-3">
              {/* Statistics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-3 bg-muted/50 rounded-lg">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-2xl font-bold text-blue-600">
                    <MessageSquare className="w-5 h-5" />
                    {conversationStats.totalMessages}
                  </div>
                  <p className="text-xs text-muted-foreground">Messages Sent</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {conversationStats.totalConversations}
                  </div>
                  <p className="text-xs text-muted-foreground">Conversations</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {conversationStats.contextsWithSnapshots}
                  </div>
                  <p className="text-xs text-muted-foreground">With Resumes</p>
                </div>
              </div>

              {/* Context List */}
              {savedContexts.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {savedContexts.map((context) => (
                    <div
                      key={context.id}
                      className="flex items-start justify-between p-3 border rounded-lg hover:bg-muted/25 transition-colors"
                    >
                      <div className="space-y-1 flex-1">
                        <div className="font-medium text-sm">{context.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {context.timestamp.toLocaleDateString()} • {context.messageCount || 0} messages
                        </div>
                        <div className="flex items-center gap-2">
                          {context.resumeSnapshot && (
                            <Badge variant="outline" className="text-xs">
                              Resume snapshot
                            </Badge>
                          )}
                          <Badge variant="secondary" className="text-xs">
                            Read-only
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="font-medium">No conversations yet</p>
                  <p className="text-sm">
                    Start chatting with AI to build your resume and contexts will appear here.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}