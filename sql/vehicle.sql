--  Create vehicle table
DROP type if EXISTS transaction_type cascade;
create type transaction_type as enum ('dr', 'cr');

DROP TABLE IF EXISTS vehicle cascade;
DROP TABLE IF EXISTS vehicle;
create table public.vehicle (
  id uuid not null DEFAULT gen_random_uuid() primary key,
  details text not null,
  code text not null,
  amount integer not null,
  sold boolean not null default false,
  type transaction_type not null default 'dr',
  company_id uuid references company not null,
  createdAt timestamp with time zone default timezone('utc'::text, now()) not null,
  updatedAt timestamp (0),
  updatedBy text null
);

-- Enable RLS for table vehicle
ALTER TABLE vehicle
  ENABLE ROW LEVEL SECURITY;
-- select
CREATE POLICY "Users can select data for company they are associated with" ON "public"."vehicle"
AS PERMISSIVE FOR SELECT
TO public
USING (exists(select 1 from company where company.id = vehicle.company_id));

-- insert
CREATE POLICY "Users can insert data for company they are associated with" ON "public"."vehicle"
AS PERMISSIVE FOR INSERT
TO public

WITH CHECK (exists(select 1 from company where company.id = vehicle.company_id))