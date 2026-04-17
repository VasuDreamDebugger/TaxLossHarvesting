import { Header } from '../../components/Header';
import { InfoBanner } from '../../components/InfoBanner';
import { PrePostCards } from '../../components/PrePostCards';
import { HoldingsTable } from '../../components/HoldingsTable';
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
        <div className="bg-white border border-loss p-6 rounded-xl max-w-md text-center shadow-sm">
          <h2 className="text-loss text-lg font-bold mb-2">Error Loading Data</h2>
          <p className="text-text-secondary">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto pb-12">
      <Header />
      <InfoBanner />
      <PrePostCards />
      <HoldingsTable />
    </div>
  );
};
