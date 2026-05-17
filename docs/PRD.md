# Product Requirements Document (PRD)
# Website Company Profile — CV. Prabaswara Gandar Prima

---

## 1. Informasi Umum

| Item | Detail |
|------|--------|
| Nama Proyek | Website Company Profile CV. Prabaswara Gandar Prima |
| Versi Dokumen | 1.1 |
| Tanggal | 14 Mei 2026 (Updated) |
| Pemilik Proyek | CV. Prabaswara Gandar Prima |
| Status | In Development |

---

## 2. Ringkasan Eksekutif

Website company profile untuk CV. Prabaswara Gandar Prima — perusahaan yang bergerak di bidang pengadaan barang & jasa kantor, konsumsi event, pembuatan website & aplikasi, serta pengadaan ATK. Website ini bertujuan sebagai representasi digital perusahaan yang profesional, modern, dan informatif untuk menarik mitra bisnis potensial.

---

## 3. Latar Belakang

CV. Prabaswara Gandar Prima adalah perusahaan yang baru berdiri di tahun 2026, berlokasi di Sudimara Selatan, Ciledug, Kota Tangerang, Banten. Dengan tim inti 2 orang, perusahaan membutuhkan kehadiran digital yang kuat untuk membangun kredibilitas dan menjangkau target audiens (instansi pemerintah, perusahaan swasta/B2B, dan UMKM).

**Tagline:** *"Sinergi Kebutuhan Bisnis dan Inovasi Digital"*

---

## 4. Tujuan & Sasaran

### 4.1 Tujuan Bisnis
- Membangun kredibilitas dan kepercayaan mitra bisnis melalui kehadiran digital profesional
- Mempermudah calon klien menemukan informasi layanan perusahaan
- Menyediakan channel komunikasi langsung (WhatsApp & form kontak)
- Menampilkan portfolio sebagai bukti kapabilitas

### 4.2 Sasaran Terukur (KPI)
| KPI | Target (6 bulan pertama) |
|-----|--------------------------|
| Website live & accessible | 100% uptime |
| Page load speed | < 3 detik |
| Mobile responsive | Score > 90 (Lighthouse) |
| SEO Score | > 80 (Lighthouse) |
| Inquiry via form/WhatsApp | Minimal 5/bulan |

---

## 5. Target Audiens

| Segmen | Kebutuhan |
|--------|-----------|
| Instansi Pemerintah | Vendor pengadaan barang/jasa terpercaya |
| Perusahaan Swasta (B2B) | Partner pengadaan & solusi digital |
| UMKM Berkembang | Layanan digital & kebutuhan kantor terjangkau |

---

## 6. Visi & Misi Perusahaan

### Visi
Menjadi perusahaan penyedia barang dan jasa yang inovatif, terpercaya, dan mampu memberikan nilai tambah bagi mitra bisnis di Indonesia.

### Misi
1. Menyediakan produk dan layanan berkualitas dalam bidang pengadaan kebutuhan kantor dan konsumsi event.
2. Memberikan solusi teknologi digital melalui pengembangan website dan aplikasi yang modern, efektif, dan sesuai kebutuhan klien.
3. Membangun hubungan kerja jangka panjang dengan mitra melalui pelayanan yang profesional, responsif, dan tepat waktu.

---

## 7. Layanan Perusahaan

| No | Layanan | Deskripsi |
|----|---------|-----------|
| 1 | Pengadaan ATK | Alat tulis kantor lengkap untuk kebutuhan operasional |
| 2 | Pengadaan IT Hardware & Elektronik | Perangkat komputer, printer, networking, dll |
| 3 | Furniture Kantor Modular | Meja, kursi, lemari, partisi kantor |
| 4 | Konsumsi Event | Catering fleksibel untuk corporate, pemerintahan, swasta, UMKM |
| 5 | Pembuatan Website & Aplikasi | Solusi digital modern dan custom sesuai kebutuhan |

---

## 8. Scope & Fitur

