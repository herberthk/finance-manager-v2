--  Create company table
-- DROP type if EXISTS account_status cascade;
-- create type account_status as enum ('active', 'suspended', 'deleted');

DROP TABLE IF EXISTS company cascade;
create table public.company (
  name text,
  email text null,
  description text null,
  location text null,
  account_number text null,
  status account_status not null default 'active',
  employee_ids text[] not null default array[]::text[],
  assets text[] not null default array[]::text[],
  log text null,
  phone text null,
  id uuid not null primary key DEFAULT gen_random_uuid(),
  createdAt timestamp with time zone default timezone('utc'::text, now()),
  updatedAt timestamp (0),
  updatedBy text null
);

-- Social links table
DROP TABLE IF EXISTS social cascade;
CREATE TABLE public.social (
    id uuid not null DEFAULT gen_random_uuid(),
    name text,
    company_id uuid references company not null primary key,
    createdAt timestamp with time zone default timezone('utc'::text, now()),
    updatedAt timestamp (0),
    updatedBy text null
)

-- Select
CREATE POLICY "User can select data  for the company is associate with" ON "public"."company"
AS PERMISSIVE FOR SELECT
TO public
USING (auth.uid() in employee_ids)

-- select * from mytable where 'Journal'=ANY(pub_types);
-- SELECT * FROM mytable WHERE pub_types && '{"Journal", "Book"}';