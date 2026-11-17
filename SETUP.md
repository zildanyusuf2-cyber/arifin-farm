# Setup Supabase + GitHub + Vercel

## 1. Supabase (database + login admin)
1. Buat akun & project baru di supabase.com (pilih region terdekat, mis. Singapore).
2. SQL Editor > New query: tempel isi `supabase/schema.sql` > Run. Lalu `supabase/seed.sql` > Run.
3. Authentication > Users > Add user > Create new user: isi email & password admin (centang Auto Confirm).
4. Authentication > Sign In / Providers (atau Settings): **matikan "Allow new users to sign up"**,
   supaya orang lain tidak bisa mendaftar dan menjadi admin.
5. Project Settings > API: salin **Project URL** dan **anon public key**.

## 2. Coba lokal (opsional)
    cp .env.example .env.local   # isi URL dan anon key
    npm install
    npm run dev

## 3. GitHub
    git init && git add . && git commit -m "toko arifin farm"
    # buat repo kosong di GitHub, lalu:
    git remote add origin https://github.com/USERNAME/NAMA-REPO.git
    git branch -M main && git push -u origin main
`.env.local` sudah diabaikan git, jadi kunci tidak ikut ter-push.

## 4. Vercel
1. vercel.com > Add New > Project > import repo GitHub tadi.
2. Environment Variables: tambahkan `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY`.
3. Deploy. Setiap `git push` ke `main` akan otomatis deploy ulang.
4. Domain Hostinger: Vercel > Settings > Domains > Add, lalu ikuti petunjuk DNS di Hostinger.

## Catatan
- Anon key aman berada di frontend; yang melindungi data adalah aturan RLS di `schema.sql`.
  Jangan pernah memakai `service_role` key di project ini.
- Keranjang tetap di browser pelanggan (memang seharusnya). Pesanan masuk ke tabel `orders` dan
  tetap dikirim ke WhatsApp seperti sebelumnya.
