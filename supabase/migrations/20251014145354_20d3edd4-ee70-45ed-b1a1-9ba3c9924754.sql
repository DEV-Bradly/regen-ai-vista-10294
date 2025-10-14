-- Add land_size to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS land_size NUMERIC;

-- Update soil_analyses table for enhanced features
ALTER TABLE public.soil_analyses
ADD COLUMN IF NOT EXISTS image_url TEXT,
ADD COLUMN IF NOT EXISTS soil_health_score NUMERIC CHECK (soil_health_score >= 0 AND soil_health_score <= 100),
ADD COLUMN IF NOT EXISTS restoration_recommendations JSONB,
ADD COLUMN IF NOT EXISTS ai_insights TEXT;

-- Update carbon_tracking table for credits
ALTER TABLE public.carbon_tracking
ADD COLUMN IF NOT EXISTS carbon_credits NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS credit_value NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS verified BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS vegetation_improvement_percentage NUMERIC;

-- Create financial_records table
CREATE TABLE IF NOT EXISTS public.financial_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  amount NUMERIC NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.financial_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own financial records"
ON public.financial_records FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own financial records"
ON public.financial_records FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own financial records"
ON public.financial_records FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own financial records"
ON public.financial_records FOR DELETE
USING (auth.uid() = user_id);

-- Create user_preferences table
CREATE TABLE IF NOT EXISTS public.user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email_notifications BOOLEAN DEFAULT true,
  weather_alerts BOOLEAN DEFAULT true,
  crop_recommendations BOOLEAN DEFAULT true,
  theme TEXT DEFAULT 'light' CHECK (theme IN ('light', 'dark')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own preferences"
ON public.user_preferences FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences"
ON public.user_preferences FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences"
ON public.user_preferences FOR UPDATE
USING (auth.uid() = user_id);

-- Create crop_predictions table
CREATE TABLE IF NOT EXISTS public.crop_predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  region TEXT NOT NULL,
  season TEXT NOT NULL,
  precipitation_sum NUMERIC,
  mean_temp NUMERIC,
  ndvi_mean NUMERIC,
  soil_organic_carbon NUMERIC,
  predicted_yield NUMERIC,
  crop_type TEXT,
  confidence_score NUMERIC,
  ai_insights TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.crop_predictions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own predictions"
ON public.crop_predictions FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own predictions"
ON public.crop_predictions FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create storage bucket for soil images
INSERT INTO storage.buckets (id, name, public)
VALUES ('soil-images', 'soil-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for soil images
CREATE POLICY "Users can upload own soil images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'soil-images' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Anyone can view soil images"
ON storage.objects FOR SELECT
USING (bucket_id = 'soil-images');

CREATE POLICY "Users can update own soil images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'soil-images' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete own soil images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'soil-images' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Add trigger for user_preferences updated_at
CREATE TRIGGER update_user_preferences_updated_at
BEFORE UPDATE ON public.user_preferences
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();