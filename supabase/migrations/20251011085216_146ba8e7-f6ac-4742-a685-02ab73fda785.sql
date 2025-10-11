-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  region TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create trigger to update updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Create soil_analyses table
CREATE TABLE public.soil_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  location_lat DOUBLE PRECISION,
  location_lng DOUBLE PRECISION,
  soil_type TEXT,
  ph_level NUMERIC,
  nitrogen_level NUMERIC,
  phosphorus_level NUMERIC,
  potassium_level NUMERIC,
  organic_matter NUMERIC,
  moisture_content NUMERIC,
  analysis_date TIMESTAMPTZ DEFAULT NOW(),
  recommendations TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.soil_analyses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own analyses"
  ON public.soil_analyses FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create analyses"
  ON public.soil_analyses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create carbon_tracking table
CREATE TABLE public.carbon_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  location_lat DOUBLE PRECISION,
  location_lng DOUBLE PRECISION,
  carbon_sequestered NUMERIC NOT NULL,
  area_size NUMERIC,
  measurement_date TIMESTAMPTZ DEFAULT NOW(),
  tree_count INTEGER,
  vegetation_type TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.carbon_tracking ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own carbon data"
  ON public.carbon_tracking FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create carbon data"
  ON public.carbon_tracking FOR INSERT
  WITH CHECK (auth.uid() = user_id);