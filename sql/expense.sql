--  Create expense table
DROP type if EXISTS transaction_type cascade;
create type transaction_type as enum ('dr', 'cr');

DROP TABLE IF EXISTS expense cascade;
create table public.expense (
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