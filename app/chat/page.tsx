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
import React, { useEffect, useRef, useState } from "react";

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
import { useChat } from "@ai-sdk/react";
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
  const processedToolInvocationsRef = useRef<Set<string>>(new Set());

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
  } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content:
          "Welcome to the Resume Builder! I'm your dedicated resume building assistant, specialized in helping you create professional resumes and advance your career.\n\n🎯 **I can help you with:**\n• Professional experience and work history\n• Education and academic achievements\n• Skills and certifications\n• Career goals and objectives\n• Resume formatting and best practices\n• Interview preparation related to your resume\n\n📝 **Let's start building your resume!** Tell me about your current or most recent work experience, and I'll help you organize it into a polished, professional format.",
      },
    ],
  });

  // Handle tool invocations from messages
  useEffect(() => {
    // Process all messages for tool invocations
    messages.forEach((message) => {
      if (message.role === "assistant" && message.toolInvocations) {
        message.toolInvocations.forEach((toolInvocation) => {
          const invocationId = `${message.id}-${toolInvocation.toolCallId}`;

          // Skip if already processed
          if (processedToolInvocationsRef.current.has(invocationId)) {
            return;
          }

          console.log("Tool invocation found:", toolInvocation);

          // Check if tool invocation has completed (has result)
          if (toolInvocation.state === "result" && "result" in toolInvocation) {
            // Mark as processed
            processedToolInvocationsRef.current = new Set(
              processedToolInvocationsRef.current
            ).add(invocationId);

            if (toolInvocation.toolName === "generateContext") {
              const result = toolInvocation.result as {
                contextSummary: string;
                timestamp: string;
              };
              console.log(
                "Context summary updated continuously:",
                result.contextSummary.substring(0, 200) + "..."
              );

              // Update the context state with the latest comprehensive information
              const contextData: ConversationContext = {
                id: `context-${Date.now()}`,
                content: result.contextSummary,
                lastUpdated: new Date(),
              };
              setContext(contextData);
            } else if (toolInvocation.toolName === "updateResume") {
              const result = toolInvocation.result as {
                resumeData: ResumeData;
                timestamp: string;
                success: boolean;
              };
              console.log("Resume data updated:", result.resumeData);

              // Update the resume data directly
              if (result.success && result.resumeData) {
                loadFromJSON(result.resumeData);
              }
            }
          }
        });
      }
    });
  }, [messages, loadFromJSON]);

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
            "Welcome to the Resume Builder! I'm your dedicated resume building assistant, specialized in helping you create professional resumes and advance your career.\n\n🎯 **I can help you with:**\n• Professional experience and work history\n• Education and academic achievements\n• Skills and certifications\n• Career goals and objectives\n• Resume formatting and best practices\n• Interview preparation related to your resume\n\n📝 **Let's start building your resume!** Tell me about your current or most recent work experience, and I'll help you organize it into a polished, professional format.",
        },
      ]);
      setContext(null);
      processedToolInvocationsRef.current = new Set();
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

          <Link href="/editor">
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
