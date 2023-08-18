--  Create capital table
-- DROP type if EXISTS transaction_type cascade;
-- create type transaction_type as enum ('dr', 'cr');

DROP TABLE IF EXISTS capital;
create table public.capital (
  id uuid not null DEFAULT gen_random_uuid() primary key,
  details text not null,
  code text not null,
  amount integer not null,
  type transaction_type not null default 'cr',
  company_id uuid references company not null,
  createdAt timestamp with time zone default timezone('utc'::text, now()) not null,
  updatedAt timestamp (0),
  updatedBy text null
);

-- - Enable RLS for table capital
ALTER TABLE capital
  ENABLE ROW LEVEL SECURITY;
-- select
CREATE POLICY "Users can select data for company they are associated with" ON "public"."capital"
AS PERMISSIVE FOR SELECT
TO public
USING (exists(select 1 from company where company.id = capital.company_id));
-- insert
CREATE POLICY "Users can insert data for company they are associated with" ON "public"."capital"
AS PERMISSIVE FOR INSERT
TO public
WITH CHECK (EXISTS ( SELECT 1 FROM company WHERE company.id = capital.company_id));