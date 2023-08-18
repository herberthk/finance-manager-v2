--  Create bank table
-- DROP type if EXISTS transaction_type cascade;
-- create type transaction_type as enum ('dr', 'cr');

DROP TABLE IF EXISTS bank;
create table public.bank (
  id uuid not null DEFAULT gen_random_uuid() primary key,
  details text not null,
  code text not null,
  amount integer not null,
  type transaction_type not null default 'dr',
  company_id uuid references company not null,
  createdAt timestamp with time zone default timezone('utc'::text, now()) not null,
  updatedAt timestamp (0),
  updatedBy text null
);

-- Enable RLS for table bank
ALTER TABLE bank
  ENABLE ROW LEVEL SECURITY;
-- Allow users to select bank for company they can see
CREATE POLICY "Users can select bank data for company they are associated with" ON "public"."bank"
AS PERMISSIVE FOR SELECT
TO public
USING (exists( select 1 from company where company.id = bank.company_id ));
-- Allow users to insert into bank for the company they can see
CREATE POLICY "Users can insert bank data for company they are associated with" ON "public"."bank"
AS PERMISSIVE FOR INSERT
TO public
WITH CHECK (exists(select 1 from company where company.id = bank.company_id));
-- update bank for the companies user can view
-- exists(select 1 from company where company.id = bank.company_id and auth.uid()= in company.employee_ids)

-- Delete bank for the companies user can view and superadmin
--  exists(select 1 from company where company.id = bank.company_id and auth.uid()= in company.employee_ids and user is superadmin)