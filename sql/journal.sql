--  Create journal table
DROP type if EXISTS transaction_type cascade;
create type transaction_type as enum ('dr', 'cr');

DROP TABLE IF EXISTS journal cascade;
create table public.journal (
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

-- Enable RLS for table journal
ALTER TABLE journal ENABLE ROW LEVEL SECURITY;
-- select
CREATE POLICY "Users can select data for company they are associated with" ON "public"."journal"
AS PERMISSIVE FOR SELECT
TO public
USING (exists(select 1 from company where company.id = journal.company_id));
-- insert
CREATE POLICY "Users can insert data for company they are associated with" ON "public"."journal"
AS PERMISSIVE FOR INSERT
TO public
WITH CHECK (exists(select 1 from company where company.id = journal.company_id));
