export type WealthPersona = 'Novice' | 'Intermediate' | 'Professional' | 'Institutional';
export type RiskAppetite = 'Conservative' | 'Moderate' | 'Aggressive';
export type InvestmentGoal = 'Preservation' | 'Balanced Growth' | 'Hyper Growth';
export type WealthTier = 'Novice' | 'Novice-Plus' | 'Strategist' | 'Architect' | 'RICH';

export interface UserProfile {
  name: string;
  persona: WealthPersona;
  riskAppetite: RiskAppetite;
  goal: InvestmentGoal;
  knowledgeLevel: number; // 0 to 100
  currentTier: WealthTier;
  targetTier: 'RICH';
  experiencePoints: number; 
}

export const INITIAL_PROFILE: UserProfile = {
  name: 'Investor',
  persona: 'Intermediate',
  riskAppetite: 'Moderate',
  goal: 'Balanced Growth',
  knowledgeLevel: 45,
  currentTier: 'Novice',
  targetTier: 'RICH',
  experiencePoints: 1250,
};
