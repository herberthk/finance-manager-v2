--  Create company table
-- DROP type if EXISTS account_status cascade;
-- create type account_status as enum ('active', 'suspended', 'deleted');

DROP TABLE IF EXISTS company cascade;
create table public.company (
  name text unique not null,
  email text null,
  description text not null,
  location text null,
  account_number text null,
  status account_status not null default 'active',
  employee_ids uuid[] not null default array[]::uuid[],
  assets text[] not null default array[]::text[],
  log text null,
  phone text null,
  id uuid not null primary key DEFAULT gen_random_uuid(),
  createdAt timestamp with time zone default timezone('utc'::text, now()) not null,
  social_links jsonb not null
  updatedAt timestamp (0),
  updatedBy text null
);

-- Enable RLS for table company
ALTER TABLE company
  ENABLE ROW LEVEL SECURITY;

-- Select
CREATE POLICY "User can select data  for the company is associate with" ON "public"."company"
AS PERMISSIVE FOR SELECT
TO public
USING (auth.uid() = ANY (employee_ids))

-- Insert into company
CREATE POLICY "User can insert data  for the company is associate with" ON "public"."company"
AS PERMISSIVE FOR INSERT
TO public

WITH CHECK (auth.uid() = ANY (employee_ids))