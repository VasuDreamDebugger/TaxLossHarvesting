import { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import { fetchHoldings, fetchCapitalGains } from '../services/api';

export const useInitializeData = () => {
  const { setHoldings, setBaseCapitalGains } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [holdingsData, gainsData] = await Promise.all([
          fetchHoldings(),
          fetchCapitalGains(),
        ]);
        
        setHoldings(holdingsData);
        setBaseCapitalGains(gainsData);
        setError(null);
      } catch (err) {
        setError('Failed to load portfolio data. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [setHoldings, setBaseCapitalGains]);

  return { isLoading, error };
};
