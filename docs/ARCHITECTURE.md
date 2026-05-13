# Arsitektur Teknis
# Website Company Profile — CV. Prabaswara Gandar Prima

---

## 1. Arsitektur Overview

```
┌─────────────────────────────────────────────────────────┐
│                      VERCEL (Hosting)                     │
│  ┌─────────────────────────────────────────────────────┐ │
│  │           Next.js 16.2+ (App Router)                 │ │
│  │           React 19.2 | Turbopack (Default)          │ │
│  │                                                     │ │
│  │  ┌──────────────┐    ┌───────────────────────────┐  │ │
│  │  │ Public Pages │    │    Admin Dashboard        │  │ │
│  │  │ (SSG/SSR)    │    │    (/kelola-panel)        │  │ │
│  │  │              │    │    (CSR + Protected)       │  │ │
│  │  └──────┬───────┘    └─────────────┬─────────────┘  │ │
│  │         │                          │                 │ │
│  │         └──────────┬───────────────┘                 │ │
│  │                    │                                 │ │
│  │         ┌──────────▼───────────┐                    │ │
│  │         │   API Routes         │                    │ │
│  │         │   (Server Actions)   │                    │ │
│  │         └──────────┬───────────┘                    │ │
│  └────────────────────┼────────────────────────────────┘ │
└───────────────────────┼──────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│                    SUPABASE                               │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  PostgreSQL   │  │   Storage    │  │     Auth     │  │
│  │  (Database)   │  │   (Files)    │  │   (Admin)    │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## 2. Caching & Rendering Strategy

> **Next.js 16 menggunakan model caching baru.** Default = dynamic (request-time).
> Caching harus explicit via `"use cache"` directive. ISR lama sudah deprecated.

### Strategi Per Halaman

| Halaman | Strategy | Cache Lifetime | Alasan |
|---------|----------|----------------|--------|
| Home | `'use cache'` + `cacheLife('hours')` | 1 jam | Konten stabil, hero harus instant |
| Profil | `'use cache'` + `cacheLife('days')` | 1 hari | Sangat jarang berubah |
| Layanan | `'use cache'` + `cacheLife('hours')` | 1 jam | Update via admin |
| Portfolio | `'use cache'` + `cacheLife('minutes')` | 5 menit | Sering ditambah/diubah |
| Legalitas | `'use cache'` + `cacheLife('days')` | 1 hari | Hampir tidak pernah berubah |
| Kontak | `'use cache'` + `cacheLife('days')` | 1 hari | Info kontak jarang berubah |
| Admin/* | No cache (dynamic) | Realtime | Interaktif, butuh data fresh |

### Invalidation Strategy

```typescript
// Saat admin update konten → trigger revalidation
'use server'
import { revalidateTag } from 'next/cache'

export async function updateService(id: string, data: ServiceData) {
  await db.services.update(id, data)
  revalidateTag('services') // Cache halaman layanan langsung ter-invalidate
}
```

### next.config.ts

```typescript
const nextConfig = {
  experimental: {
    cacheComponents: true, // Enable "use cache" directive
  },
}
```

---

## 3. Database Schema

### 3.1 Entity Relationship

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   profiles   │     │  services    │     │ portfolios  │
├─────────────┤     ├─────────────┤     ├─────────────┤
│ id (PK)     │     │ id (PK)     │     │ id (PK)     │
│ company_name│     │ title       │     │ title       │
│ tagline     │     │ description │     │ description │
│ description │     │ icon        │     │ image_url   │
│ address     │     │ order       │     │ category    │
│ phone       │     │ is_active   │     │ client_name │
│ email       │     │ created_at  │     │ is_active   │
│ whatsapp    │     │ updated_at  │     │ created_at  │
│ vision      │     └─────────────┘     │ updated_at  │
│ mission     │                          └─────────────┘
│ logo_url    │
│ updated_at  │     ┌─────────────┐     ┌─────────────┐
└─────────────┘     │  legality   │     │  messages   │
                    ├─────────────┤     ├─────────────┤
                    │ id (PK)     │     │ id (PK)     │
                    │ title       │     │ name        │
                    │ number      │     │ email       │
                    │ description │     │ subject     │
                    │ file_url    │     │ message     │
                    │ order       │     │ is_read     │
                    │ created_at  │     │ created_at  │
                    └─────────────┘     └─────────────┘

┌─────────────┐
│ site_config │
├─────────────┤
│ id (PK)     │
│ key         │
│ value       │
│ updated_at  │
└─────────────┘
```

