import type { Asset } from '../types';
import { formatCurrency } from '../utils/calculations';

interface AssetItemProps {
  asset: Asset;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

export const AssetItem = ({ asset, isSelected, onToggle }: AssetItemProps) => {
  const isLoss = asset.unrealizedGainLoss < 0;

  return (
    <div 
      className={`p-4 rounded-lg flex items-center justify-between cursor-pointer transition-colors border ${isSelected ? 'border-primary-start bg-gray-800/50' : 'border-gray-800 bg-card hover:bg-gray-800/30'}`}
      onClick={() => onToggle(asset.id)}
    >
      <div className="flex items-center space-x-4">
        <input 
          type="checkbox" 
          checked={isSelected} 
          onChange={() => onToggle(asset.id)}
          className="w-5 h-5 rounded border-gray-700 bg-gray-900 text-primary-start focus:ring-primary-start focus:ring-offset-background"
          disabled={!isLoss}
          onClick={(e) => e.stopPropagation()}
        />
        {asset.logo ? (
          <img src={asset.logo} alt={asset.symbol} className="w-8 h-8 rounded-full bg-white p-0.5" />
        ) : null}
        <div>
          <h4 className="font-semibold text-text-primary">{asset.symbol}</h4>
          <p className="text-sm text-text-secondary">{asset.name}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-medium text-text-primary">{formatCurrency(asset.currentPrice * asset.shares)}</p>
        <p className={`text-sm font-medium ${isLoss ? 'text-loss' : 'text-profit'}`}>
          {isLoss ? '' : '+'}{formatCurrency(asset.unrealizedGainLoss)}
        </p>
      </div>
    </div>
  );
};
