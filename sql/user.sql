-- create users table
-- DROP type if EXISTS account_status cascade;
-- create type account_status as enum ('active', 'suspended', 'deleted');

DROP TABLE IF EXISTS users cascade;
create table public.users (
  id uuid not null DEFAULT gen_random_uuid(),
  name text null,
  status account_status not null default 'active',
  admin boolean default false,
  moderator boolean default false,
  super_admin boolean default false,
  user_id uuid references auth.users not null primary key,
  createdAt timestamp with time zone default timezone('utc'::text, now()),
  last_login timestamp with time zone default timezone('utc'::text, now())
);

-- Function
DROP FUNCTION IF EXISTS handle_create_user cascade;
create or replace function public.handle_create_user() 
returns trigger as $$
begin
  insert into public.users (user_id, email, admin, moderator)
  values (
    new.id, 
    new.email,
    true,
    true
    )
  ON CONFLICT (user_id) 
  DO 
    UPDATE SET email = new.email;
  return new;
end;
$$ language plpgsql security definer;

-- create a trigger
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
    execute procedure public.handle_create_user();


alter table users
  enable row level security;
CREATE POLICY "Can view own user data" ON "public"."users"
AS PERMISSIVE FOR SELECT
TO public
USING (auth.uid() = user_id with check (auth.uid() = user_id));

CREATE POLICY "Can update own user data" ON "public"."users"
AS PERMISSIVE FOR UPDATE
TO public
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "User can insert there own data " ON "public"."users"
AS PERMISSIVE FOR INSERT
TO public

WITH CHECK (auth.uid() = user_id)

