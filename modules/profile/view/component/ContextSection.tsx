"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/platform/component/ui/card";
import { 
  Bot, 
  Calendar, 
  FileText, 
  MessageSquare, 
  Plus, 
  Trash2, 
  Download,
  Eye,
  Clock,
  Target
} from "lucide-react";
import React, { useState, useEffect } from "react";

import { Badge } from "@/platform/component/ui/badge";
import { Button } from "@/platform/component/ui/button";
import Link from "next/link";

interface ContextItem {
  id: string;
  content: string;
  timestamp: Date;
  wordCount: number;
  topics: string[];
}

export default function ContextSection() {
  const [contexts, setContexts] = useState<ContextItem[]>([]);
  const [selectedContext, setSelectedContext] = useState<ContextItem | null>(null);

  // Load contexts from localStorage on component mount
  useEffect(() => {
    const loadContexts = () => {
      try {
        // Check for any stored conversation contexts
        const storedContexts = localStorage.getItem('conversation-contexts');
        if (storedContexts) {
          const parsed = JSON.parse(storedContexts);
          setContexts(parsed);
        }
        
        // Also check for individual context items that might be stored separately
        const keys = Object.keys(localStorage);
        const contextKeys = keys.filter(key => key.startsWith('context-'));
        
        const individualContexts: ContextItem[] = contextKeys.map(key => {
          const data = localStorage.getItem(key);
          if (data) {
            try {
              const parsed = JSON.parse(data);
              return {
                id: key,
                content: parsed.content || parsed,
                timestamp: new Date(parsed.lastUpdated || Date.now()),
                wordCount: (parsed.content || parsed).split(' ').length,
                topics: extractTopics(parsed.content || parsed),
              };
            } catch {
              return {
                id: key,
                content: data,
                timestamp: new Date(),
                wordCount: data.split(' ').length,
                topics: extractTopics(data),
              };
            }
          }
          return null;
        }).filter(Boolean) as ContextItem[];

        if (individualContexts.length > 0) {
          setContexts(prev => {
            const combined = [...prev, ...individualContexts];
            // Remove duplicates based on content similarity
            const unique = combined.filter((item, index, arr) => 
              arr.findIndex(other => other.content === item.content) === index
            );
            return unique.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
          });
        }
      } catch (error) {
        console.error('Error loading contexts:', error);
      }
    };

    loadContexts();
  }, []);

  const extractTopics = (content: string): string[] => {
    const commonTopics = [
      'experience', 'education', 'skills', 'projects', 'leadership',
      'achievements', 'certifications', 'career goals', 'objectives',
      'responsibilities', 'technologies', 'management', 'development'
    ];
    
    const lowerContent = content.toLowerCase();
    return commonTopics.filter(topic => 
      lowerContent.includes(topic)
    ).slice(0, 3);
  };

  const handleDeleteContext = (contextId: string) => {
    if (confirm('Are you sure you want to delete this context? This action cannot be undone.')) {
      setContexts(prev => prev.filter(ctx => ctx.id !== contextId));
      // Also remove from localStorage
      localStorage.removeItem(contextId);
      if (selectedContext?.id === contextId) {
        setSelectedContext(null);
      }
    }
  };

  const handleExportContext = (context: ContextItem) => {
    const dataStr = JSON.stringify(context, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `context-${context.id}-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const clearAllContexts = () => {
    if (confirm('Are you sure you want to clear all contexts? This action cannot be undone.')) {
      // Clear from state
      setContexts([]);
      setSelectedContext(null);
      
      // Clear from localStorage
      const keys = Object.keys(localStorage);
      const contextKeys = keys.filter(key => key.startsWith('context-'));
      contextKeys.forEach(key => localStorage.removeItem(key));
      localStorage.removeItem('conversation-contexts');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Context Management</h1>
          <p className="text-gray-600">
            View and manage AI-generated summaries from your chat sessions. These contexts help provide better recommendations.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {contexts.length > 0 && (
            <Button variant="outline" onClick={clearAllContexts} className="flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              Clear All
            </Button>
          )}
          <Link href="/chat">
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Chat Session
            </Button>
          </Link>
        </div>
      </div>

      {contexts.length === 0 ? (
        // Empty State
        <Card className="text-center py-12">
          <CardContent>
            <Bot className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Context Data Yet
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Start a chat session with our AI to generate context summaries. These help us understand your career goals and provide better resume recommendations.
            </p>
            <div className="flex gap-3 justify-center">
              <Link href="/chat">
                <Button className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Start AI Chat
                </Button>
              </Link>
              <Link href="/editor">
                <Button variant="outline" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Manual Editor
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Context List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Conversation Contexts ({contexts.length})
              </CardTitle>
              <CardDescription>
                AI-generated summaries from your chat sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {contexts.map((context) => (
                  <div
                    key={context.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedContext?.id === context.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedContext(context)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {context.timestamp.toLocaleDateString()}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {context.wordCount} words
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleExportContext(context);
                          }}
                        >
                          <Download className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteContext(context.id);
                          }}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-700 line-clamp-2 mb-2">
                      {context.content.substring(0, 120)}...
                    </p>
                    
                    {context.topics.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {context.topics.map((topic, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Context Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                {selectedContext ? 'Context Details' : 'Select a Context'}
              </CardTitle>
              <CardDescription>
                {selectedContext 
                  ? `Generated on ${selectedContext.timestamp.toLocaleDateString()}`
                  : 'Click on a context from the list to view details'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedContext ? (
                <div className="space-y-4">
                  {/* Metadata */}
                  <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 rounded-lg text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">Created:</span>
                      <span className="font-medium">{selectedContext.timestamp.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">Word Count:</span>
                      <span className="font-medium">{selectedContext.wordCount}</span>
                    </div>
                  </div>

                  {/* Topics */}
                  {selectedContext.topics.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        Key Topics
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedContext.topics.map((topic, index) => (
                          <Badge key={index} variant="outline">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Content</h4>
                    <div className="max-h-64 overflow-y-auto p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {selectedContext.content}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleExportContext(selectedContext)}
                      className="flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Export
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteContext(selectedContext.id)}
                      className="flex items-center gap-2 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">
                    Select a context from the list to view its details and content.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Usage Stats */}
      {contexts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Context Statistics</CardTitle>
            <CardDescription>
              Overview of your conversation contexts and AI interactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Total Contexts:</span>
                <p className="text-2xl font-bold text-gray-900">{contexts.length}</p>
              </div>
              <div>
                <span className="text-gray-500">Total Words:</span>
                <p className="text-2xl font-bold text-gray-900">
                  {contexts.reduce((sum, ctx) => sum + ctx.wordCount, 0).toLocaleString()}
                </p>
              </div>
              <div>
                <span className="text-gray-500">Most Recent:</span>
                <p className="text-lg font-medium text-gray-900">
                  {contexts[0]?.timestamp.toLocaleDateString()}
                </p>
              </div>
              <div>
                <span className="text-gray-500">Common Topics:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {(() => {
                    const allTopics = contexts.flatMap(ctx => ctx.topics);
                    const topicCounts = allTopics.reduce((acc, topic) => {
                      acc[topic] = (acc[topic] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>);
                    
                    return Object.entries(topicCounts)
                      .sort(([,a], [,b]) => b - a)
                      .slice(0, 3)
                      .map(([topic]) => (
                        <Badge key={topic} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ));
                  })()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}