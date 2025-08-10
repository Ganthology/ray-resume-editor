"use client";

import { MessageCircle, Monitor } from "lucide-react";

import { Button } from "@/platform/component/ui/button";
import ChatInterface from "@/modules/chat/view/component/ChatInterface";
import ChatReadOnlyEditPanel from "@/modules/chat/view/component/ChatReadOnlyEditPanel";
import ChatStylesPanel from "@/modules/chat/view/component/ChatStylesPanel";
import ContextDisplay from "@/modules/chat/view/component/ContextDisplay";
import ExportToBuilderButton from "@/modules/chat/view/component/ExportToBuilderButton";
import MobilePDFEmbed from "@/modules/editor/view/component/MobilePDFEmbed";
import { PDFViewer } from "@react-pdf/renderer";
import { Progress } from "@/platform/component/ui/progress";
import React from "react";
import ResumePDF from "@/modules/resume/view/component/ResumePDF";
import ResumeTabs from "@/modules/chat/view/component/ResumeTabs";
import { useChatScreenViewModel } from "@/modules/chat/viewModel/useChatScreen";

export default function ChatScreen() {
  const vm = useChatScreenViewModel();

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Main Content */}
      <div className="flex-1">
        {/* Mobile Layout */}
        <div className="md:hidden h-full flex flex-col">
          {/* Unified Navigation (mobile) */}
          <div className="flex items-center justify-center px-6 py-4 bg-gray-50">
            <ResumeTabs
              value={
                vm.activeView === "chat" ? "chat" : (vm.rightPanelTab as any)
              }
              onChange={(val) => {
                if (val === "chat") {
                  vm.setActiveView("chat");
                } else {
                  vm.setActiveView(val);
                  vm.setRightPanelTab(val);
                }
              }}
            />
          </div>

          {/* Mobile Content */}
          <div className="h-full">
            {vm.activeView === "chat" ? (
              <ChatInterface
                messages={vm.messages}
                input={vm.input}
                handleInputChange={vm.handleInputChange}
                handleSubmit={vm.handleSubmit}
                isLoading={vm.isLoading}
              />
            ) : (
              <div className="h-full flex flex-col bg-white">
                {/* Progress Bar for Mobile (feature-flagged) */}
                {vm.SHOW_COMPLETION &&
                  (vm.activeView === "preview" || vm.activeView === "edit") && (
                    <div className="px-4 py-3 bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-gray-700">
                          Resume Completion
                        </span>
                        <span
                          className={`text-xs font-medium ${vm.completionStatus.color}`}
                        >
                          {vm.completionPercentage}% -{" "}
                          {vm.completionStatus.label}
                        </span>
                      </div>
                      <Progress
                        value={vm.completionPercentage}
                        className="h-2"
                      />
                    </div>
                  )}

                {/* Mobile Tab Content */}
                <div className="flex-1 overflow-hidden">
                  {vm.activeView === "preview" ? (
                    <div className="h-full">
                      <MobilePDFEmbed resumeData={vm.resumeData} />
                    </div>
                  ) : vm.activeView === "edit" ? (
                    <div className="h-full overflow-y-auto p-4">
                      <div className="mb-3 flex justify-end">
                        <ExportToBuilderButton variant="inline" />
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <ChatReadOnlyEditPanel />
                      </div>
                      <div className="bg-white rounded-lg p-4 mt-4">
                        <ChatStylesPanel
                          fitMode={vm.resumeData.styles?.fitMode || "normal"}
                          spacing={
                            vm.resumeData.styles?.spacing || {
                              horizontal: 30,
                              vertical: 30,
                            }
                          }
                          onFitModeChange={vm.handleFitModeChange}
                          onSpacingChange={vm.handleSpacingChange}
                        />
                      </div>
                    </div>
                  ) : vm.activeView === "context" ? (
                    <div className="h-full overflow-y-auto p-4">
                      <ContextDisplay context={vm.context} />
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
          <div className="w-1/2 flex flex-col bg-white">
            <div className="flex-1 overflow-hidden">
              <ChatInterface
                messages={vm.messages}
                input={vm.input}
                handleInputChange={vm.handleInputChange}
                handleSubmit={vm.handleSubmit}
                isLoading={vm.isLoading}
              />
            </div>
          </div>

          {/* Right Panel - Resume with all tabs (50%) */}
          <div className="w-1/2 flex flex-col bg-gray-50">
            {/* Progress Bar (feature-flagged) */}
            {vm.SHOW_COMPLETION && (
              <div className="px-4 py-3 bg-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Resume Completion
                  </span>
                  <span
                    className={`text-sm font-medium ${vm.completionStatus.color}`}
                  >
                    {vm.completionPercentage}% - {vm.completionStatus.label}
                  </span>
                </div>
                <Progress value={vm.completionPercentage} className="h-2" />
              </div>
            )}

            {/* Unified Navigation (desktop) */}
            <div className="bg-gray-50">
              <div className="px-4 py-3">
                <ResumeTabs
                  includeChat={false}
                  value={vm.rightPanelTab}
                  onChange={(val) => {
                    vm.setActiveView(val);
                    vm.setRightPanelTab(val);
                  }}
                />
              </div>
            </div>

            {/* Resume Content - Full Height */}
            <div className="flex-1 overflow-hidden">
              {vm.rightPanelTab === "preview" ? (
                <div className="h-full">
                  <PDFViewer showToolbar={false} className="h-full w-full">
                    <ResumePDF resumeData={vm.resumeData} />
                  </PDFViewer>
                </div>
              ) : vm.rightPanelTab === "edit" ? (
                <div className="h-full overflow-y-auto p-4">
                  <div className="mb-3 flex justify-end">
                    <ExportToBuilderButton variant="inline" />
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <ChatReadOnlyEditPanel />
                  </div>
                  {/* Embedded Styles inside Edit */}
                  <div className="bg-white rounded-lg p-4 mt-4">
                    <ChatStylesPanel
                      fitMode={vm.resumeData.styles?.fitMode || "normal"}
                      spacing={
                        vm.resumeData.styles?.spacing || {
                          horizontal: 30,
                          vertical: 30,
                        }
                      }
                      onFitModeChange={vm.handleFitModeChange}
                      onSpacingChange={vm.handleSpacingChange}
                    />
                  </div>
                </div>
              ) : vm.rightPanelTab === "context" ? (
                <div className="h-full overflow-y-auto p-4">
                  <div className="bg-white rounded-lg p-4">
                    <ContextDisplay context={vm.context} />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
