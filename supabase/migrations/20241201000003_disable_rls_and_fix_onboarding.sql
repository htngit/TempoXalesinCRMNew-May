-- Disable RLS on all tables for development
ALTER TABLE tenants DISABLE ROW LEVEL SECURITY;
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- Drop any existing policies
DROP POLICY IF EXISTS "Public access" ON tenants;
DROP POLICY IF EXISTS "Public access" ON users;
DROP POLICY IF EXISTS "Users can view own data" ON tenants;
DROP POLICY IF EXISTS "Users can view own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON tenants;
DROP POLICY IF EXISTS "Users can update own data" ON users;
DROP POLICY IF EXISTS "Users can insert own data" ON tenants;
DROP POLICY IF EXISTS "Users can insert own data" ON users;

-- Enable realtime for both tables
alter publication supabase_realtime add table tenants;
alter publication supabase_realtime add table users;