### 8.1 Public Website (Frontend)

#### A. Home / Hero Section
- Hero banner dengan tagline perusahaan
- CTA (Call to Action) menuju halaman layanan atau kontak
- Highlight singkat layanan utama
- Animasi subtle/smooth (fade-in, scroll reveal)

#### B. Profil Perusahaan
- Deskripsi singkat perusahaan
- Tahun berdiri, lokasi
- Nilai-nilai perusahaan

#### C. Visi & Misi
- Tampilan visi dan misi yang clean dan mudah dibaca

#### D. Layanan
- Card/grid layout untuk setiap layanan
- Ikon representatif per layanan
- Deskripsi singkat masing-masing layanan

#### E. Portfolio / Showcase
- Grid/masonry layout
- Filter berdasarkan kategori layanan
- Detail proyek (gambar, deskripsi, klien jika diizinkan)

#### F. Legalitas Perusahaan
- Informasi legalitas (NIB, NPWP, akta pendirian, dll)
- Menampilkan bahwa perusahaan terdaftar resmi

#### G. Kontak
- Alamat: Sudimara Selatan, Ciledug, Kota Tangerang, Banten
- Nomor telepon / WhatsApp
- Email
- Google Maps embed (lokasi kantor)
- Form kontak (nama, email, subjek, pesan)

#### H. Komponen Global
- Navbar responsive (hamburger menu di mobile)
- Footer (info perusahaan, quick links, sosial media)
- Floating WhatsApp button
- Back to top button
- SEO meta tags per halaman
- Open Graph tags untuk social sharing

### 8.2 Admin Dashboard (CMS)

#### A. Autentikasi
- Login admin (route tersembunyi: `/kelola-panel`)
- Session management via Supabase Auth
- Tidak ada link ke admin dari public website

#### B. Dashboard
- Overview statistik (jumlah portfolio, pesan masuk, dll)
- Quick actions

#### C. Kelola Konten
| Modul | Fitur |
|-------|-------|
| Profil Perusahaan | Edit deskripsi, alamat, kontak |
| Layanan | CRUD layanan (judul, deskripsi, ikon/gambar) |
| Portfolio | CRUD portfolio (judul, deskripsi, gambar, kategori) |
| Legalitas | CRUD dokumen legalitas |
| Kontak | Edit info kontak, nomor WA, email |
| Logo & Gambar | Upload/ganti logo, hero image, dll |
| Pesan Masuk | Lihat & kelola pesan dari form kontak (read, delete) |

---

## 9. Non-Functional Requirements

### 9.1 Performa
- First Contentful Paint (FCP): < 1.2 detik
- Largest Contentful Paint (LCP): < 2.0 detik
- Interaction to Next Paint (INP): < 150ms
- Cumulative Layout Shift (CLS): < 0.05
- Total bundle size: < 150KB (first load JS)
- Image optimization: WebP/AVIF dengan lazy loading

### 9.2 Responsivitas
- Breakpoints: Mobile (< 768px), Tablet (768-1024px), Desktop (> 1024px)
- Mobile-first approach

### 9.3 SEO
- Server-side rendering (SSR) / Static Site Generation (SSG) via `"use cache"`
- Semantic HTML
- Dynamic sitemap generation (via `sitemap.ts`) & robots.txt
- Structured data (JSON-LD) untuk Organization, LocalBusiness, Service, BreadcrumbList
- Meta title & description per halaman
- Canonical URLs
- Open Graph tags untuk social sharing

### 9.4 Keamanan
- HTTPS (otomatis via Vercel)
- Input sanitization pada form
- Rate limiting pada form submission (3x/jam) dan admin login (5x/15menit)
- Row Level Security (RLS) pada Supabase — locked ke email admin spesifik
- Admin route tidak terekspos di sitemap
- Security Headers (CSP, HSTS, X-Frame-Options, X-Content-Type-Options)
- `supabase.auth.getUser()` untuk server-side validation (bukan `getSession()`)

