import { useMemo } from 'react';
import { useStore } from '../../store/useStore';
import { Card } from '../../components/Card';
import { calculateHarvestedGains, formatCurrency } from '../../utils/calculations';
import { TrendingDown, TrendingUp, AlertCircle } from 'lucide-react';

export const CapitalGainsSummary = () => {
  const { baseCapitalGains, holdings, selectedAssets } = useStore();

  // Pure function execution inside useMemo to avoid recalculation on every render
  const projectedGains = useMemo(() => {
    return calculateHarvestedGains(baseCapitalGains, holdings, selectedAssets);
  }, [baseCapitalGains, holdings, selectedAssets]);

  const totalBaseGains = baseCapitalGains.shortTerm + baseCapitalGains.longTerm;
  const totalProjectedGains = projectedGains.shortTerm + projectedGains.longTerm;
  const taxSaved = totalBaseGains - totalProjectedGains;

  return (
    <div className="space-y-6">
      <Card variant="blue" className="text-white">
        <h2 className="text-lg font-medium opacity-90 mb-2">Estimated Tax Saved</h2>
        <div className="text-4xl font-bold mb-4">{formatCurrency(taxSaved)}</div>
        <p className="text-sm opacity-80 flex items-center">
          <AlertCircle className="w-4 h-4 mr-1 inline" />
          Based on selected losses to harvest
        </p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-text-secondary font-medium mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-loss" /> 
            Current Capital Gains
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-800">
              <span className="text-text-primary">Short Term</span>
              <span className="font-semibold">{formatCurrency(baseCapitalGains.shortTerm)}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-800">
              <span className="text-text-primary">Long Term</span>
              <span className="font-semibold">{formatCurrency(baseCapitalGains.longTerm)}</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-text-secondary">Total</span>
              <span className="font-bold text-lg">{formatCurrency(totalBaseGains)}</span>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-text-secondary font-medium mb-4 flex items-center">
            <TrendingDown className="w-5 h-5 mr-2 text-profit" />
            Projected After Harvesting
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-800">
              <span className="text-text-primary">Short Term</span>
              <span className="font-semibold text-profit">{formatCurrency(projectedGains.shortTerm)}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-800">
              <span className="text-text-primary">Long Term</span>
              <span className="font-semibold text-profit">{formatCurrency(projectedGains.longTerm)}</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-text-secondary">Total</span>
              <span className="font-bold text-lg text-profit">{formatCurrency(totalProjectedGains)}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
