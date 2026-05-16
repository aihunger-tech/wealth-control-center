'use client';
import { create } from 'zustand';
import { UserProfile, INITIAL_PROFILE, WealthTier } from '@/types/profile';

interface ProfileStore {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  increaseKnowledge: (amount: number) => void;
  addXP: (amount: number) => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  profile: INITIAL_PROFILE,
  updateProfile: (updates) => set((state) => ({
    profile: { ...state.profile, ...updates }
  })),
  increaseKnowledge: (amount) => set((state) => ({
    profile: { ...state.profile, knowledgeLevel: Math.min(100, state.profile.knowledgeLevel + amount) }
  })),
  addXP: (amount) => set((state) => {
    const newXP = state.profile.experiencePoints + amount;
    
    let nextTier: WealthTier = state.profile.currentTier;
    if (newXP >= 10000) nextTier = 'RICH';
    else if (newXP >= 5000) nextTier = 'Architect';
    else if (newXP >= 2500) nextTier = 'Strategist';
    else if (newXP >= 1000) nextTier = 'Novice-Plus';
    else nextTier = 'Novice';

    return {
      profile: { ...state.profile, experiencePoints: newXP, currentTier: nextTier }
    };
  }),
}));
