# Changelog

## Status: MVP Ready (belum deploy)

### Yang Sudah Selesai

**Public Website:**
- Beranda (hero, layanan, cara kerja, kenapa pilih kami, client marquee, CTA)
- Profil (banner, tentang kami, visi, misi)
- Layanan (card grid dari database, CTA WhatsApp)
- Portfolio (grid + filter kategori + detail page + sidebar related)
- Legalitas (list dokumen + download)
- Kontak (form + Google Maps + info kontak)
- Navbar responsive (hamburger mobile + dark mode toggle)
- Footer (navigasi, layanan, kontak, jam operasional)
- WhatsApp floating button
- Back to top button
- Scroll reveal animations
- SEO (JSON-LD, sitemap, meta tags)
- Dark mode

**Admin Panel (`/kelola-panel`):**
- Login (Supabase Auth)
- Dashboard (stats + quick actions)
- Kelola Layanan (CRUD)
- Kelola Portfolio (CRUD + upload gambar)
- Kelola Legalitas (CRUD + upload dokumen)
- Kelola Profil (edit semua info perusahaan)
- Kelola Konten (klien marquee, kenapa pilih kami, cara kerja, pengaturan site)
- Media (gallery + download + delete dengan warning)
- Pesan Masuk (baca detail + hapus + balas via email)
- Dark mode toggle

**Teknis:**
- Next.js 16.2 + Turbopack
- Tailwind CSS v4
- Supabase (PostgreSQL + Auth + Storage)
- ESLint configured
- Git workflow: feature branches + merge to main

### Belum Dikerjakan (Fase 4)
- Deploy ke Vercel
- Multi-bahasa (ID/EN)
- Blog/artikel
- Katalog produk ATK
- Email notification
- PWA

### Catatan Setup
- Migration SQL: `supabase/migrations/001_complete_schema.sql`
- Seed data: `supabase/seed.sql`
- Environment: `.env.local.example`
- Admin login: `/kelola-panel`
