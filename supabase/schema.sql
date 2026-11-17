-- Jalankan di Supabase: SQL Editor > New query > Run
create table if not exists public.products (
  id          bigint primary key,
  name        text not null,
  category    text not null,
  wood_type   text,
  price       numeric(14,2) not null,
  unit        text,
  grade       text,
  stock       integer not null default 0,
  image       text,
  description text,
  dimensions  text,
  created_at  timestamptz not null default now()
);

create table if not exists public.orders (
  id               text primary key,
  date_label       text,
  customer_name    text not null,
  customer_phone   text not null,
  customer_address text not null,
  notes            text default '',
  items            jsonb not null,
  total_price      numeric(14,2) not null,
  status           text not null default 'Pending',
  created_at       timestamptz not null default now()
);

alter table public.products enable row level security;
alter table public.orders   enable row level security;

-- Produk: semua orang boleh melihat; hanya admin (user yang login) boleh mengubah
create policy "produk_dibaca_publik" on public.products for select using (true);
create policy "produk_tambah_admin"  on public.products for insert to authenticated with check (true);
create policy "produk_ubah_admin"    on public.products for update to authenticated using (true) with check (true);
create policy "produk_hapus_admin"   on public.products for delete to authenticated using (true);

-- Pesanan: pengunjung boleh membuat pesanan (status harus Pending), tapi hanya admin yang boleh membaca/mengubah
create policy "pesanan_dibuat_publik" on public.orders for insert to anon, authenticated
  with check (status = 'Pending' and jsonb_typeof(items) = 'array');
create policy "pesanan_dibaca_admin"  on public.orders for select to authenticated using (true);
create policy "pesanan_ubah_admin"    on public.orders for update to authenticated using (true) with check (true);
