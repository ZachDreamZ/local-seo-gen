-- Add subscription fields to profiles
alter table profiles add column is_subscribed boolean default false;
alter table profiles add column stripe_customer_id text;
