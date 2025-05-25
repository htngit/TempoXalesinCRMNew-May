ALTER TABLE public.tenants ADD COLUMN IF NOT EXISTS onboarding_complete boolean DEFAULT false;

UPDATE public.tenants SET onboarding_complete = false WHERE onboarding_complete IS NULL;
