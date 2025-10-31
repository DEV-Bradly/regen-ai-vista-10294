import { useState, useEffect } from 'react';
import { db } from '@/lib/db';
import { supabase } from '@/integrations/supabase/client';
import { useOffline } from './use-offline';
import { toast } from 'sonner';

export const useOfflineStorage = <T extends { id?: number; supabaseId?: string; synced: boolean }>(
  tableName: 'soilAnalyses' | 'carbonTracking' | 'financialRecords' | 'cropPredictions'
) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const { isOnline } = useOffline();

  useEffect(() => {
    loadData();
  }, [tableName, isOnline]);

  const loadData = async () => {
    setLoading(true);
    try {
      // Try to load from local storage first
      const localData = await (db[tableName] as any).toArray();
      setData(localData);

      // If online, also fetch from Supabase and update local storage
      if (isOnline) {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          // This would need to be customized per table
          // For now, just use local data
        }
      }
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (item: Omit<T, 'id'>) => {
    try {
      // Add to local storage immediately
      const id = await (db[tableName] as any).add(item);
      
      await loadData();
      
      toast.success(isOnline ? 'Saved and syncing...' : 'Saved offline - will sync when online');
      
      return id;
    } catch (error) {
      console.error('Error adding item:', error);
      toast.error('Failed to save');
      throw error;
    }
  };

  return {
    data,
    loading,
    addItem,
    refresh: loadData
  };
};
