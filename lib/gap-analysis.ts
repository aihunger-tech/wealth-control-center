export interface AllocationGap {
  asset: string;
  currentPercent: number;
  targetPercent: number;
  gap: number;
  action: 'BUY' | 'SELL' | 'HOLD';
  suggestedAmount: number;
}

export function calculatePortfolioGap(
  currentAssets: any[], 
  targetAllocations: { asset: string, allocation: string }[]
): AllocationGap[] {
  // 1. Calculate Total Current Value using CURRENT prices if available
  const totalValue = currentAssets.reduce((sum, a) => sum + (a.amount * (a.currentPrice || a.averagePrice)), 0);
  if (totalValue === 0) return [];

  // 2. Map current concentrations
  const currentMap = new Map<string, number>();
  currentAssets.forEach(a => {
    const value = a.amount * (a.currentPrice || a.averagePrice);
    const percent = (value / totalValue) * 100;
    currentMap.set(a.symbol, percent);
  });

  // 3. Compare against target
  return targetAllocations.map(target => {
    const current = currentMap.get(target.asset) || 0;
    const targetPercent = parseInt(target.allocation);
    const gap = targetPercent - current;

    let action = 'HOLD';
    if (gap > 5) action = 'BUY';
    else if (gap < -5) action = 'SELL';

    // Calculate exactly how much USD to buy/sell to hit the target %
    // Target قيمة = TotalValue * (targetPercent / 100)
    // Suggested Action = Target قيمة - Current قيمة
    const currentVal = (totalValue * (current / 100));
    const targetVal = (totalValue * (targetPercent / 100));
    const suggestedAmount = targetVal - currentVal;

    return {
      asset: target.asset,
      currentPercent: current,
      targetPercent,
      gap,
      action,
      suggestedAmount
    };
  });
}

export function calculatePortfolioGap(
  currentAssets: any[], 
  targetAllocations: { asset: string, allocation: string }[]
): AllocationGap[] {
  // 1. Calculate Total Current Value
  const totalValue = currentAssets.reduce((sum, a) => sum + (a.amount * a.averagePrice), 0);
  if (totalValue === 0) return [];

  // 2. Map current concentrations
  const currentMap = new Map<string, number>();
  currentAssets.forEach(a => {
    const value = a.amount * a.averagePrice;
    const percent = (value / totalValue) * 100;
    currentMap.set(a.symbol, percent);
  });

  // 3. Compare against target
  return targetAllocations.map(target => {
    const current = currentMap.get(target.asset) || 0;
    const targetPercent = parseInt(target.allocation);
    const gap = targetPercent - current;

    let action = 'HOLD';
    if (gap > 5) action = 'BUY';
    else if (gap < -5) action = 'SELL';

    return {
      asset: target.asset,
      currentPercent,
      targetPercent,
      gap,
      action
    };
  });
}
