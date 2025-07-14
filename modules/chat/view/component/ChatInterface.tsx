"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/platform/component/ui/card";
import { MessageCircleIcon, SendIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import { Badge } from "@/platform/component/ui/badge";
import { Button } from "@/platform/component/ui/button";
import { ChatMessage } from "../../types/ChatTypes";
import { Input } from "@/platform/component/ui/input";

interface ChatInterfaceProps {
  onMessageSent: (message: string) => void;
  messages: ChatMessage[];
  isLoading: boolean;
}

export default function ChatInterface({
  onMessageSent,
  messages,
  isLoading,
}: ChatInterfaceProps) {
  const [currentInput, setCurrentInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim() && !isLoading) {
      onMessageSent(currentInput.trim());
      setCurrentInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <Card className="h-full flex flex-col border-gray-200/60 shadow-sm">
      <CardHeader className="border-b border-gray-200/60">
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <MessageCircleIcon className="w-5 h-5" />
          Chat Interface
          <Badge variant="secondary" className="text-xs">
            AI Assistant
          </Badge>
        </CardTitle>
        <p className="text-sm text-gray-600">
          Tell me about your experience and I&apos;ll help build your resume
        </p>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <MessageCircleIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">
                Start a conversation to build your resume
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === "user"
                      ? "bg-blue-500 text-white rounded-br-sm"
                      : message.type === "assistant"
                      ? "bg-gray-100 text-gray-900 rounded-bl-sm"
                      : "bg-yellow-50 text-yellow-800 text-sm border border-yellow-200"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
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
        <div className="border-t border-gray-200/60 p-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tell me about your experience..."
                disabled={isLoading}
                className="pr-12"
              />
            </div>
            <Button
              type="submit"
              disabled={!currentInput.trim() || isLoading}
              size="icon"
              className="shrink-0"
            >
              <SendIcon className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
