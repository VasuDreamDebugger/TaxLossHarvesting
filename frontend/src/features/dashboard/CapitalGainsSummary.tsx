import { useMemo } from 'react';
import { useStore } from '../../store/useStore';
import { Card } from '../../components/Card';
import { computePostCapitalGains, formatCurrency } from '../../utils/calculations';
import { TrendingDown, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

export const CapitalGainsSummary = () => {
  const { baseCapitalGains, holdings, selectedAssets } = useStore();

  const results = useMemo(() => {
    return computePostCapitalGains(baseCapitalGains, holdings, selectedAssets);
  }, [baseCapitalGains, holdings, selectedAssets]);

  return (
    <div className="space-y-6">
      <Card variant="blue" className="text-white relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-lg font-medium opacity-90 mb-2">Estimated Tax Saved</h2>
          <div className="text-4xl font-bold mb-4">{formatCurrency(results.savings)}</div>
          <p className="text-sm opacity-80 flex items-center">
            {results.isSaving ? (
              <><CheckCircle className="w-4 h-4 mr-1 inline" /> You are reducing your tax liability!</>
            ) : (
              <><AlertCircle className="w-4 h-4 mr-1 inline" /> Based on selected losses to harvest</>
            )}
          </p>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-text-secondary font-medium mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-loss" /> 
            Realised Capital Gains (Pre)
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-800">
              <span className="text-text-primary">Short Term Net</span>
              <span className="font-semibold">{formatCurrency(results.preStcgNet)}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-800">
              <span className="text-text-primary">Long Term Net</span>
              <span className="font-semibold">{formatCurrency(results.preLtcgNet)}</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-text-secondary">Total Pre</span>
              <span className="font-bold text-lg">{formatCurrency(results.preTotalNet)}</span>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-text-secondary font-medium mb-4 flex items-center">
            <TrendingDown className="w-5 h-5 mr-2 text-profit" />
            Effective Capital Gains (Post)
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-800">
              <span className="text-text-primary">Short Term Net</span>
              <span className="font-semibold text-profit">{formatCurrency(results.postStcgNet)}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-800">
              <span className="text-text-primary">Long Term Net</span>
              <span className="font-semibold text-profit">{formatCurrency(results.postLtcgNet)}</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-text-secondary">Total Post</span>
              <span className="font-bold text-lg text-profit">{formatCurrency(results.postTotalNet)}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Detail Breakdown for absolute losses requested by user rules */}
      <Card>
         <h3 className="text-text-secondary font-medium mb-4">Detailed Breakdown (Losses shown absolute)</h3>
         <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <p className="font-medium text-text-primary mb-2 border-b border-gray-800 pb-1">Short Term</p>
              <div className="flex justify-between text-text-secondary py-1"><span>Profits:</span> <span className="text-profit">{formatCurrency(results.postStcg.profits)}</span></div>
              <div className="flex justify-between text-text-secondary py-1"><span>Losses:</span> <span className="text-loss">{formatCurrency(results.postStcg.losses)}</span></div>
            </div>
            <div>
              <p className="font-medium text-text-primary mb-2 border-b border-gray-800 pb-1">Long Term</p>
              <div className="flex justify-between text-text-secondary py-1"><span>Profits:</span> <span className="text-profit">{formatCurrency(results.postLtcg.profits)}</span></div>
              <div className="flex justify-between text-text-secondary py-1"><span>Losses:</span> <span className="text-loss">{formatCurrency(results.postLtcg.losses)}</span></div>
            </div>
         </div>
      </Card>
    </div>
  );
};
