--  Create stock table
DROP TABLE IF EXISTS stock cascade;
create table public.stock (
  id uuid not null DEFAULT gen_random_uuid(),
  item text,
  code text,
  price integer,
  quantity integer,
  selling_price integer,
  quantity_sold integer,
  company_id uuid references company not null primary key,
  createdAt timestamp with time zone default timezone('utc'::text, now()),
  updatedAt timestamp (0),
  updatedBy text null
)