### 3.2 SQL Schema

```sql
-- Profil perusahaan (single row)
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL DEFAULT 'CV. Prabaswara Gandar Prima',
  tagline TEXT,
  description TEXT,
  address TEXT,
  phone TEXT,
  email TEXT,
  whatsapp TEXT,
  vision TEXT,
  mission JSONB, -- array of mission items
  logo_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Layanan
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT, -- lucide icon name
  image_url TEXT,
  "order" INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Portfolio
CREATE TABLE portfolios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  category TEXT, -- 'pengadaan' | 'konsumsi' | 'digital' | 'atk'
  client_name TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Legalitas
CREATE TABLE legality (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  number TEXT,
  description TEXT,
  file_url TEXT,
  "order" INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pesan masuk dari form kontak
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Konfigurasi site (key-value)
CREATE TABLE site_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 3.3 Row Level Security (RLS)

```sql
-- ============================================
-- PUBLIC POLICIES (read-only)
-- ============================================
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read active services" ON services
  FOR SELECT USING (is_active = TRUE);

ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read active portfolios" ON portfolios
  FOR SELECT USING (is_active = TRUE);

ALTER TABLE legality ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read legality" ON legality
  FOR SELECT USING (TRUE);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read profiles" ON profiles
  FOR SELECT USING (TRUE);

-- Messages: public insert, admin read
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert messages" ON messages
  FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Admin read messages" ON messages
  FOR SELECT USING (auth.role() = 'authenticated');

ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read site_config" ON site_config
  FOR SELECT USING (TRUE);

-- ============================================
-- ADMIN POLICIES (locked to specific email)
-- ============================================
-- Lebih aman daripada auth.role() = 'authenticated' yang terlalu luas

CREATE POLICY "Admin full access services" ON services
  FOR ALL USING (
    auth.uid() IN (
      SELECT id FROM auth.users
      WHERE email IN ('admin@prabaswara.id') -- ganti dengan email admin
    )
  );

CREATE POLICY "Admin full access portfolios" ON portfolios
  FOR ALL USING (
    auth.uid() IN (
      SELECT id FROM auth.users
      WHERE email IN ('admin@prabaswara.id')
    )
  );

CREATE POLICY "Admin full access legality" ON legality
  FOR ALL USING (
    auth.uid() IN (
      SELECT id FROM auth.users
      WHERE email IN ('admin@prabaswara.id')
    )
  );

CREATE POLICY "Admin full access profiles" ON profiles
  FOR ALL USING (
    auth.uid() IN (
      SELECT id FROM auth.users
      WHERE email IN ('admin@prabaswara.id')
    )
  );

CREATE POLICY "Admin full access site_config" ON site_config
  FOR ALL USING (
    auth.uid() IN (
      SELECT id FROM auth.users
      WHERE email IN ('admin@prabaswara.id')
    )
  );

CREATE POLICY "Admin full access messages" ON messages
  FOR ALL USING (
    auth.uid() IN (
      SELECT id FROM auth.users
      WHERE email IN ('admin@prabaswara.id')
    )
  );
