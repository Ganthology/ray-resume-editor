"use client";

import {
  FileText,
  Home,
  MessageCircle,
  RefreshCw,
  Eye,
  Edit3,
  Monitor,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { initialResumeData, useResumeStore } from "../store/resumeStore";

import { Button } from "@/platform/component/ui/button";
import ChatInterface from "@/modules/chat/view/component/ChatInterface";
import ContextDisplay from "@/modules/chat/view/component/ContextDisplay";
import { ConversationContext } from "@/modules/chat/types/ChatTypes";
import FloatingStylesButton from "@/modules/chat/view/component/FloatingStylesButton";
import ResumePreview from "@/modules/editor/view/component/ResumePreview";
import { useResumePreview } from "@/modules/editor/view/viewModel/useResumePreview";
import EditPanel from "@/modules/editor/view/component/EditPanel";
import Footer from "@/platform/component/ui/footer";
import Link from "next/link";
import Navigation from "@/platform/component/ui/navigation";
import { ResumeData } from "@/modules/resume/data/entity/ResumeData";
import { ResumeModule } from "@/modules/resume/data/entity/ResumeModule";
import { useChat } from "@ai-sdk/react";

export default function ChatPage() {
  const { clearAllData, loadFromJSON, resumeData } = useResumeStore();
  const [context, setContext] = useState<ConversationContext | null>(null);
  const [activeView, setActiveView] = useState<"chat" | "context" | "preview" | "edit">("chat");
  const [mobileTab, setMobileTab] = useState<"preview" | "edit">("preview");
  const processedToolInvocationsRef = useRef<Set<string>>(new Set());
  const { isLoading: previewLoading, error: previewError, pdfUrl, generatePDF } = useResumePreview();

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

  // Generate PDF when resume data changes
  useEffect(() => {
    generatePDF();
  }, [generatePDF, resumeData]);

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
              const result = {
                ...toolInvocation.result,
                resumeData: {
                  ...toolInvocation.result.resumeData,
                  modules: initialResumeData.modules.map((initModule) => {
                    const updatedModule =
                      toolInvocation.result.resumeData.modules.find(
                        (module: ResumeModule) =>
                          module.title === initModule.title
                      );

                    return updatedModule ? updatedModule : initModule;
                  }),
                },
              } as {
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
          title="RaysumeAI Consultant"
          subtitle="Build your resume through conversation"
          showDefaultActions={false}
          actions={navigationActions}
        >
          <div className="flex items-center gap-2">
            <Link href="/dashboard">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 hover:cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>Dashboard</span>
              </Button>
            </Link>
            <Link href="/editor">
              <Button
                variant="default"
                size="sm"
                className="flex items-center gap-2 hover:cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Resume Editor</span>
              </Button>
            </Link>
          </div>
        </Navigation>

        <div className="flex-1 overflow-hidden">
          {/* Mobile Layout */}
          <div className="md:hidden">
            {/* Mobile Navigation */}
            <div className="flex items-center justify-center px-6 py-4 bg-gray-50 border-b">
              <div className="bg-white rounded-full p-1 shadow-sm border">
                <Button
                  variant={activeView === "chat" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveView("chat")}
                  className="rounded-full px-4"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat
                </Button>
                <Button
                  variant={activeView === "context" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveView("context")}
                  className="rounded-full px-4"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Context
                </Button>
                <Button
                  variant={activeView === "preview" || activeView === "edit" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveView("preview")}
                  className="rounded-full px-4"
                >
                  <Monitor className="w-4 h-4 mr-2" />
                  Resume
                </Button>
              </div>
            </div>

            {/* Mobile Content */}
            <div className="h-[calc(100vh-140px)]">
              {activeView === "chat" ? (
                <ChatInterface
                  messages={messages}
                  input={input}
                  handleInputChange={handleInputChange}
                  handleSubmit={handleSubmit}
                  isLoading={isLoading}
                />
              ) : activeView === "context" ? (
                <ContextDisplay context={context} />
              ) : (
                <div className="h-full flex flex-col bg-white">
                  {/* Mobile Resume Tab Navigation */}
                  <div className="flex border-b border-gray-200 bg-gray-50">
                    <button
                      onClick={() => setMobileTab("preview")}
                      className={`flex-1 px-4 py-3 text-sm font-medium flex items-center justify-center gap-2 ${
                        mobileTab === "preview"
                          ? "bg-white border-b-2 border-blue-500 text-blue-600"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      <Eye className="w-4 h-4" />
                      Preview
                    </button>
                    <button
                      onClick={() => setMobileTab("edit")}
                      className={`flex-1 px-4 py-3 text-sm font-medium flex items-center justify-center gap-2 ${
                        mobileTab === "edit"
                          ? "bg-white border-b-2 border-blue-500 text-blue-600"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit
                    </button>
                  </div>

                  {/* Mobile Tab Content */}
                  <div className="flex-1 overflow-hidden">
                    {mobileTab === "preview" ? (
                      <div className="h-full p-4">
                        <ResumePreview
                          isLoading={previewLoading}
                          error={previewError}
                          pdfUrl={pdfUrl}
                          generatePDF={generatePDF}
                        />
                      </div>
                    ) : (
                      <div className="h-full overflow-y-auto p-4">
                        <EditPanel />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex h-[calc(100vh-80px)]">
            {/* Left Panel - Chat */}
            <div className="w-1/2 border-r border-gray-200 flex flex-col">
              {/* Chat Header */}
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant={activeView === "chat" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setActiveView("chat")}
                      className="flex items-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Chat
                    </Button>
                    <Button
                      variant={activeView === "context" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setActiveView("context")}
                      className="flex items-center gap-2"
                    >
                      <FileText className="w-4 h-4" />
                      Context
                    </Button>
                  </div>
                </div>
              </div>

              {/* Chat Content */}
              <div className="flex-1 overflow-hidden bg-white">
                {activeView === "chat" ? (
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

            {/* Right Panel - Resume */}
            <div className="w-1/2 flex flex-col">
              {/* Resume Header with Tabs */}
              <div className="border-b border-gray-200 bg-gray-50">
                <div className="flex">
                  <button
                    onClick={() => setActiveView("preview")}
                    className={`px-6 py-4 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${
                      activeView === "preview"
                        ? "border-blue-500 text-blue-600 bg-white"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>
                  <button
                    onClick={() => setActiveView("edit")}
                    className={`px-6 py-4 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${
                      activeView === "edit"
                        ? "border-blue-500 text-blue-600 bg-white"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit
                  </button>
                </div>
              </div>

              {/* Resume Content */}
              <div className="flex-1 overflow-hidden bg-white">
                {activeView === "preview" ? (
                  <div className="h-full p-6">
                    <ResumePreview
                      isLoading={previewLoading}
                      error={previewError}
                      pdfUrl={pdfUrl}
                      generatePDF={generatePDF}
                    />
                  </div>
                ) : activeView === "edit" ? (
                  <div className="h-full overflow-y-auto p-6">
                    <EditPanel />
                  </div>
                ) : (
                  <div className="h-full p-6">
                    <ResumePreview
                      isLoading={previewLoading}
                      error={previewError}
                      pdfUrl={pdfUrl}
                      generatePDF={generatePDF}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Floating Action Buttons */}
        <FloatingStylesButton />
      </div>
      <Footer />
    </>
  );
}
