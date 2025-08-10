"use client";

import {
  Brain,
  CheckCircle,
  FileText,
  MessageCircleIcon,
  SendIcon,
  Sparkles,
} from "lucide-react";
import { Message, ToolInvocation } from "ai";
import React, { useEffect, useRef } from "react";

import { Button } from "@/platform/component/ui/button";
import MarkdownMessage from "@/modules/chat/view/component/MarkdownMessage";
import { Textarea } from "@/platform/component/ui/textarea";

interface ChatInterfaceProps {
  messages: Message[];
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

export default function ChatInterface({
  messages,
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
}: ChatInterfaceProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Helper function to render tool invocation notifications
  const renderToolInvocation = (toolInvocation: ToolInvocation) => {
    if (toolInvocation.state !== "result") {
      // Show loading state for in-progress tool invocations
      if (toolInvocation.state === "call") {
        const toolName = toolInvocation.toolName;
        if (toolName === "generateContext") {
          return (
            <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-xl mb-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
              <span className="text-sm text-purple-800">
                Analyzing conversation and updating context...
              </span>
            </div>
          );
        }
        if (toolName === "updateResume") {
          return (
            <div className="flex items-center gap-2 p-3 bg-green-50 rounded-xl mb-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
              <span className="text-sm text-green-800">
                Updating your resume with new information...
              </span>
            </div>
          );
        }
      }
      return null;
    }

    const toolName = toolInvocation.toolName;
    const isSuccess =
      toolInvocation.result && toolInvocation.result.success !== false;

    if (toolName === "generateContext") {
      return (
        <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-xl mb-2 animate-in slide-in-from-bottom-2 duration-300">
          <Brain className="w-4 h-4 text-purple-600" />
          <div className="flex-1">
            <span className="text-sm text-purple-800">
              <strong>Context Updated:</strong> I&apos;ve analyzed our
              conversation and updated the context summary.
            </span>
            <div className="text-xs text-purple-600 mt-1">
              Switch to the Context tab to view the updated summary.
            </div>
          </div>
          <CheckCircle className="w-4 h-4 text-green-600" />
        </div>
      );
    }

    if (toolName === "updateResume") {
      return (
        <div className="flex items-center gap-2 p-3 bg-green-50 rounded-xl mb-2 animate-in slide-in-from-bottom-2 duration-300">
          <FileText className="w-4 h-4 text-green-600" />
          <div className="flex-1">
            <span className="text-sm text-green-800">
              <strong>Resume Updated:</strong> I&apos;ve updated your resume
              with the new information you provided.
            </span>
            <div className="text-xs text-green-600 mt-1">
              Switch to the Preview tab to see your updated resume.
            </div>
          </div>
          <CheckCircle className="w-4 h-4 text-green-600" />
        </div>
      );
    }

    // Fallback for other tool invocations
    if (isSuccess) {
      return (
        <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-xl mb-2 animate-in slide-in-from-bottom-2 duration-300">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <div className="flex-1">
            <span className="text-sm text-blue-800">
              <strong>Task Completed:</strong> I&apos;ve processed your request
              successfully.
            </span>
          </div>
          <CheckCircle className="w-4 h-4 text-green-600" />
        </div>
      );
    }

    return null;
  };

  return (
    <div className="h-full flex flex-1 flex-col">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <MessageCircleIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Start a conversation to build your resume</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] ${
                  message.role === "user" ? "" : "w-full"
                }`}
              >
                {/* Tool Invocation Notifications for Assistant Messages */}
                {message.role === "assistant" &&
                  message.toolInvocations &&
                  message.toolInvocations.length > 0 && (
                    <div className="mb-2">
                      {message.toolInvocations.map((toolInvocation, index) => (
                        <div key={index}>
                          {renderToolInvocation(toolInvocation)}
                        </div>
                      ))}
                    </div>
                  )}

                {/* Regular Message Content (only show if not empty or has meaningful content) */}
                {message.content && message.content.trim() ? (
                  <div
                    className={`p-3 rounded-lg ${
                      message.role === "user"
                        ? "bg-blue-500 text-white rounded-br-sm"
                        : message.role === "assistant"
                          ? "bg-gray-100 text-gray-900 rounded-bl-sm"
                          : "bg-yellow-50 text-yellow-800 text-sm"
                    }`}
                  >
                    <MarkdownMessage content={message.content} />
                    <p className="text-xs opacity-70 mt-1">
                      {message.createdAt
                        ? new Date(message.createdAt).toLocaleTimeString()
                        : ""}
                    </p>
                  </div>
                ) : (
                  // Show timestamp for messages that only have tool invocations
                  message.role === "assistant" &&
                  message.toolInvocations &&
                  message.toolInvocations.length > 0 && (
                    <div className="text-xs text-gray-400 text-right mt-1">
                      {message.createdAt
                        ? new Date(message.createdAt).toLocaleTimeString()
                        : ""}
                    </div>
                  )
                )}
              </div>
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-3 rounded-lg rounded-bl-sm">
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                <span className="text-sm text-gray-600">Thinking...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-100 p-6 bg-gray-50/50">
        <form onSubmit={handleSubmit} className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <Textarea
              value={input}
              onChange={(e) => {
                handleInputChange(
                  e as unknown as React.ChangeEvent<HTMLInputElement>
                );
              }}
              placeholder="Tell me about your experience..."
              disabled={isLoading}
              className="border border-gray-200 bg-white rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={1}
              maxLength={5}
            />
          </div>
          <Button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="shrink-0 h-12 w-12 rounded-xl bg-blue-600 hover:bg-blue-700"
          >
            <SendIcon className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
