"use client";

import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";
import { ResumeData } from "@/modules/resume/data/entity/ResumeData";
import { initialResumeData } from "./resumeStore";

interface ChatStore {
  // Separate resume data for chat product
  chatResumeData: ResumeData;
  
  // Chat-specific actions
  updateChatResume: (resumeData: ResumeData) => void;
  clearChatResume: () => void;
  loadChatResumeFromJSON: (jsonData: ResumeData) => void;
  
  // Export to main resume builder (for upgrade flow)
  exportToMainBuilder: () => ResumeData;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      chatResumeData: { ...initialResumeData },

      updateChatResume: (resumeData) =>
        set(() => ({
          chatResumeData: resumeData,
        })),

      clearChatResume: () =>
        set(() => ({
          chatResumeData: { ...initialResumeData },
        })),

      loadChatResumeFromJSON: (jsonData) =>
        set(() => ({
          chatResumeData: jsonData,
        })),

      exportToMainBuilder: () => {
        return get().chatResumeData;
      },
    }),
    {
      name: "chat-resume-store", // Different localStorage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);