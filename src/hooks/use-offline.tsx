import { useState, useEffect } from 'react';

export const useOffline = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [hasUnsynced, setHasUnsynced] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check for unsynced data periodically
    const checkUnsyncedData = async () => {
      try {
        const { db } = await import('@/lib/db');
        const unsynced = await db.soilAnalyses.filter(item => !item.synced).count() +
                        await db.carbonTracking.filter(item => !item.synced).count() +
                        await db.financialRecords.filter(item => !item.synced).count() +
                        await db.cropPredictions.filter(item => !item.synced).count();
        setHasUnsynced(unsynced > 0);
      } catch (error) {
        console.error('Error checking unsynced data:', error);
      }
    };

    checkUnsyncedData();
    const interval = setInterval(checkUnsyncedData, 5000); // Check every 5 seconds

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, []);

  return { isOnline, hasUnsynced };
};
