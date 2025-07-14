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
import {
  ChatMessage,
  ConversationContext,
} from "@/modules/chat/types/ChatTypes";
import React, { useCallback, useState } from "react";

import { Button } from "@/platform/component/ui/button";
import ChatInterface from "@/modules/chat/view/component/ChatInterface";
import ContextDisplay from "@/modules/chat/view/component/ContextDisplay";
import Footer from "@/platform/component/ui/footer";
import Link from "next/link";
import Navigation from "@/platform/component/ui/navigation";
import PreviewPanel from "@/modules/editor/view/component/PreviewPanel";
import ResumeDataDisplay from "@/modules/chat/view/component/ResumeDataDisplay";
import { useResumeStore } from "../store/resumeStore";

export default function ChatPage() {
  const resumeData = useResumeStore((state) => state.resumeData);
  const { clearAllData } = useResumeStore();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [context, setContext] = useState<ConversationContext | null>(null);
  const [leftPanelView, setLeftPanelView] = useState<"chat" | "context">(
    "chat"
  );
  const [rightPanelView, setRightPanelView] = useState<"preview" | "data">(
    "preview"
  );

  // Initialize with a welcome message and mock context
  React.useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: "welcome",
        type: "assistant",
        content:
          "Welcome to the Resume Builder! I'm here to help you create your professional resume. Tell me about your work experience, education, skills, and any other relevant information, and I'll help organize it into a polished resume.",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);

      // Initialize with mock context to demonstrate the feature
      const mockContext: ConversationContext = {
        id: "mock-context",
        content: `**Personal Information:**
• Name: Sarah Johnson
• Location: San Francisco, CA
• Phone: (555) 123-4567
• Email: sarah.johnson@email.com
• LinkedIn: linkedin.com/in/sarah-johnson

**Current Role:**
• Position: Senior Software Engineer at TechCorp Inc.
• Duration: 3 years and 2 months (January 2021 - Present)
• Responsibilities:
  - Lead development of microservices architecture for e-commerce platform
  - Mentor junior developers and conduct technical interviews
  - Collaborate with product managers to define technical requirements
  - Optimize application performance resulting in 40% faster load times

**Previous Experience:**
• Position: Full Stack Developer at StartupXYZ
• Duration: 2 years (June 2018 - December 2020)
• Achievements:
  - Built responsive web applications using React and Node.js
  - Implemented automated testing reducing bugs by 60%
  - Participated in agile development process

**Education:**
• Degree: Bachelor of Science in Computer Science
• Institution: University of California, Berkeley
• Graduation: May 2018
• GPA: 3.8/4.0

**Technical Skills:**
• Programming Languages: JavaScript, TypeScript, Python, Java
• Frontend: React, Vue.js, HTML5, CSS3, Tailwind CSS
• Backend: Node.js, Express, Django, Spring Boot
• Databases: PostgreSQL, MongoDB, Redis
• Cloud & DevOps: AWS, Docker, Kubernetes, CI/CD
• Tools: Git, Jest, Webpack, Figma

**Projects:**
• E-commerce Platform: Led development of scalable microservices architecture
• Task Management App: Built full-stack application with real-time collaboration
• Open Source Contributions: Active contributor to React ecosystem

**Certifications:**
• AWS Certified Solutions Architect
• Google Cloud Professional Developer
• Certified Scrum Master (CSM)`,
        lastUpdated: new Date(),
      };
      setContext(mockContext);
    }
  }, [messages.length]);

  const handleSendMessage = useCallback(async (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: `I understand you mentioned: "${content}". Let me help you organize this information into your resume. Based on what you've shared, I can help you structure this into the appropriate sections like experience, skills, or education. Would you like me to add this to a specific section of your resume?`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleClearChat = () => {
    if (
      confirm(
        "Are you sure you want to clear the chat and resume data? This action cannot be undone."
      )
    ) {
      setMessages([]);
      setContext(null);
      clearAllData();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation
        title="AI Resume Builder Chat"
        subtitle="Build your resume through conversation"
        showDefaultActions={false}
      >
        {/* Chat-specific actions */}
        <Button
          onClick={handleClearChat}
          variant="outline"
          size="sm"
          className="flex items-center gap-2 text-red-600 hover:text-red-700"
        >
          <RefreshCw className="w-4 h-4" />
          Clear Chat
        </Button>

        <Link
          href="https://github.com/Ganthology/ray-resume-editor"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <Github className="w-4 h-4" />
          <span className="hidden sm:inline">GitHub</span>
        </Link>

        <Link href="/">
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
        <div className="grid grid-cols-2 gap-8 h-[calc(100vh-200px)]">
          {/* Left Panel - Chat Interface / Context */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {leftPanelView === "chat" ? "Chat Interface" : "Context"}
              </h2>
              <div className="flex items-center space-x-2">
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
                  variant={leftPanelView === "context" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setLeftPanelView("context")}
                  className="flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Context
                </Button>
              </div>
            </div>

            <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {leftPanelView === "chat" ? (
                <ChatInterface
                  messages={messages}
                  isLoading={isLoading}
                  onMessageSent={handleSendMessage}
                />
              ) : (
                <div className="p-6 h-full overflow-y-auto">
                  {context ? (
                    <ContextDisplay context={context} />
                  ) : (
                    <p className="text-gray-500 text-center">
                      No context available yet.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Preview / Resume Data */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {rightPanelView === "preview"
                  ? "Resume Preview"
                  : "Resume Data"}
              </h2>
              <div className="flex items-center space-x-2">
                <Button
                  variant={rightPanelView === "preview" ? "default" : "outline"}
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

            <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {rightPanelView === "preview" ? (
                <PreviewPanel />
              ) : (
                <div className="p-6 h-full overflow-y-auto">
                  <ResumeDataDisplay resumeData={resumeData} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