```

---

## 4. Folder Structure

```
prabaswara-web/
├── public/
│   ├── images/
│   │   └── placeholder.svg
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   │   ├── page.tsx               # Home
│   │   │   ├── profil/page.tsx
│   │   │   ├── layanan/page.tsx
│   │   │   ├── portfolio/page.tsx
│   │   │   ├── legalitas/page.tsx
│   │   │   ├── kontak/page.tsx
│   │   │   ├── layout.tsx             # Public layout (navbar + footer)
│   │   │   ├── error.tsx              # Error boundary public
│   │   │   └── loading.tsx            # Loading skeleton public
│   │   ├── kelola-panel/
│   │   │   ├── page.tsx               # Login
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── profil/page.tsx
│   │   │   ├── layanan/page.tsx
│   │   │   ├── portfolio/page.tsx
│   │   │   ├── legalitas/page.tsx
│   │   │   ├── media/page.tsx
│   │   │   ├── pesan/page.tsx
│   │   │   ├── layout.tsx             # Admin layout (sidebar)
│   │   │   ├── error.tsx              # Error boundary admin
│   │   │   └── loading.tsx            # Loading skeleton admin
│   │   ├── api/
│   │   │   └── revalidate/route.ts
│   │   ├── layout.tsx                 # Root layout
│   │   ├── globals.css                # Tailwind v4 (@import + @theme)
│   │   ├── not-found.tsx
│   │   ├── global-error.tsx           # Last resort error boundary
│   │   └── sitemap.ts                 # Dynamic sitemap generation
│   ├── components/
│   │   ├── ui/                        # shadcn/ui components
│   │   ├── public/
│   │   │   ├── navbar.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── hero.tsx
│   │   │   ├── service-card.tsx
│   │   │   ├── portfolio-card.tsx
│   │   │   ├── contact-form.tsx
│   │   │   ├── whatsapp-button.tsx
│   │   │   ├── back-to-top.tsx
│   │   │   ├── google-maps.tsx
│   │   │   └── structured-data.tsx    # JSON-LD components
│   │   └── admin/
│   │       ├── sidebar.tsx
│   │       ├── data-table.tsx
│   │       ├── image-upload.tsx
│   │       ├── stats-card.tsx
│   │       └── form-fields.tsx
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts              # Browser client
│   │   │   ├── server.ts              # Server client (@supabase/ssr)
│   │   │   └── admin.ts              # Service role client
│   │   ├── utils.ts
│   │   ├── validations.ts            # Zod schemas
│   │   ├── rate-limit.ts             # In-memory rate limiter
│   │   └── constants.ts              # Site config, colors
│   ├── actions/                       # Server Actions (separated)
│   │   ├── contact.ts
│   │   ├── services.ts
│   │   ├── portfolios.ts
│   │   ├── legality.ts
│   │   ├── profile.ts
│   │   ├── messages.ts
│   │   └── media.ts
│   ├── hooks/
│   │   ├── use-auth.ts
│   │   └── use-toast.ts
│   └── types/
│       └── index.ts
├── supabase/
│   ├── migrations/
│   │   └── 001_initial_schema.sql
│   └── seed.sql
├── .github/
│   └── workflows/
│       └── keep-alive.yml             # Supabase keep-alive cron
├── docs/
│   ├── PRD.md
│   └── ARCHITECTURE.md
├── proxy.ts                           # Auth + Security (replaces middleware.ts)
├── .env.local.example
├── .gitignore
├── next.config.ts
├── postcss.config.mjs                 # Tailwind v4
├── tsconfig.json
├── package.json
└── README.md
```

---

## 5. API & Data Flow

### 5.1 Public Data Fetching

```
[User Browser] → [Vercel Edge/CDN]
                       │
                       ▼ (cache hit → serve static)
                       │ (cache miss → regenerate)
                       ▼
              [Next.js Server]
                       │
                       ▼ (fetch with Supabase server client)
              [Supabase PostgreSQL]
                       │
                       ▼ (return data)
              [Render HTML → Cache → Serve]
```

### 5.2 Form Submission Flow

```
[User] → [Contact Form] → [Server Action] → [Validate (Zod)]
                                                    │
                                          ┌─────────▼─────────┐
                                          │ Rate Limit Check   │
                                          └─────────┬─────────┘
                                                    │ (pass)
                                                    ▼
                                          [Insert to Supabase]
                                                    │
                                                    ▼
                                          [Return Success/Error]
```

### 5.3 Admin CRUD Flow

```
[Admin] → [Login] → [Supabase Auth] → [Session Cookie]
                                              │
[Admin] → [Dashboard] → [Server Action] ─────┘
                              │                (verify session)
                              ▼
                    [Supabase Query (with RLS)]
                              │
                              ▼
                    [Revalidate ISR Cache]
                              │
                              ▼
                    [Public site updated]
```

### 5.4 Image Upload Flow

```
[Admin] → [Select File] → [Client-side resize/compress]
                                      │
                                      ▼
                          [Upload to Supabase Storage]
                                      │
                                      ▼
                          [Get Public URL]
                                      │
                                      ▼
                          [Save URL to database]
