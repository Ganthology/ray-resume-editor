"use client";

import {
  BarChart3,
  Eye,
  FileText,
  Github,
  Home,
  MessageCircle,
  RefreshCw,
} from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/platform/component/ui/button";
import ChatInterface from "@/modules/chat/view/component/ChatInterface";
import ContextDisplay from "@/modules/chat/view/component/ContextDisplay";
import { ConversationContext } from "@/modules/chat/types/ChatTypes";
import Footer from "@/platform/component/ui/footer";
import Link from "next/link";
import Navigation from "@/platform/component/ui/navigation";
import PreviewPanel from "@/modules/editor/view/component/PreviewPanel";
import { ResumeData } from "@/modules/resume/data/entity/ResumeData";
import ResumeDataDisplay from "@/modules/chat/view/component/ResumeDataDisplay";
import { useChat } from "ai/react";
import { useResumeStore } from "../store/resumeStore";

export default function ChatPage() {
  const resumeData = useResumeStore((state) => state.resumeData);
  const { clearAllData, loadFromJSON } = useResumeStore();
  const [context, setContext] = useState<ConversationContext | null>(null);
  const [leftPanelView, setLeftPanelView] = useState<"chat" | "context">(
    "chat"
  );
  const [rightPanelView, setRightPanelView] = useState<"preview" | "data">(
    "preview"
  );

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
  } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content:
          "Welcome to the Resume Builder! I'm here to help you create your professional resume. Tell me about your work experience, education, skills, and any other relevant information, and I'll help organize it into a polished resume.",
      },
    ],
    onFinish: async (message) => {
      // Generate context summary after each assistant message
      if (message.role === "assistant") {
        await generateContextSummary();
      }
    },
  });

  const generateContextSummary = async () => {
    try {
      const response = await fetch("/api/generate-context", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: messages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      });

      if (response.ok) {
        const { contextSummary } = await response.json();
        const contextData: ConversationContext = {
          id: `context-${Date.now()}`,
          content: contextSummary,
          lastUpdated: new Date(),
        };
        setContext(contextData);

        // Process the context to update resume data
        await processContextToResumeData(contextSummary);
      }
    } catch (error) {
      console.error("Error generating context summary:", error);
    }
  };

  const processContextToResumeData = async (contextContent: string) => {
    try {
      const response = await fetch("/api/process-context", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ context: contextContent }),
      });

      if (response.ok) {
        const processedData: ResumeData = await response.json();
        loadFromJSON(processedData);
      } else {
        console.error("Failed to process context:", response.statusText);
      }
    } catch (error) {
      console.error("Error processing context:", error);
    }
  };

  const handleClearChat = () => {
    if (
      confirm(
        "Are you sure you want to clear the chat and resume data? This action cannot be undone."
      )
    ) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content:
            "Welcome to the Resume Builder! I'm here to help you create your professional resume. Tell me about your work experience, education, skills, and any other relevant information, and I'll help organize it into a polished resume.",
        },
      ]);
      setContext(null);
      clearAllData();
    }
  };

  const navigationActions = [
    {
      icon: RefreshCw,
      label: "Clear Chat",
      onClick: handleClearChat,
      variant: "destructive" as const,
    },
  ];

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navigation
          title="AI Resume Builder Chat"
          subtitle="Build your resume through conversation"
          showDefaultActions={false}
          actions={navigationActions}
        >
          <Link
            href="https://github.com/Ganthology/ray-resume-editor"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Github className="w-4 h-4" />
            <span className="hidden sm:inline">GitHub</span>
          </Link>

          <Link href="/">
            <Button
              variant="default"
              size="sm"
              className="flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>Resume Editor</span>
            </Button>
          </Link>
        </Navigation>

        <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Left Panel - Chat Interface / Context */}
            <div className="flex flex-col">
              <div className="flex items-center justify-end mb-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant={leftPanelView === "chat" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLeftPanelView("chat")}
                    className="flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Chat
                  </Button>
                  <Button
                    variant={
                      leftPanelView === "context" ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setLeftPanelView("context")}
                    className="flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    Context
                  </Button>
                </div>
              </div>

              <div className="flex-1 bg-white rounded-lg border border-gray-200 overflow-hidden">
                {leftPanelView === "chat" ? (
                  <ChatInterface
                    messages={messages}
                    input={input}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                    isLoading={isLoading}
                  />
                ) : (
                  <ContextDisplay context={context} />
                )}
              </div>
            </div>

            {/* Right Panel - Resume Preview / Data */}
            <div className="flex flex-col">
              <div className="flex items-center justify-end mb-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant={
                      rightPanelView === "preview" ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setRightPanelView("preview")}
                    className="flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    Preview
                  </Button>
                  <Button
                    variant={rightPanelView === "data" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setRightPanelView("data")}
                    className="flex items-center gap-2"
                  >
                    <BarChart3 className="w-4 h-4" />
                    Data
                  </Button>
                </div>
              </div>

              <div className="flex-1 bg-white rounded-lg border border-gray-200 overflow-hidden">
                {rightPanelView === "preview" ? (
                  <PreviewPanel />
                ) : (
                  <ResumeDataDisplay resumeData={resumeData} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
