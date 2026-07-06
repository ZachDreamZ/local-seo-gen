-- 1. Profiles table
-- Extends Supabase Auth users
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- 2. Templates table
-- Stores the HTML/Markdown content with placeholders like {{city}}
create table templates (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  name text not null,
  content text not null, -- The template body
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- 3. City Lists table
-- A campaign can have many cities
create table city_lists (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Cities table
-- Individual city data linked to a list
create table cities (
  id uuid default gen_random_uuid() primary key,
  list_id uuid references city_lists(id) on delete cascade not null,
  city_name text not null,
  state_name text,
  slug text not null, -- e.g. 'plumbing-services-new-york'
  custom_data jsonb default '{}'::jsonb, -- For extra variables like {{local_phone}}
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(list_id, slug)
);

-- 5. Generated Pages table
-- Maps a template to a specific city in a list
create table generated_pages (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  template_id uuid references templates(id) on delete cascade not null,
  city_id uuid references cities(id) on delete cascade not null,
  slug text not null unique,
  is_published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Setup RLS
alter table profiles enable row level security;
alter table templates enable row level security;
alter table city_lists enable row level security;
alter table cities enable row level security;
alter table generated_pages enable row level security;

-- Policies
create policy "Public profiles are viewable by everyone." on profiles for select using ( true );
create policy "Users can update own profile." on profiles for update using ( auth.uid() = id );

create policy "Users can manage their own templates." on templates 
  for all using ( auth.uid() = user_id );

create policy "Users can manage their own city lists." on city_lists 
  for all using ( auth.uid() = user_id );

create policy "Users can manage cities in their lists." on cities 
  for all using ( 
    exists (
      select 1 from city_lists 
      where city_lists.id = cities.list_id 
      and city_lists.user_id = auth.uid()
    )
  );

create policy "Users can manage their own generated pages." on generated_pages 
  for all using ( auth.uid() = user_id );

create policy "Public pages are viewable by everyone." on generated_pages 
  for select using ( is_published = true );

-- Trigger for updated_at
create or replace function update_modified_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language 'plpgsql';

create trigger update_templates_modtime before update on templates for each row execute procedure update_modified_column();
create trigger update_generated_pages_modtime before update on generated_pages for each row execute procedure update_modified_column();
