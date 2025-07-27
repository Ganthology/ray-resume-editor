"use client";

import { ProfileData, initialProfileData } from '../data/entity/ProfileData';
import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";

interface ProfileStore {
  profileData: ProfileData;
  updatePersonalInfo: (personalInfo: Partial<ProfileData['personalInfo']>) => void;
  updatePreferences: (preferences: Partial<ProfileData['preferences']>) => void;
  clearProfile: () => void;
  loadProfile: (data: ProfileData) => void;
}

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      profileData: initialProfileData,

      updatePersonalInfo: (personalInfo) =>
        set((state) => ({
          profileData: {
            ...state.profileData,
            personalInfo: {
              ...state.profileData.personalInfo,
              ...personalInfo,
            },
            lastUpdated: new Date(),
          },
        })),

      updatePreferences: (preferences) =>
        set((state) => ({
          profileData: {
            ...state.profileData,
            preferences: {
              ...state.profileData.preferences,
              ...preferences,
            },
            lastUpdated: new Date(),
          },
        })),

      clearProfile: () =>
        set(() => ({
          profileData: initialProfileData,
        })),

      loadProfile: (data) =>
        set(() => ({
          profileData: data,
        })),
    }),
    {
      name: "profile-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);