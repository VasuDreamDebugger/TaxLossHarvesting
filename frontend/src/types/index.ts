export interface Asset {
  id: string;
  symbol: string;
  name: string;
  shares: number;
  costBasis: number;
  currentPrice: number;
  unrealizedGainLoss: number;
  logo?: string;
}

export interface CapitalGains {
  shortTerm: number;
  longTerm: number;
}
