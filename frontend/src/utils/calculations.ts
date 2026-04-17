import type { Asset, CapitalGains } from '../types';

/**
 * Pure function to calculate total derived capital gains based on 
 * base gains and the currently selected assets for harvesting.
 */
export const calculateHarvestedGains = (
  baseGains: CapitalGains,
  holdings: Asset[],
  selectedIds: string[]
): CapitalGains => {
  const harvestedLosses = holdings
    .filter((asset) => selectedIds.includes(asset.id) && asset.unrealizedGainLoss < 0)
    .reduce((total, asset) => total + asset.unrealizedGainLoss, 0);

  let remainingLoss = Math.abs(harvestedLosses);
  
  let newShortTerm = baseGains.shortTerm;
  if (newShortTerm > 0) {
    if (remainingLoss >= newShortTerm) {
      remainingLoss -= newShortTerm;
      newShortTerm = 0;
    } else {
      newShortTerm -= remainingLoss;
      remainingLoss = 0;
    }
  }

  let newLongTerm = baseGains.longTerm;
  if (newLongTerm > 0 && remainingLoss > 0) {
    if (remainingLoss >= newLongTerm) {
      remainingLoss -= newLongTerm;
      newLongTerm = 0;
    } else {
      newLongTerm -= remainingLoss;
      remainingLoss = 0;
    }
  }

  return {
    shortTerm: newShortTerm,
    longTerm: newLongTerm - remainingLoss,
  };
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    signDisplay: 'exceptZero',
  }).format(value);
};
