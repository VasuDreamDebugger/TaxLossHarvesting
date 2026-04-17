import type { Asset, CapitalGains, TaxHarvestingResult } from '../types';

/**
 * Ensures very small floating point errors are treated as zero.
 */
export const sanitizeNumber = (val: number): number => {
  return Math.abs(val) < 1e-10 ? 0 : val;
};

/**
 * Calculates net gains: profits - losses.
 */
export const calculateNet = (profits: number, losses: number): number => {
  return sanitizeNumber(profits - losses);
};

/**
 * Core Tax Loss Harvesting Calculation Engine.
 * Does not mutate baseCapitalGains or holdings.
 */
export const computePostCapitalGains = (
  baseCapitalGains: CapitalGains,
  holdings: Asset[],
  selectedIds: string[]
): TaxHarvestingResult => {
  // 1. Clone base values
  const postStcg = { ...baseCapitalGains.stcg };
  const postLtcg = { ...baseCapitalGains.ltcg };

  // 2. Iterate and apply rules for selected assets
  holdings.forEach((asset) => {
    if (selectedIds.includes(asset.id)) {
      // Short-term rule
      const stcgGain = sanitizeNumber(asset.stcg.gain);
      if (stcgGain > 0) {
        postStcg.profits += stcgGain;
      } else if (stcgGain < 0) {
        postStcg.losses += Math.abs(stcgGain);
      }

      // Long-term rule
      const ltcgGain = sanitizeNumber(asset.ltcg.gain);
      if (ltcgGain > 0) {
        postLtcg.profits += ltcgGain;
      } else if (ltcgGain < 0) {
        postLtcg.losses += Math.abs(ltcgGain);
      }
    }
  });

  // Sanitize sums just in case of floating point buildup
  postStcg.profits = sanitizeNumber(postStcg.profits);
  postStcg.losses = sanitizeNumber(postStcg.losses);
  postLtcg.profits = sanitizeNumber(postLtcg.profits);
  postLtcg.losses = sanitizeNumber(postLtcg.losses);

  // 3. Compute Nets
  const preStcgNet = calculateNet(baseCapitalGains.stcg.profits, baseCapitalGains.stcg.losses);
  const preLtcgNet = calculateNet(baseCapitalGains.ltcg.profits, baseCapitalGains.ltcg.losses);
  const preTotalNet = sanitizeNumber(preStcgNet + preLtcgNet);

  const postStcgNet = calculateNet(postStcg.profits, postStcg.losses);
  const postLtcgNet = calculateNet(postLtcg.profits, postLtcg.losses);
  const postTotalNet = sanitizeNumber(postStcgNet + postLtcgNet);

  // 4. Savings Condition
  const isSaving = postTotalNet < preTotalNet;
  const savings = isSaving ? sanitizeNumber(preTotalNet - postTotalNet) : 0;

  return {
    preStcgNet,
    preLtcgNet,
    preTotalNet,
    postStcgNet,
    postLtcgNet,
    postTotalNet,
    savings,
    isSaving,
    postStcg,
    postLtcg,
  };
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    signDisplay: 'exceptZero',
  }).format(value);
};

/* 
 * UNIT-TEST-LIKE EXAMPLES:
 * 
 * const base = { stcg: { profits: 100, losses: 0 }, ltcg: { profits: 50, losses: 0 } };
 * const holdings = [
 *   { id: '1', stcg: { gain: -20 }, ltcg: { gain: 0 } }, // $20 ST loss
 *   { id: '2', stcg: { gain: 0 }, ltcg: { gain: -30 } }, // $30 LT loss
 *   { id: '3', stcg: { gain: 10 }, ltcg: { gain: 5 } }   // Ignored if not selected
 * ];
 * 
 * computePostCapitalGains(base, holdings, ['1', '2'])
 * 
 * Result:
 * postStcg.losses = 20
 * postLtcg.losses = 30
 * preTotalNet = 150
 * postTotalNet = (100-20) + (50-30) = 80 + 20 = 100
 * savings = 150 - 100 = 50
 * isSaving = true
 */
