import { useMemo } from 'react';
import { useStore } from '../store/useStore';
import { computePostCapitalGains, formatCurrency, formatCurrencyExact } from '../utils/calculations';

export const PrePostCards = () => {
  const { baseCapitalGains, holdings, selectedAssets } = useStore();

  const results = useMemo(() => {
    return computePostCapitalGains(baseCapitalGains, holdings, selectedAssets);
  }, [baseCapitalGains, holdings, selectedAssets]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Pre Harvesting Card */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-lg font-bold text-text-primary mb-6">Pre Harvesting</h2>
        
        <div className="grid grid-cols-3 gap-y-4 text-sm mb-6">
          <div className="col-span-1"></div>
          <div className="col-span-1 text-right text-text-secondary font-medium">Short-term</div>
          <div className="col-span-1 text-right text-text-secondary font-medium">Long-term</div>

          <div className="col-span-1 text-text-primary font-medium">Profits</div>
          <div className="col-span-1 text-right text-text-primary font-medium" title={`Exact: ${baseCapitalGains.stcg.profits}`}>{formatCurrency(baseCapitalGains.stcg.profits)}</div>
          <div className="col-span-1 text-right text-text-primary font-medium" title={`Exact: ${baseCapitalGains.ltcg.profits}`}>{formatCurrency(baseCapitalGains.ltcg.profits)}</div>

          <div className="col-span-1 text-text-primary font-medium">Losses</div>
          <div className="col-span-1 text-right text-text-primary font-medium" title={`Exact: ${-baseCapitalGains.stcg.losses}`}>{formatCurrency(-baseCapitalGains.stcg.losses)}</div>
          <div className="col-span-1 text-right text-text-primary font-medium" title={`Exact: ${-baseCapitalGains.ltcg.losses}`}>{formatCurrency(-baseCapitalGains.ltcg.losses)}</div>

          <div className="col-span-1 text-text-primary font-bold pt-2">Net Capital Gains</div>
          <div className="col-span-1 text-right text-text-primary font-bold pt-2" title={`Exact: ${results.preStcgNet}`}>{formatCurrency(results.preStcgNet)}</div>
          <div className="col-span-1 text-right text-text-primary font-bold pt-2" title={`Exact: ${results.preLtcgNet}`}>{formatCurrency(results.preLtcgNet)}</div>
        </div>

        <div className="flex items-center space-x-3 pt-6 border-t border-transparent">
          <span className="text-base font-bold text-text-primary">Realised Capital Gains:</span>
          <span className="text-2xl font-bold text-text-primary" title={`Exact: ${results.preTotalNet}`}>{formatCurrencyExact(results.preTotalNet)}</span>
        </div>
      </div>

      {/* After Harvesting Card */}
      <div className="bg-gradient-to-br from-[#1A73E8] to-[#1A73E8] bg-[#1A73E8] rounded-xl p-6 shadow-sm border-none text-white relative">
        <h2 className="text-lg font-bold mb-6">After Harvesting</h2>
        
        <div className="grid grid-cols-3 gap-y-4 text-sm mb-6 opacity-95">
          <div className="col-span-1"></div>
          <div className="col-span-1 text-right font-medium">Short-term</div>
          <div className="col-span-1 text-right font-medium">Long-term</div>

          <div className="col-span-1 font-medium">Profits</div>
          <div className="col-span-1 text-right font-medium" title={`Exact: ${results.postStcg.profits}`}>{formatCurrency(results.postStcg.profits)}</div>
          <div className="col-span-1 text-right font-medium" title={`Exact: ${results.postLtcg.profits}`}>{formatCurrency(results.postLtcg.profits)}</div>

          <div className="col-span-1 font-medium">Losses</div>
          <div className="col-span-1 text-right font-medium" title={`Exact: ${-results.postStcg.losses}`}>{formatCurrency(-results.postStcg.losses)}</div>
          <div className="col-span-1 text-right font-medium" title={`Exact: ${-results.postLtcg.losses}`}>{formatCurrency(-results.postLtcg.losses)}</div>

          <div className="col-span-1 font-bold pt-2">Net Capital Gains</div>
          <div className="col-span-1 text-right font-bold pt-2" title={`Exact: ${results.postStcgNet}`}>{formatCurrency(results.postStcgNet)}</div>
          <div className="col-span-1 text-right font-bold pt-2" title={`Exact: ${results.postLtcgNet}`}>{formatCurrency(results.postLtcgNet)}</div>
        </div>

        <div className="flex flex-col space-y-4 pt-6 border-t border-transparent">
          <div className="flex items-center space-x-3">
            <span className="text-base font-bold">Effective Capital Gains:</span>
            <span className="text-2xl font-bold" title={`Exact: ${results.postTotalNet}`}>{formatCurrencyExact(results.postTotalNet)}</span>
          </div>
          {results.isSaving && (
            <div className="text-sm font-medium opacity-90" title={`Exact Savings: ${results.savings}`}>
              🎉 You are going to save upto <span className="font-bold ml-1">{formatCurrency(results.savings)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
