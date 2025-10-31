import Dexie, { Table } from 'dexie';

export interface LocalSoilAnalysis {
  id?: number;
  supabaseId?: string;
  userId: string;
  soilType?: string;
  phLevel?: number;
  moistureContent?: number;
  organicMatter?: number;
  nitrogenLevel?: number;
  phosphorusLevel?: number;
  potassiumLevel?: number;
  locationLat?: number;
  locationLng?: number;
  imageUrl?: string;
  soilHealthScore?: number;
  recommendations?: string;
  aiInsights?: string;
  analysisDate: string;
  synced: boolean;
}

export interface LocalCarbonTracking {
  id?: number;
  supabaseId?: string;
  userId: string;
  carbonSequestered: number;
  carbonCredits?: number;
  creditValue?: number;
  areaSize?: number;
  treeCount?: number;
  vegetationType?: string;
  vegetationImprovementPercentage?: number;
  locationLat?: number;
  locationLng?: number;
  verified: boolean;
  notes?: string;
  measurementDate: string;
  synced: boolean;
}

export interface LocalFinancialRecord {
  id?: number;
  supabaseId?: string;
  userId: string;
  type: string;
  category: string;
  amount: number;
  description?: string;
  date: string;
  synced: boolean;
}

export interface LocalCropPrediction {
  id?: number;
  supabaseId?: string;
  userId: string;
  cropType?: string;
  region: string;
  season: string;
  meanTemp?: number;
  precipitationSum?: number;
  ndviMean?: number;
  soilOrganicCarbon?: number;
  predictedYield?: number;
  confidenceScore?: number;
  aiInsights?: string;
  createdAt: string;
  synced: boolean;
}

export class LandRegenDB extends Dexie {
  soilAnalyses!: Table<LocalSoilAnalysis>;
  carbonTracking!: Table<LocalCarbonTracking>;
  financialRecords!: Table<LocalFinancialRecord>;
  cropPredictions!: Table<LocalCropPrediction>;

  constructor() {
    super('LandRegenDB');
    this.version(1).stores({
      soilAnalyses: '++id, supabaseId, userId, analysisDate, [synced+userId]',
      carbonTracking: '++id, supabaseId, userId, measurementDate, [synced+userId]',
      financialRecords: '++id, supabaseId, userId, date, [synced+userId]',
      cropPredictions: '++id, supabaseId, userId, createdAt, [synced+userId]'
    });
  }
}

export const db = new LandRegenDB();
