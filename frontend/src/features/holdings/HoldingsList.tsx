import { useStore } from '../../store/useStore';
import { AssetItem } from '../../components/AssetItem';
import { Card } from '../../components/Card';

export const HoldingsList = () => {
  const { holdings, selectedAssets, toggleAssetSelection } = useStore();

  return (
    <Card className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-text-primary">Portfolio Holdings</h2>
        <span className="text-sm text-text-secondary">{holdings.length} Assets</span>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
        {holdings.map((asset) => (
          <AssetItem 
            key={asset.id} 
            asset={asset} 
            isSelected={selectedAssets.includes(asset.id)}
            onToggle={toggleAssetSelection}
          />
        ))}
        {holdings.length === 0 && (
          <div className="text-center text-text-secondary py-10">
            No holdings found.
          </div>
        )}
      </div>
    </Card>
  );
};
