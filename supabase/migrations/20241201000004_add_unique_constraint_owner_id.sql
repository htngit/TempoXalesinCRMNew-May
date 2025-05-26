-- Add unique constraint on owner_id for tenants table
ALTER TABLE tenants ADD CONSTRAINT tenants_owner_id_unique UNIQUE (owner_id);

-- Enable realtime for tenants table
alter publication supabase_realtime add table tenants;
