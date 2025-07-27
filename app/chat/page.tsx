"use client";

import {
  Edit3,
  Eye,
  FileText,
  MessageCircle,
  Monitor,
  Palette,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import {
  calculateResumeCompletion,
  getCompletionStatus,
} from "@/modules/resume/utils/completion";
import { initialResumeData, useResumeStore } from "../store/resumeStore";

import { AppLayout } from "@/platform/component/layout/AppLayout";
import { Button } from "@/platform/component/ui/button";
import ChatInterface from "@/modules/chat/view/component/ChatInterface";
import ContextDisplay from "@/modules/chat/view/component/ContextDisplay";
import { ConversationContext } from "@/modules/chat/types/ChatTypes";
import EditPanel from "@/modules/editor/view/component/EditPanel";
import FloatingStylesButton from "@/modules/chat/view/component/FloatingStylesButton";
import { Progress } from "@/platform/component/ui/progress";
import { ResumeData } from "@/modules/resume/data/entity/ResumeData";
import { ResumeModule } from "@/modules/resume/data/entity/ResumeModule";
import ResumePreview from "@/modules/editor/view/component/ResumePreview";
import StylesPanel from "@/modules/editor/view/component/StylesPanel";
import { useChat } from "@ai-sdk/react";
import { useResumePreview } from "@/modules/editor/view/viewModel/useResumePreview";

export default function ChatPage() {
  const { loadFromJSON, resumeData, updateStyles } = useResumeStore();
  const [context, setContext] = useState<ConversationContext | null>(null);
  const [activeView, setActiveView] = useState<
    "chat" | "context" | "preview" | "edit" | "styles"
  >("chat");
  const [rightPanelTab, setRightPanelTab] = useState<
    "preview" | "edit" | "context" | "styles"
  >("preview");
  const processedToolInvocationsRef = useRef<Set<string>>(new Set());
  const {
    isLoading: previewLoading,
    error: previewError,
    pdfUrl,
    generatePDF,
  } = useResumePreview();

  // Calculate resume completion
  const completionPercentage = calculateResumeCompletion(resumeData);
  const completionStatus = getCompletionStatus(completionPercentage);

  // Styles handlers
  const handleFitModeChange = (mode: "compact" | "normal") => {
    updateStyles({
      ...resumeData.styles,
      fitMode: mode,
    });
  };

  const handleSpacingChange = (spacing: {
    horizontal: number;
    vertical: number;
  }) => {
    updateStyles({
      ...resumeData.styles,
      fitMode: resumeData.styles?.fitMode || "normal",
      spacing,
    });
  };

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
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

  return (
    <AppLayout>
      <div className="flex flex-col h-full bg-gray-50">
        {/* Header with Clear Chat Button */}
        {/* <div className="border-b bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                AI Chat Assistant
              </h1>
              <p className="text-sm text-gray-600">
                Build your resume through conversation
              </p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleClearChat}
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Clear Chat
            </Button>
          </div>
        </div> */}

        {/* Main Content */}
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
                  variant={
                    activeView === "preview" ||
                    activeView === "edit" ||
                    activeView === "context" ||
                    activeView === "styles"
                      ? "default"
                      : "ghost"
                  }
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
            <div className="h-[calc(100vh-200px)]">
              {activeView === "chat" ? (
                <ChatInterface
                  messages={messages}
                  input={input}
                  handleInputChange={handleInputChange}
                  handleSubmit={handleSubmit}
                  isLoading={isLoading}
                />
              ) : (
                <div className="h-full flex flex-col bg-white">
                  {/* Mobile Resume Tab Navigation */}
                  <div className="flex border-b border-gray-200 bg-gray-50">
                    <button
                      onClick={() => {
                        setActiveView("preview");
                        setRightPanelTab("preview");
                      }}
                      className={`flex-1 px-3 py-3 text-xs font-medium flex items-center justify-center gap-1 ${
                        activeView === "preview"
                          ? "bg-white text-blue-600 shadow-sm border-b-2 border-blue-500"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      <Eye className="w-4 h-4" />
                      Preview
                    </button>
                    <button
                      onClick={() => {
                        setActiveView("edit");
                        setRightPanelTab("edit");
                      }}
                      className={`flex-1 px-3 py-3 text-xs font-medium flex items-center justify-center gap-1 ${
                        activeView === "edit"
                          ? "bg-white text-blue-600 shadow-sm border-b-2 border-blue-500"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setActiveView("context");
                        setRightPanelTab("context");
                      }}
                      className={`flex-1 px-3 py-3 text-xs font-medium flex items-center justify-center gap-1 ${
                        activeView === "context"
                          ? "bg-white text-blue-600 shadow-sm border-b-2 border-blue-500"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      <FileText className="w-4 h-4" />
                      Context
                    </button>
                    <button
                      onClick={() => {
                        setActiveView("styles");
                        setRightPanelTab("styles");
                      }}
                      className={`flex-1 px-3 py-3 text-xs font-medium flex items-center justify-center gap-1 ${
                        activeView === "styles"
                          ? "bg-white text-blue-600 shadow-sm border-b-2 border-blue-500"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      <Palette className="w-4 h-4" />
                      Styles
                    </button>
                  </div>

                  {/* Progress Bar for Mobile */}
                  {(activeView === "preview" || activeView === "edit") && (
                    <div className="px-4 py-3 bg-gray-50 border-b">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-gray-700">
                          Resume Completion
                        </span>
                        <span
                          className={`text-xs font-medium ${completionStatus.color}`}
                        >
                          {completionPercentage}% - {completionStatus.label}
                        </span>
                      </div>
                      <Progress value={completionPercentage} className="h-2" />
                    </div>
                  )}

                  {/* Mobile Tab Content */}
                  <div className="flex-1 overflow-hidden">
                    {activeView === "preview" ? (
                      <div className="h-full">
                        <ResumePreview
                          isLoading={previewLoading}
                          error={previewError}
                          pdfUrl={pdfUrl}
                          generatePDF={generatePDF}
                        />
                      </div>
                    ) : activeView === "edit" ? (
                      <div className="h-full overflow-y-auto p-4">
                        <EditPanel />
                      </div>
                    ) : activeView === "context" ? (
                      <div className="h-full overflow-y-auto p-4">
                        <ContextDisplay context={context} />
                      </div>
                    ) : activeView === "styles" ? (
                      <div className="h-full overflow-y-auto p-4">
                        <StylesPanel
                          fitMode={resumeData.styles?.fitMode || "normal"}
                          spacing={
                            resumeData.styles?.spacing || {
                              horizontal: 30,
                              vertical: 30,
                            }
                          }
                          onFitModeChange={handleFitModeChange}
                          onSpacingChange={handleSpacingChange}
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex h-full">
            {/* Left Panel - Chat Only (50%) */}
            <div className="w-1/2 border-r border-gray-200/60 flex flex-col bg-white shadow-sm">
              {/* Simple Chat Header */}
              <div className="px-4 py-3 border-b border-gray-100 bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-gray-900">
                      AI Chat
                    </h2>
                    <p className="text-xs text-gray-600">
                      Build your resume through conversation
                    </p>
                  </div>
                </div>
              </div>

              {/* Chat Content */}
              <div className="flex-1 overflow-hidden">
                <ChatInterface
                  messages={messages}
                  input={input}
                  handleInputChange={handleInputChange}
                  handleSubmit={handleSubmit}
                  isLoading={isLoading}
                />
              </div>
            </div>

            {/* Right Panel - Resume with all tabs (50%) */}
            <div className="w-1/2 flex flex-col bg-gray-50">
              {/* Progress Bar */}
              <div className="px-4 py-3 bg-white border-b border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Resume Completion
                  </span>
                  <span
                    className={`text-sm font-medium ${completionStatus.color}`}
                  >
                    {completionPercentage}% - {completionStatus.label}
                  </span>
                </div>
                <Progress value={completionPercentage} className="h-2" />
              </div>

              {/* Resume Header with Tabs */}
              <div className="border-b border-gray-200 bg-white shadow-sm">
                <div className="flex items-center px-4 py-3">
                  <div className="flex items-center bg-gray-50 rounded-lg p-0.5 border border-gray-200">
                    <button
                      onClick={() => setRightPanelTab("preview")}
                      className={`px-4 py-2 text-sm font-medium flex items-center gap-2 rounded-md ${
                        rightPanelTab === "preview"
                          ? "bg-white text-blue-600 shadow-sm border border-gray-200"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      <Eye className="w-4 h-4" />
                      Preview
                    </button>
                    <button
                      onClick={() => setRightPanelTab("edit")}
                      className={`px-4 py-2 text-sm font-medium flex items-center gap-2 rounded-md ${
                        rightPanelTab === "edit"
                          ? "bg-white text-blue-600 shadow-sm border border-gray-200"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => setRightPanelTab("context")}
                      className={`px-4 py-2 text-sm font-medium flex items-center gap-2 rounded-md ${
                        rightPanelTab === "context"
                          ? "bg-white text-blue-600 shadow-sm border border-gray-200"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      <FileText className="w-4 h-4" />
                      Context
                    </button>
                    <button
                      onClick={() => setRightPanelTab("styles")}
                      className={`px-4 py-2 text-sm font-medium flex items-center gap-2 rounded-md ${
                        rightPanelTab === "styles"
                          ? "bg-white text-blue-600 shadow-sm border border-gray-200"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      <Palette className="w-4 h-4" />
                      Styles
                    </button>
                  </div>
                </div>
              </div>

              {/* Resume Content - Full Height */}
              <div className="flex-1 overflow-hidden">
                {rightPanelTab === "preview" ? (
                  <div className="h-full">
                    <ResumePreview
                      isLoading={previewLoading}
                      error={previewError}
                      pdfUrl={pdfUrl}
                      generatePDF={generatePDF}
                    />
                  </div>
                ) : rightPanelTab === "edit" ? (
                  <div className="h-full overflow-y-auto p-4">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                      <EditPanel />
                    </div>
                  </div>
                ) : rightPanelTab === "context" ? (
                  <div className="h-full overflow-y-auto p-4">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                      <ContextDisplay context={context} />
                    </div>
                  </div>
                ) : rightPanelTab === "styles" ? (
                  <div className="h-full overflow-y-auto p-4">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                      <StylesPanel
                        fitMode={resumeData.styles?.fitMode || "normal"}
                        spacing={
                          resumeData.styles?.spacing || {
                            horizontal: 30,
                            vertical: 30,
                          }
                        }
                        onFitModeChange={handleFitModeChange}
                        onSpacingChange={handleSpacingChange}
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {/* Floating Action Buttons */}
        <FloatingStylesButton />
      </div>
    </AppLayout>
  );
}
