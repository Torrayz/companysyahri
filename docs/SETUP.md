# Setup Guide
# Website Company Profile — CV. Prabaswara Gandar Prima

---

## Prerequisites

- Node.js 20+ (recommended: 22 LTS)
- npm 10+
- Git
- Akun Supabase (gratis)
- Akun Vercel (gratis)
- Akun GitHub

---

## 1. Clone & Install

```bash
git clone git@github.com:Torrayz/companysyahri.git
cd companysyahri
npm install
```

---

## 2. Setup Supabase

### 2.1 Buat Project Baru
1. Buka [supabase.com](https://supabase.com) → New Project
2. Pilih region: **Southeast Asia (Singapore)**
3. Set database password (simpan baik-baik)
4. Tunggu project selesai dibuat

### 2.2 Jalankan Migration
1. Buka Supabase Dashboard → SQL Editor
2. Copy-paste isi file `supabase/migrations/001_initial_schema.sql`
3. Klik **Run**
4. Ganti `admin@prabaswara.id` di RLS policies dengan email admin yang akan digunakan

### 2.3 Jalankan Seed Data
1. Di SQL Editor, copy-paste isi file `supabase/seed.sql`
2. Klik **Run**

### 2.4 Setup Storage
1. Buka Storage → New Bucket
2. Nama: `media`
3. Public bucket: **Yes**
4. Allowed MIME types: `image/jpeg, image/png, image/webp, image/svg+xml, application/pdf`
5. Max file size: `2MB`

### 2.5 Setup Auth
1. Buka Authentication → Users → Add User
2. Masukkan email admin (sama dengan yang di RLS policy)
3. Set password

### 2.6 Ambil Credentials
1. Buka Settings → API
2. Copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon/public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role key → `SUPABASE_SERVICE_ROLE_KEY`

---

## 3. Setup Environment

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=628xxxxxxxxxx
REVALIDATION_SECRET=random-string-here
```

---

## 4. Run Development

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

- Public website: `http://localhost:3000`
- Admin login: `http://localhost:3000/kelola-panel`

---

## 5. Deploy ke Vercel

### 5.1 Connect Repository
1. Buka [vercel.com](https://vercel.com) → New Project
2. Import dari GitHub: `Torrayz/companysyahri`
3. Framework: Next.js (auto-detected)

### 5.2 Set Environment Variables
Di Vercel dashboard → Settings → Environment Variables, tambahkan:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL` (ganti dengan URL Vercel production)
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `REVALIDATION_SECRET`

### 5.3 Deploy
Klik **Deploy**. Setiap push ke branch `main` akan auto-deploy.

---

## 6. Setup GitHub Actions (Keep-Alive)

Agar Supabase free tier tidak auto-pause:

1. Buka GitHub repo → Settings → Secrets and variables → Actions
2. Tambahkan secrets:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Workflow akan jalan otomatis setiap 5 hari

---

## Troubleshooting

| Masalah | Solusi |
|---------|--------|
| `Module not found` | Jalankan `npm install` ulang |
| Supabase connection error | Cek `.env.local` credentials |
| Admin tidak bisa login | Pastikan email di RLS policy sama dengan email di Auth |
| Gambar tidak muncul | Cek bucket `media` sudah public |
| Build error di Vercel | Cek environment variables sudah lengkap |

---

*Dokumen ini akan diperbarui seiring perkembangan proyek.*
