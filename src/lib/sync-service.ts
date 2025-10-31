import { supabase } from '@/integrations/supabase/client';
import { db } from './db';
import type { 
  LocalSoilAnalysis, 
  LocalCarbonTracking, 
  LocalFinancialRecord,
  LocalCropPrediction 
} from './db';

export class SyncService {
  private static syncInProgress = false;

  static async syncAll(userId: string): Promise<{ success: boolean; error?: string }> {
    if (!navigator.onLine) {
      return { success: false, error: 'No internet connection' };
    }

    if (this.syncInProgress) {
      return { success: false, error: 'Sync already in progress' };
    }

    this.syncInProgress = true;

    try {
      await Promise.all([
        this.syncSoilAnalyses(userId),
        this.syncCarbonTracking(userId),
        this.syncFinancialRecords(userId),
        this.syncCropPredictions(userId)
      ]);

      return { success: true };
    } catch (error) {
      console.error('Sync error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Sync failed' };
    } finally {
      this.syncInProgress = false;
    }
  }

  private static async syncSoilAnalyses(userId: string) {
    const unsynced = await db.soilAnalyses
      .filter(item => !item.synced && item.userId === userId)
      .toArray();

    for (const item of unsynced) {
      try {
        const { data, error } = await supabase
          .from('soil_analyses')
          .insert({
            user_id: item.userId,
            soil_type: item.soilType,
            ph_level: item.phLevel,
            moisture_content: item.moistureContent,
            organic_matter: item.organicMatter,
            nitrogen_level: item.nitrogenLevel,
            phosphorus_level: item.phosphorusLevel,
            potassium_level: item.potassiumLevel,
            location_lat: item.locationLat,
            location_lng: item.locationLng,
            image_url: item.imageUrl,
            soil_health_score: item.soilHealthScore,
            recommendations: item.recommendations,
            ai_insights: item.aiInsights,
            analysis_date: item.analysisDate
          })
          .select()
          .single();

        if (error) throw error;

        if (data && item.id) {
          await db.soilAnalyses.update(item.id, {
            supabaseId: data.id,
            synced: true
          });
        }
      } catch (error) {
        console.error('Error syncing soil analysis:', error);
      }
    }
  }

  private static async syncCarbonTracking(userId: string) {
    const unsynced = await db.carbonTracking
      .filter(item => !item.synced && item.userId === userId)
      .toArray();

    for (const item of unsynced) {
      try {
        const { data, error } = await supabase
          .from('carbon_tracking')
          .insert({
            user_id: item.userId,
            carbon_sequestered: item.carbonSequestered,
            carbon_credits: item.carbonCredits,
            credit_value: item.creditValue,
            area_size: item.areaSize,
            tree_count: item.treeCount,
            vegetation_type: item.vegetationType,
            vegetation_improvement_percentage: item.vegetationImprovementPercentage,
            location_lat: item.locationLat,
            location_lng: item.locationLng,
            verified: item.verified,
            notes: item.notes,
            measurement_date: item.measurementDate
          })
          .select()
          .single();

        if (error) throw error;

        if (data && item.id) {
          await db.carbonTracking.update(item.id, {
            supabaseId: data.id,
            synced: true
          });
        }
      } catch (error) {
        console.error('Error syncing carbon tracking:', error);
      }
    }
  }

  private static async syncFinancialRecords(userId: string) {
    const unsynced = await db.financialRecords
      .filter(item => !item.synced && item.userId === userId)
      .toArray();

    for (const item of unsynced) {
      try {
        const { data, error } = await supabase
          .from('financial_records')
          .insert({
            user_id: item.userId,
            type: item.type,
            category: item.category,
            amount: item.amount,
            description: item.description,
            date: item.date
          })
          .select()
          .single();

        if (error) throw error;

        if (data && item.id) {
          await db.financialRecords.update(item.id, {
            supabaseId: data.id,
            synced: true
          });
        }
      } catch (error) {
        console.error('Error syncing financial record:', error);
      }
    }
  }

  private static async syncCropPredictions(userId: string) {
    const unsynced = await db.cropPredictions
      .filter(item => !item.synced && item.userId === userId)
      .toArray();

    for (const item of unsynced) {
      try {
        const { data, error } = await supabase
          .from('crop_predictions')
          .insert({
            user_id: item.userId,
            crop_type: item.cropType,
            region: item.region,
            season: item.season,
            mean_temp: item.meanTemp,
            precipitation_sum: item.precipitationSum,
            ndvi_mean: item.ndviMean,
            soil_organic_carbon: item.soilOrganicCarbon,
            predicted_yield: item.predictedYield,
            confidence_score: item.confidenceScore,
            ai_insights: item.aiInsights
          })
          .select()
          .single();

        if (error) throw error;

        if (data && item.id) {
          await db.cropPredictions.update(item.id, {
            supabaseId: data.id,
            synced: true
          });
        }
      } catch (error) {
        console.error('Error syncing crop prediction:', error);
      }
    }
  }
}
