'use client';
import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useProfileStore } from './useProfileStore';
import { UserProfile } from '@/types/profile';

export interface UserIdentity {
  persona: string;
  tier: string;
  weakness: string;
  score: number;
  gap: number;
  isPersonalized: boolean;
}

export function usePersonalization() {
  const searchParams = useSearchParams();
  const { profile } = useProfileStore();

  const identity = useMemo((): UserIdentity => {
    // Priority 1: Use Profile Store (The "Wealth DNA" settings)
    // Priority 2: Fallback to URL params for demo purposes
    const persona = profile.persona || searchParams.get('persona') || 'Guest';
    const tier = profile.currentTier || searchParams.get('tier') || 'Unknown';
    const weakness = searchParams.get('weakness') || 'General Optimization';
    const score = searchParams.get('score');
    const gap = searchParams.get('gap');

    const isPersonalized = !!profile.persona || (searchParams.get('persona') !== null && searchParams.get('tier') !== null);

    return {
      persona,
      tier,
      weakness,
      score: Number(score) || 0,
      gap: Number(gap) || 0,
      isPersonalized,
    };
  }, [searchParams, profile]);

  return identity;
}
