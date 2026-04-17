export interface AssetGains {
  balance: number;
  gain: number;
}

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  shares: number;
  costBasis: number;
  currentPrice: number;
  stcg: AssetGains;
  ltcg: AssetGains;
  unrealizedGainLoss: number;
  logo?: string;
}

export interface CapitalGainsCategory {
  profits: number;
  losses: number;
}

export interface CapitalGains {
  stcg: CapitalGainsCategory;
  ltcg: CapitalGainsCategory;
}

export interface TaxHarvestingResult {
  preStcgNet: number;
  preLtcgNet: number;
  preTotalNet: number;
  
  postStcgNet: number;
  postLtcgNet: number;
  postTotalNet: number;
  
  savings: number;
  isSaving: boolean;
  
  postStcg: CapitalGainsCategory;
  postLtcg: CapitalGainsCategory;
}
