// hooks/usePersonalization.ts
import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

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

  const identity = useMemo((): UserIdentity => {
    const persona = searchParams.get('persona') ?? 'Guest';
    const tier = searchParams.get('tier') ?? 'Unknown';
    const weakness = searchParams.get('weakness') ?? 'General Optimization';
    const score = searchParams.get('score');
    const gap = searchParams.get('gap');

    const isPersonalized = searchParams.get('persona') !== null && searchParams.get('tier') !== null;

    return {
      persona,
      tier,
      weakness,
      score: Number(score) || 0,
      gap: Number(gap) || 0,
      isPersonalized,
    };
  }, [searchParams]);

  return identity;
}
