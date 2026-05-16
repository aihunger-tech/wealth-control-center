export type RiskLevel = 'Low' | 'Medium' | 'High';

export interface MarketStress {
  score: number; // 0 to 100
  label: 'Stable' | 'Volatile' | 'Extreme';
  recommendation: string;
}

export function calculateMarketStress(volatilityIndex: number): MarketStress {
  if (volatilityIndex < 20) {
    return {
      score: volatilityIndex,
      label: 'Stable',
      recommendation: 'Ideal for aggressive growth and strategic entries.',
    };
  } else if (volatilityIndex < 35) {
    return {
      score: volatilityIndex,
      label: 'Volatile',
      recommendation: 'Moderate risk. Use dollar-cost averaging to mitigate swings.',
    };
  } else {
    return {
      score: volatilityIndex,
      label: 'Extreme',
      recommendation: 'High risk. Priority should be capital preservation and hedging.',
    };
  }
}

export function adjustStrategyRisk(baseRisk: RiskLevel, stressScore: number): { 
  adjustedRisk: string; 
  isWarning: boolean;
} {
  if (stressScore > 30 && baseRisk === 'Medium') {
    return { adjustedRisk: 'High (Market Volatile)', isWarning: true };
  }
  if (stressScore > 20 && baseRisk === 'Low') {
    return { adjustedRisk: 'Medium (Market Volatile)', isWarning: true };
  }
  return { adjustedRisk: baseRisk, isWarning: false };
}
