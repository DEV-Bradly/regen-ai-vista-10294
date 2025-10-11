-- Fix function search path security issue
ALTER FUNCTION public.handle_updated_at() SET search_path = public;