```

---

## 6. Keamanan

### 6.1 Authentication
- Supabase Auth dengan email/password
- Admin user dibuat manual via Supabase dashboard (tidak ada registrasi publik)
- Session token disimpan di HTTP-only cookie via `@supabase/ssr`
- Auto-refresh token
- Gunakan `supabase.auth.getUser()` (bukan `getSession()`) untuk validasi server-side

### 6.2 Authorization
- RLS pada semua tabel (locked ke email admin spesifik)
- `proxy.ts` untuk proteksi route `/kelola-panel/*`
- Server-side session validation pada setiap Server Action

### 6.3 Input Validation
- Zod schema validation pada semua form input
- Server-side validation (tidak hanya client-side)
- Sanitize HTML input untuk mencegah XSS

### 6.4 Rate Limiting
- Form kontak: max 3 submission per IP per jam
- Admin login: max 5 attempts per IP per 15 menit (anti brute-force)
- Implementasi via `proxy.ts` + Server Action double-check

### 6.5 File Upload Security
- Whitelist file types: jpg, jpeg, png, webp, svg, pdf
- Max file size: 2MB (gambar), 5MB (dokumen)
- Rename file saat upload (prevent path traversal)
- Client-side compression sebelum upload

### 6.6 Security Headers (via proxy.ts)

```typescript
// proxy.ts
const securityHeaders = {
  'Content-Security-Policy': `
    default-src 'self';
    script-src 'self';
    style-src 'self' 'unsafe-inline';
    img-src 'self' https://*.supabase.co data: blob:;
    connect-src 'self' https://*.supabase.co;
    frame-src https://maps.google.com;
  `,
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
}
```

### 6.7 Proxy Protection Flow

```
[Request masuk]
    │
    ▼
[proxy.ts]
    ├── 1. Set security headers (SEMUA request)
    ├── 2. Supabase session refresh (cookie)
    ├── 3. Rate limiting check (form/login routes)
    ├── 4. Auth check (/kelola-panel/*)
    │       ├── Session valid → lanjut
    │       └── Session invalid → redirect /kelola-panel (login)
    └── 5. Forward request

PENTING: proxy.ts = optimistic check.
Server Actions HARUS validasi ulang secara independen.
```

---

## 7. Error Handling & UX Resilience

### 7.1 Error Boundary (Fallback UI)
- Setiap route memiliki file `error.tsx` sebagai fallback
- Jika satu section error, hanya section itu yang menampilkan fallback — halaman lain tetap normal
- Fallback menampilkan pesan user-friendly + tombol "Coba Lagi"
- Root `global-error.tsx` sebagai last resort jika layout error

```
Struktur:
src/app/(public)/error.tsx          → fallback public pages
src/app/(public)/portfolio/error.tsx → fallback khusus portfolio
src/app/kelola-panel/error.tsx      → fallback admin
src/app/global-error.tsx            → fallback terakhir
```

### 7.2 Loading UI
- File `loading.tsx` per route → skeleton/shimmer otomatis saat navigasi
- User tidak pernah melihat blank screen

### 7.3 Prefetch & Smooth Navigation
- Next.js `<Link>` otomatis prefetch halaman yang visible di viewport
- Saat user klik link, halaman sudah ter-download → tampil instan (0ms perceived load)
- Dikombinasikan dengan Framer Motion page transitions → perpindahan halaman smooth (fade/slide)
- Tidak ada "jump" kasar — navigasi terasa seperti native app

```
Flow:
[User melihat navbar] → [Next.js prefetch /layanan, /portfolio, dll di background]
                                    │
[User klik "Layanan"] → [Halaman sudah ready → render instan + animasi transisi]
```

---

## 8. Performance Optimization

### 8.1 Image Optimization
- Next.js `<Image>` component (auto WebP, responsive sizes)
- Client-side compression sebelum upload (max 500KB)
- Lazy loading untuk gambar below-the-fold

### 8.2 Code Splitting
- Dynamic imports untuk komponen berat (Maps, animasi)
- Route-based code splitting (otomatis Next.js App Router)
- Admin bundle terpisah dari public bundle

### 8.3 Caching Strategy
- `"use cache"` untuk halaman public (explicit caching)
- On-demand revalidation via `revalidateTag()` saat admin update konten
- Static assets: immutable cache headers

### 8.4 Core Web Vitals Target

| Metric | Target | Strategi |
|--------|:------:|---------|
| LCP | < 2.0s | `priority` pada hero image, `next/font` self-hosted |
| INP | < 150ms | Server Components, minimal client JS |
| CLS | < 0.05 | Fixed dimensions, skeleton loaders |
| FCP | < 1.2s | `use cache`, font preload |
| Bundle | < 150KB | Dynamic imports, CSS-only animations where possible |

### 8.5 Font Strategy

```typescript
// Self-hosted via next/font — zero external requests, zero CLS
import { Plus_Jakarta_Sans } from 'next/font/google'

const font = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-main',
  preload: true,
})
```

### 8.6 Animation Strategy (Hybrid)

| Tipe | Implementasi | Bundle Cost |
|------|-------------|:-----------:|
| Hover effects (button, card) | CSS/Tailwind transitions | 0 KB |
| Fade-in on scroll | Motion library (dynamic import) | ~30 KB (shared) |
| Page transitions | React 19.2 View Transitions API | 0 KB |
| Loading shimmer | CSS @keyframes | 0 KB |
| Stagger animations | Motion library | ~30 KB (shared) |

> Prioritaskan CSS animations untuk hal sederhana. Motion library hanya untuk
> animasi kompleks yang tidak bisa dicapai dengan CSS saja.

---

## 9. Deployment & CI/CD

### 9.1 Environment

| Environment | URL | Branch |
|-------------|-----|--------|
| Production | prabaswara.vercel.app* | main |
| Preview | auto-generated | feature/* |

*Domain custom akan dikonfigurasi setelah tersedia.

### 9.2 Environment Variables

```env
# .env.local.example
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
NEXT_PUBLIC_SITE_URL=https://prabaswara.vercel.app
NEXT_PUBLIC_WHATSAPP_NUMBER=62xxxx
NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL=https://maps.google.com/...
```

### 9.3 Deployment Flow

```
[Git Push to main] → [Vercel Auto Build] → [Deploy to Production]
                            │
                            ├── next build (Turbopack, pages generated)
                            ├── Type checking
                            └── Lint checking
```

### 9.4 Supabase Keep-Alive

Supabase free tier auto-pause setelah 7 hari inaktif. Solusi:

```yaml
# .github/workflows/keep-alive.yml
name: Keep Supabase Alive
on:
  schedule:
    - cron: '0 0 */5 * *'  # Setiap 5 hari
