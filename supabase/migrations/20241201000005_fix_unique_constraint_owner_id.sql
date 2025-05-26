-- First, remove any duplicate records if they exist
DELETE FROM tenants a USING tenants b 
WHERE a.id > b.id AND a.owner_id = b.owner_id;

-- Drop the constraint if it exists (in case previous migration partially succeeded)
ALTER TABLE tenants DROP CONSTRAINT IF EXISTS tenants_owner_id_unique;

-- Add unique constraint on owner_id for tenants table
ALTER TABLE tenants ADD CONSTRAINT tenants_owner_id_unique UNIQUE (owner_id);

-- Enable realtime for tenants table (only if not already enabled)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' 
        AND tablename = 'tenants'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE tenants;
    END IF;
END $$;