### 9.5 Aksesibilitas
- WCAG 2.1 Level AA compliance
- Keyboard navigable
- Alt text pada semua gambar
- Contrast ratio memadai

---

## 10. Tech Stack

| Layer | Teknologi | Alasan |
|-------|-----------|--------|
| Framework | Next.js 16 (App Router) | SSR/SSG, performa, SEO optimal, Turbopack default |
| React | React 19.2 | React Compiler (auto-memoize), View Transitions |
| Styling | Tailwind CSS v4 | CSS-first config, Lightning CSS engine (5x lebih cepat) |
| UI Components | shadcn/ui | Komponen modern, accessible, customizable, 0 runtime |
| Database | Supabase (PostgreSQL) | Free tier, realtime, auth built-in |
| Storage | Supabase Storage | Upload gambar/file |
| Auth | Supabase Auth + @supabase/ssr | Cookie-based session, proxy.ts compatible |
| Hosting | Vercel | Free tier, CI/CD otomatis, edge network |
| Animasi | Motion (ex-Framer Motion) + CSS | Hybrid: CSS untuk simple, Motion untuk complex |
| Form | React Hook Form + Zod | Validasi form yang robust |
| Icons | Lucide React | Konsisten, ringan |
| Font | next/font (Plus Jakarta Sans) | Self-hosted, zero CLS |

> **⚠️ Catatan Hosting:** Vercel Hobby plan hanya untuk non-komersial/personal.
> Untuk production bisnis, perlu upgrade ke Vercel Pro ($20/bln) atau pindah ke
> Cloudflare Pages (gratis untuk komersial). Untuk tahap development, Hobby cukup.

---

## 11. Sitemap & Navigasi

```
/ (Home)
├── /profil (Profil Perusahaan + Visi Misi)
├── /layanan (Daftar Layanan)
├── /portfolio (Portfolio / Showcase)
├── /legalitas (Legalitas Perusahaan)
├── /kontak (Kontak + Form + Maps)
└── /kelola-panel (Admin - Hidden)
    ├── /kelola-panel/dashboard
    ├── /kelola-panel/profil
    ├── /kelola-panel/layanan
    ├── /kelola-panel/portfolio
    ├── /kelola-panel/legalitas
    ├── /kelola-panel/kontak
    ├── /kelola-panel/media
    └── /kelola-panel/pesan
```

---

## 12. Desain & UI/UX Guidelines

### 12.1 Prinsip Desain
- **Minimalis Modern** — Clean, tidak ramai, whitespace yang cukup
- **Profesional** — Warna corporate, tipografi yang rapi
- **Mobile-First** — Prioritas pengalaman mobile
- **Smooth & Ringan** — Animasi subtle, loading cepat

### 12.2 Palet Warna (Rekomendasi)
| Peran | Warna | Hex |
|-------|-------|-----|
| Primary | Deep Navy | #0F2B5B |
| Primary Light | Medium Blue | #1A4A8A |
| Secondary | Warm Gold | #D4982A |
| Secondary Light | Bright Gold | #F5B84C |
| Accent | Sky Blue | #0EA5E9 |
| Background | White | #FFFFFF |
| Background Muted | Slate-50 | #F8FAFC |
| Surface | White | #FFFFFF |
| Text | Slate-900 | #0F172A |
| Text Muted | Slate-500 | #64748B |
| Border | Slate-200 | #E2E8F0 |

> **Dark Mode:** Fully supported. Admin dan public pages menggunakan dark mode yang konsisten dengan warna `/10` opacity (bukan `bg-xxx-50` yang tidak dark-mode safe).

### 12.3 Tipografi
- Heading: Inter / Plus Jakarta Sans (bold, modern)
- Body: Inter (clean, readable)
- Size scale mengikuti Tailwind default

---

## 13. Fase Pengembangan

