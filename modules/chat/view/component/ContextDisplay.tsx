"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/platform/component/ui/card";
import { ClockIcon, FileTextIcon } from "lucide-react";

import { Badge } from "@/platform/component/ui/badge";
import { ConversationContext } from "../../types/ChatTypes";
import React from "react";

interface ContextDisplayProps {
  context: ConversationContext | null;
}

export default function ContextDisplay({ context }: ContextDisplayProps) {
  return (
    <Card className="h-full border-gray-200/60 shadow-sm">
      <CardHeader className="border-b border-gray-200/60">
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <FileTextIcon className="w-5 h-5" />
          Conversation Context
          <Badge variant="secondary" className="text-xs">
            Current
          </Badge>
        </CardTitle>
        <p className="text-sm text-gray-600">
          Summary of our conversation and key information gathered
        </p>
      </CardHeader>

      <CardContent className="p-4">
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
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">Summary</h4>
                <p className="text-sm text-blue-800">{context.summary}</p>
              </div>
            )}

            {/* Full Context */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">Full Context</h4>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <ClockIcon className="w-3 h-3" />
                  Updated {context.lastUpdated.toLocaleTimeString()}
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 max-h-[300px] overflow-y-auto">
                <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {context.content}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
