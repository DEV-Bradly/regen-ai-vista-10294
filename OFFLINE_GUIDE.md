# Offline-First Architecture Guide

## Overview

landRegen now features a **hybrid offline-first architecture** that combines local SQLite-like storage (Dexie.js/IndexedDB) with cloud backup through Lovable Cloud. This means the app works perfectly even without internet connection, making it ideal for field work in remote areas.

## Key Features

### 🔹 Full Offline Functionality
- All core features work without internet
- Soil analysis, carbon tracking, financial records, and crop predictions
- Data saved instantly to local device storage

### 🔹 Automatic Cloud Sync
- When online, data automatically syncs to Lovable Cloud (Supabase)
- Background synchronization with conflict resolution
- Visual indicator shows sync status

### 🔹 Smart Data Management
- Local-first: Reads from device storage instantly (fast)
- Cloud backup: Ensures data never lost
- Multi-device: Sync across devices when online

## Technical Architecture

### Local Storage Layer (Dexie.js)
```typescript
// Database schema in src/lib/db.ts
- soilAnalyses: Soil health analysis records
- carbonTracking: Carbon sequestration data
- financialRecords: Income and expense tracking
- cropPredictions: AI-powered crop yield forecasts
```

### Sync Service (src/lib/sync-service.ts)
- Automatically syncs unsynced records when online
- Handles bidirectional sync with Supabase
- Maintains data consistency across devices

### Offline Detection (src/hooks/use-offline.tsx)
- Real-time online/offline detection
- Tracks unsynced data count
- Triggers auto-sync when connection restored

## User Experience

### Visual Indicators

**Online & Synced**
```
🟢 Online & Synced - Green badge (bottom right)
```

**Offline Mode**
```
🟡 Offline Mode - Yellow badge (bottom right)
```

**Has Unsynced Data**
```
🔴 Sync Data Button - Appears when data needs syncing
```

## For Developers

### Using Offline Storage in Components

```typescript
import { db } from '@/lib/db';
import { useOffline } from '@/hooks/use-offline';

// Save data offline
await db.soilAnalyses.add({
  userId: user.id,
  soilType: 'Clay',
  phLevel: 6.5,
  analysisDate: new Date().toISOString(),
  synced: false // Mark as not yet synced
});

// Check if online
const { isOnline, hasUnsynced } = useOffline();
```

### Manual Sync Trigger

```typescript
import { SyncService } from '@/lib/sync-service';

const result = await SyncService.syncAll(userId);
if (result.success) {
  console.log('Data synced successfully');
}
```

## Benefits

1. **Field Work Ready**: Use app anywhere, even in areas with no cell coverage
2. **Instant Performance**: No waiting for network requests
3. **Data Safety**: Local copy + cloud backup = double protection
4. **Cost Efficient**: Reduces unnecessary API calls
5. **Better UX**: App feels fast and responsive

## Future Enhancements

- [ ] Service Worker for true PWA offline support
- [ ] Background sync API integration
- [ ] Conflict resolution UI for simultaneous edits
- [ ] Offline asset caching (images, maps)
- [ ] Export/import local database

---

**Note**: This offline system uses IndexedDB through Dexie.js, which provides SQLite-like functionality in the browser while maintaining full cloud integration with Lovable Cloud.
