import { CapitalGainsSummary } from './CapitalGainsSummary';
import { HoldingsList } from '../holdings/HoldingsList';
import { useInitializeData } from '../../hooks/useInitializeData';
import { Loader2 } from 'lucide-react';

export const Dashboard = () => {
  const { isLoading, error } = useInitializeData();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary-start mx-auto" />
          <p className="text-text-secondary">Loading portfolio data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-card border border-loss p-6 rounded-xl max-w-md text-center">
          <h2 className="text-loss text-lg font-bold mb-2">Error Loading Data</h2>
          <p className="text-text-secondary">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
      <div className="lg:col-span-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Tax Loss Harvesting</h1>
          <p className="text-text-secondary">
            Select underwater assets to offset your capital gains and reduce your tax liability.
          </p>
        </div>
        <CapitalGainsSummary />
      </div>
      <div className="lg:col-span-4 h-[600px] lg:h-auto">
        <HoldingsList />
      </div>
    </div>
  );
};
