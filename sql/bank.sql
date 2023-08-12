--  Create bank table
-- DROP type if EXISTS transaction_type cascade;
-- create type transaction_type as enum ('dr', 'cr');

DROP TABLE IF EXISTS bank;
create table public.bank (
  id uuid not null DEFAULT gen_random_uuid(),
  details text,
  code text,
  amount integer,
  type transaction_type not null default 'dr',
  company_id uuid references company not null primary key,
  createdAt timestamp with time zone default timezone('utc'::text, now()),
  updatedAt timestamp (0),
  updatedBy text null
)

-- Allow users to select bank for company they can see
-- exists(select 1 from company where company.id = bank.company_id)
-- Allow users to insert into bank for the company they can see
-- exists(select 1 from company where company.id = bank.company_id and auth.uid()= in company.employee_ids)

-- update bank for the companies user can view
-- exists(select 1 from company where company.id = bank.company_id and auth.uid()= in company.employee_ids)

-- Delete bank for the companies user can view and superadmin
--  exists(select 1 from company where company.id = bank.company_id and auth.uid()= in company.employee_ids and user is superadmin)