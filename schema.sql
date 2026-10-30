-- Execute no SQL Editor do Supabase antes de publicar.
create table if not exists public.student_progress (
 user_id uuid primary key references auth.users(id) on delete cascade,
 display_name text not null default '',
 progress jsonb not null default '{}'::jsonb,
 xp integer not null default 0 check (xp >= 0),
 streak integer not null default 0 check (streak >= 0),
 last_day text not null default '',
 lab_used boolean not null default false,
 badges jsonb not null default '{}'::jsonb,
 updated_at timestamptz not null default now()
);
alter table public.student_progress enable row level security;
revoke all on public.student_progress from anon, authenticated;
grant select,insert,update on public.student_progress to authenticated;
create policy "Student reads own progress" on public.student_progress for select to authenticated using ((select auth.uid()) = user_id);
create policy "Student creates own progress" on public.student_progress for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Student updates own progress" on public.student_progress for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
