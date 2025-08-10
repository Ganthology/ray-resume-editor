"use client";

// No Card components used here; removed import
import { ClockIcon, FileTextIcon, DownloadIcon } from "lucide-react";

import { Badge } from "@/platform/component/ui/badge";
import { Button } from "@/platform/component/ui/button";
import { ConversationContext } from "../../types/ChatTypes";
import React from "react";

interface ContextDisplayProps {
  context: ConversationContext | null;
}

export default function ContextDisplay({ context }: ContextDisplayProps) {
  const handleDownloadContext = () => {
    if (!context || !context.content) return;

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const filename = `RESUME_CONTEXT_${timestamp}.md`;
    
    const markdownContent = `# Resume Context Export
Generated on: ${new Date().toLocaleString()}

## Summary
${context.summary || 'No summary available'}

## Full Context
${context.content}
`;

    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  return (
    <div className="h-full flex flex-col">
      {/* Minimal Header */}
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <FileTextIcon className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Conversation Context</h1>
              <p className="text-sm text-gray-500">
                Summary of our conversation and key information gathered
              </p>
            </div>
          </div>
          {context && context.content && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadContext}
              className="flex items-center gap-2 rounded-xl"
            >
              <DownloadIcon className="w-4 h-4" />
              Download
            </Button>
          )}
        </div>
      </div>

      <div className="flex-1 p-6">
        {!context ? (
          <div className="text-center text-gray-500 py-8">
            <FileTextIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No context available yet</p>
            <p className="text-xs text-gray-400 mt-1">
              Start chatting to see conversation context here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Context Summary */}
            {context.summary && (
              <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                <h4 className="font-medium text-purple-900 mb-2">Summary</h4>
                <p className="text-sm text-purple-800">{context.summary}</p>
              </div>
            )}

            {/* Full Context */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">Full Context</h4>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <ClockIcon className="w-3 h-3" />
                  Updated {context.lastUpdated.toLocaleTimeString()}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border-0 max-h-[400px] overflow-y-auto">
                <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {context.content}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
