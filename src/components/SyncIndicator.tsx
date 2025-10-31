import { useEffect, useState } from 'react';
import { Cloud, CloudOff, RefreshCw, AlertCircle } from 'lucide-react';
import { useOffline } from '@/hooks/use-offline';
import { SyncService } from '@/lib/sync-service';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export const SyncIndicator = () => {
  const { isOnline, hasUnsynced } = useOffline();
  const [syncing, setSyncing] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id || null);
    };
    getUser();
  }, []);

  useEffect(() => {
    if (isOnline && hasUnsynced && userId) {
      handleSync();
    }
  }, [isOnline, hasUnsynced, userId]);

  const handleSync = async () => {
    if (!userId) return;
    
    setSyncing(true);
    const result = await SyncService.syncAll(userId);
    setSyncing(false);

    if (result.success) {
      toast.success('Data synced successfully');
    } else if (result.error) {
      toast.error(`Sync failed: ${result.error}`);
    }
  };

  if (!isOnline) {
    return (
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-yellow-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-full shadow-lg">
        <CloudOff className="w-4 h-4" />
        <span className="text-sm font-medium">Offline Mode</span>
      </div>
    );
  }

  if (hasUnsynced) {
    return (
      <Button
        onClick={handleSync}
        disabled={syncing}
        className="fixed bottom-4 right-4 z-50 shadow-lg"
        size="sm"
      >
        {syncing ? (
          <>
            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            Syncing...
          </>
        ) : (
          <>
            <AlertCircle className="w-4 h-4 mr-2" />
            Sync Data
          </>
        )}
      </Button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-green-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-full shadow-lg">
      <Cloud className="w-4 h-4" />
      <span className="text-sm font-medium">Online & Synced</span>
    </div>
  );
};
