export function simulateScenario(assets: any[], scenario: 'bull' | 'bear' | 'stagnant') {
  const multipliers: Record<string, number> = {
    bull: {
      crypto: 1.5,
      stock: 1.2,
      cash: 1.0,
      gold: 1.1
    },
    bear: {
      crypto: 0.5,
      stock: 0.8,
      cash: 1.0,
      gold: 1.3
    },
    stagnant: {
      crypto: 0.9,
      stock: 1.0,
      cash: 1.0,
      gold: 1.05
    }
  };

  return assets.map(asset => {
    const type = asset.type || 'stock';
    const multiplier = multipliers[scenario][type] || 1.0;
    return {
      ...asset,
      simulatedPrice: asset.currentPrice * multiplier,
      simulatedChange: (multiplier - 1) * 100
    };
  });
}
