--  Create stock table
DROP TABLE IF EXISTS stock cascade;
create table public.stock (
  id uuid not null DEFAULT gen_random_uuid() primary key,
  item text not null,
  code text not null,
  price integer not null,
  quantity integer not null,
  selling_price integer not null,
  quantity_sold integer,
  company_id uuid references company not null,
  createdAt timestamp with time zone default timezone('utc'::text, now()) not null,
  updatedAt timestamp (0),
  updatedBy text null
)

-- - Enable RLS for table stock
ALTER TABLE stock ENABLE ROW LEVEL SECURITY;
-- select
CREATE POLICY "Users can select data for company they are associated with" ON "public"."stock"
AS PERMISSIVE FOR SELECT
TO public
USING (exists(select 1 from company where company.id = stock.company_id));
-- insert
CREATE POLICY "Users can insert data for company they are associated with" ON "public"."stock"
AS PERMISSIVE FOR INSERT
TO public
WITH CHECK (exists(select 1 from company where company.id = stock.company_id));