### Fase 1 — MVP ✅
- [x] Setup project (Next.js + Supabase + Vercel)
- [x] Database schema & seed data
- [x] Public pages (Home, Profil, Layanan, Kontak)
- [x] Form kontak + WhatsApp button
- [x] SEO dasar (meta tags, structured data)
- [x] Responsive design
- [x] Deploy ke Vercel

### Fase 2 — Admin & Portfolio ✅
- [x] Admin authentication (Supabase Auth)
- [x] Admin dashboard dengan statistik
- [x] CRUD layanan, portfolio, legalitas
- [x] Upload gambar (Supabase Storage)
- [x] Halaman portfolio public dengan filter kategori
- [x] Halaman legalitas
- [x] Media manager

### Fase 3 — Polish & Optimization ✅
- [x] Animasi & micro-interactions (reveal, card-glow, shine, float)
- [x] UI/UX redesign premium (Deep Navy + Warm Gold palette)
- [x] Dark mode support (public + admin)
- [x] Admin dashboard redesign (glassmorphism login, modern sidebar)
- [x] Portfolio filter dinamis (generate kategori dari data DB)
- [x] Service highlight dinamis (fetch dari DB, bukan hardcoded)
- [x] Dark-mode safe colors di seluruh admin panel
- [x] Performance: CSS-first animations, minimal `'use client'`, server components
- [x] SEO advanced (structured data JSON-LD)
- [x] Bug fix: portfolio RLS, layanan overlap, kategori filter

### Fase 4 — Future Enhancement (Post-MVP)
- [ ] Multi-bahasa (ID/EN)
- [ ] Blog/artikel
- [ ] Katalog produk ATK
- [ ] Integrasi email notification
- [ ] Analytics dashboard
- [ ] View Transitions (React 19.2)

---

## 14. Batasan & Asumsi

### Batasan
- Tidak ada fitur e-commerce/transaksi
- Tidak ada fitur registrasi user publik
- Admin hanya 1-2 user (tidak perlu role management kompleks)
- Budget hosting: $0 (free tier Vercel + Supabase)

### Asumsi
- Konten awal (teks, deskripsi) akan disediakan oleh pemilik
- Logo akan ditambahkan di tahap akhir
- Domain akan ditentukan kemudian
- Gambar portfolio akan diupload via admin dashboard

---

## 15. Risiko & Mitigasi

| Risiko | Dampak | Mitigasi |
|--------|--------|----------|
| Free tier limit Supabase (500MB DB, 1GB storage) | Tidak bisa upload banyak gambar | Compress gambar WebP, max 500KB/file |
| Supabase auto-pause (7 hari inaktif) | Website down ~30 detik saat bangun | GitHub Actions keep-alive cron tiap 5 hari |
| Free tier Vercel (100GB bandwidth/bulan) | Website down jika traffic tinggi | Monitor usage, upgrade jika perlu |
| Vercel Hobby = non-commercial only | Melanggar ToS jika untuk bisnis | Upgrade ke Pro ($20/bln) atau Cloudflare Pages (gratis) |
| Hanya 2 orang tim | Development lambat | Prioritaskan MVP, iterasi bertahap |
| Belum ada domain | Tidak bisa branding URL | Gunakan subdomain Vercel dulu |

---

## 16. Kriteria Keberhasilan (Definition of Done)

- [ ] Website accessible di URL publik
- [ ] Semua halaman public responsive & mobile-friendly
- [ ] Lighthouse score > 90 (Performance, SEO, Accessibility)
- [ ] Form kontak berfungsi & data masuk ke database
- [ ] WhatsApp button berfungsi
- [ ] Admin bisa login & kelola konten
- [ ] Gambar bisa diupload & ditampilkan
- [ ] Website load < 3 detik

---

## 17. Approval

| Role | Nama | Tanggal | Status |
|------|------|---------|--------|
| Product Owner | [Pemilik CV. Prabaswara] | - | Pending |
| Developer | - | - | Pending |

---

*Dokumen ini bersifat living document dan akan diperbarui sesuai perkembangan proyek.*
