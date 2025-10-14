export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      carbon_tracking: {
        Row: {
          area_size: number | null
          carbon_credits: number | null
          carbon_sequestered: number
          created_at: string | null
          credit_value: number | null
          id: string
          location_lat: number | null
          location_lng: number | null
          measurement_date: string | null
          notes: string | null
          tree_count: number | null
          user_id: string
          vegetation_improvement_percentage: number | null
          vegetation_type: string | null
          verified: boolean | null
        }
        Insert: {
          area_size?: number | null
          carbon_credits?: number | null
          carbon_sequestered: number
          created_at?: string | null
          credit_value?: number | null
          id?: string
          location_lat?: number | null
          location_lng?: number | null
          measurement_date?: string | null
          notes?: string | null
          tree_count?: number | null
          user_id: string
          vegetation_improvement_percentage?: number | null
          vegetation_type?: string | null
          verified?: boolean | null
        }
        Update: {
          area_size?: number | null
          carbon_credits?: number | null
          carbon_sequestered?: number
          created_at?: string | null
          credit_value?: number | null
          id?: string
          location_lat?: number | null
          location_lng?: number | null
          measurement_date?: string | null
          notes?: string | null
          tree_count?: number | null
          user_id?: string
          vegetation_improvement_percentage?: number | null
          vegetation_type?: string | null
          verified?: boolean | null
        }
        Relationships: []
      }
      crop_predictions: {
        Row: {
          ai_insights: string | null
          confidence_score: number | null
          created_at: string | null
          crop_type: string | null
          id: string
          mean_temp: number | null
          ndvi_mean: number | null
          precipitation_sum: number | null
          predicted_yield: number | null
          region: string
          season: string
          soil_organic_carbon: number | null
          user_id: string
        }
        Insert: {
          ai_insights?: string | null
          confidence_score?: number | null
          created_at?: string | null
          crop_type?: string | null
          id?: string
          mean_temp?: number | null
          ndvi_mean?: number | null
          precipitation_sum?: number | null
          predicted_yield?: number | null
          region: string
          season: string
          soil_organic_carbon?: number | null
          user_id: string
        }
        Update: {
          ai_insights?: string | null
          confidence_score?: number | null
          created_at?: string | null
          crop_type?: string | null
          id?: string
          mean_temp?: number | null
          ndvi_mean?: number | null
          precipitation_sum?: number | null
          predicted_yield?: number | null
          region?: string
          season?: string
          soil_organic_carbon?: number | null
          user_id?: string
        }
        Relationships: []
      }
      financial_records: {
        Row: {
          amount: number
          category: string
          created_at: string | null
          date: string | null
          description: string | null
          id: string
          type: string
          user_id: string
        }
        Insert: {
          amount: number
          category: string
          created_at?: string | null
          date?: string | null
          description?: string | null
          id?: string
          type: string
          user_id: string
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string | null
          date?: string | null
          description?: string | null
          id?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          first_name: string
          id: string
          land_size: number | null
          last_name: string
          phone_number: string
          region: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email: string
          first_name: string
          id?: string
          land_size?: number | null
          last_name: string
          phone_number: string
          region: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          email?: string
          first_name?: string
          id?: string
          land_size?: number | null
          last_name?: string
          phone_number?: string
          region?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      soil_analyses: {
        Row: {
          ai_insights: string | null
          analysis_date: string | null
          created_at: string | null
          id: string
          image_url: string | null
          location_lat: number | null
          location_lng: number | null
          moisture_content: number | null
          nitrogen_level: number | null
          organic_matter: number | null
          ph_level: number | null
          phosphorus_level: number | null
          potassium_level: number | null
          recommendations: string | null
          restoration_recommendations: Json | null
          soil_health_score: number | null
          soil_type: string | null
          user_id: string
        }
        Insert: {
          ai_insights?: string | null
          analysis_date?: string | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          location_lat?: number | null
          location_lng?: number | null
          moisture_content?: number | null
          nitrogen_level?: number | null
          organic_matter?: number | null
          ph_level?: number | null
          phosphorus_level?: number | null
          potassium_level?: number | null
          recommendations?: string | null
          restoration_recommendations?: Json | null
          soil_health_score?: number | null
          soil_type?: string | null
          user_id: string
        }
        Update: {
          ai_insights?: string | null
          analysis_date?: string | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          location_lat?: number | null
          location_lng?: number | null
          moisture_content?: number | null
          nitrogen_level?: number | null
          organic_matter?: number | null
          ph_level?: number | null
          phosphorus_level?: number | null
          potassium_level?: number | null
          recommendations?: string | null
          restoration_recommendations?: Json | null
          soil_health_score?: number | null
          soil_type?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          created_at: string | null
          crop_recommendations: boolean | null
          email_notifications: boolean | null
          id: string
          theme: string | null
          updated_at: string | null
          user_id: string
          weather_alerts: boolean | null
        }
        Insert: {
          created_at?: string | null
          crop_recommendations?: boolean | null
          email_notifications?: boolean | null
          id?: string
          theme?: string | null
          updated_at?: string | null
          user_id: string
          weather_alerts?: boolean | null
        }
        Update: {
          created_at?: string | null
          crop_recommendations?: boolean | null
          email_notifications?: boolean | null
          id?: string
          theme?: string | null
          updated_at?: string | null
          user_id?: string
          weather_alerts?: boolean | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
