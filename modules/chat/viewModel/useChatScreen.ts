"use client";

import {
  calculateResumeCompletion,
  getCompletionStatus,
} from "@/modules/resume/utils/completion";
import { useEffect, useMemo, useRef, useState } from "react";

import { ConversationContext } from "@/modules/chat/types/ChatTypes";
import { ResumeData } from "@/modules/resume/data/entity/ResumeData";
import { ResumeModule } from "@/modules/resume/data/entity/ResumeModule";
import { initialResumeData } from "@/app/store/resumeStore";
import { useAuth } from "@/platform/auth/AuthContext";
import { useCallback } from "react";
import { useChat } from "@ai-sdk/react";
import { useChatStore } from "@/app/store/chatStore";

export type ActiveView = "chat" | "context" | "preview" | "edit" | "styles";
export type RightPanelTab = "preview" | "edit" | "context" | "styles";

export function useChatScreenViewModel() {
  const { user } = useAuth();
  const [conversationId, setConversationId] = useState<string | null>(null);
  const {
    chatResumeData: resumeData,
    loadChatResumeFromJSON: loadFromJSON,
    updateChatResume,
  } = useChatStore();

  const [context, setContext] = useState<ConversationContext | null>(null);
  const [activeView, setActiveView] = useState<ActiveView>("chat");
  const [rightPanelTab, setRightPanelTab] = useState<RightPanelTab>("preview");
  const processedToolInvocationsRef = useRef<Set<string>>(new Set());

  const SHOW_COMPLETION =
    typeof process !== "undefined" &&
    process.env.NEXT_PUBLIC_SHOW_COMPLETION === "true";

  const completionPercentage = useMemo(
    () => (SHOW_COMPLETION ? calculateResumeCompletion(resumeData) : 0),
    [resumeData, SHOW_COMPLETION]
  );
  type CompletionStatus = ReturnType<typeof getCompletionStatus>;
  const completionStatus: CompletionStatus = useMemo(
    () =>
      SHOW_COMPLETION
        ? getCompletionStatus(completionPercentage)
        : { label: "", color: "", bgColor: "" },
    [completionPercentage, SHOW_COMPLETION]
  );

  const updateStyles = (styles: ResumeData["styles"]) => {
    updateChatResume({ ...resumeData, styles });
  };

  const handleFitModeChange = (mode: "compact" | "normal") => {
    updateStyles({ ...resumeData.styles, fitMode: mode });
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

  // Ensure a conversation exists
  useEffect(() => {
    if (!user || conversationId) return;
    (async () => {
      const res = await fetch("/api/chat/conversations", { method: "POST" });
      if (res.ok) {
        const json = await res.json();
        setConversationId(json.conversation.id);
      }
    })();
  }, [user, conversationId]);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit: baseHandleSubmit,
    isLoading,
  } = useChat({
    api: "/api/chat",
    body: { conversationId },
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content:
          "Welcome to the Resume Builder! I'm your dedicated resume building assistant, specialized in helping you create professional resumes and advance your career.\n\n🎯 **I can help you with:**\n• Professional experience and work history\n• Education and academic achievements\n• Skills and certifications\n• Career goals and objectives\n• Resume formatting and best practices\n• Interview preparation related to your resume\n\n📝 **Let's start building your resume!** Tell me about your current or most recent work experience, and I'll help you organize it into a polished, professional format.",
      },
    ],
  });

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      return baseHandleSubmit(e);
    },
    [baseHandleSubmit]
  );

  useEffect(() => {
    messages.forEach((message) => {
      if (message.role !== "assistant" || !message.toolInvocations) return;

      message.toolInvocations.forEach((toolInvocation) => {
        const invocationId = `${message.id}-${toolInvocation.toolCallId}`;
        if (processedToolInvocationsRef.current.has(invocationId)) return;

        if (toolInvocation.state === "result" && "result" in toolInvocation) {
          processedToolInvocationsRef.current = new Set(
            processedToolInvocationsRef.current
          ).add(invocationId);

          if (toolInvocation.toolName === "generateContext") {
            const result = toolInvocation.result as {
              contextSummary: string;
              timestamp: string;
            };
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

            if (result.success && result.resumeData) {
              loadFromJSON(result.resumeData);
            }
          }
        }
      });
    });
  }, [messages, loadFromJSON]);

  return {
    // data
    resumeData,
    context,
    messages,
    input,
    isLoading,
    // view state
    activeView,
    setActiveView,
    rightPanelTab,
    setRightPanelTab,
    // completion
    SHOW_COMPLETION,
    completionPercentage,
    completionStatus,
    // handlers
    handleInputChange,
    handleSubmit,
    handleFitModeChange,
    handleSpacingChange,
  } as const;
}