jobs:
  ping:
    runs-on: ubuntu-latest
    steps:
      - name: Ping Supabase
        run: |
          curl -s "${{ secrets.SUPABASE_URL }}/rest/v1/profiles?select=id&limit=1" \
            -H "apikey: ${{ secrets.SUPABASE_ANON_KEY }}" \
            -H "Authorization: Bearer ${{ secrets.SUPABASE_ANON_KEY }}"
```

---

## 10. Monitoring & Maintenance

### 10.1 Monitoring (Free Tier)
- Vercel Analytics (Web Vitals)
- Supabase Dashboard (DB usage, storage usage)
- Vercel Logs (error tracking)

### 10.2 Backup
- Supabase auto-backup (free tier: 7 hari)
- Git sebagai backup kode

### 10.3 Update Strategy
- Dependency update bulanan (minor/patch)
- Next.js major update per quarter (evaluasi)

---

## 11. Skalabilitas (Future)

Arsitektur ini sudah disiapkan untuk:
- **Multi-bahasa**: Tambah i18n routing (`/en/`, `/id/`)
- **Blog**: Tambah tabel `posts` + halaman `/blog`
- **Katalog**: Tambah tabel `products` + halaman `/katalog`
- **Email notification**: Tambah Resend/Nodemailer pada form submission
- **Multiple admin**: Tambah role-based access di Supabase Auth

---

*Dokumen ini merupakan panduan teknis implementasi dan akan diperbarui seiring perkembangan proyek.*
