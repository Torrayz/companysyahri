# CV. Prabaswara Gandar Prima — Company Profile Website

> Sinergi Kebutuhan Bisnis dan Inovasi Digital

Website company profile untuk CV. Prabaswara Gandar Prima — perusahaan pengadaan barang & jasa kantor, konsumsi event, pembuatan website & aplikasi, serta pengadaan ATK.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Hosting**: Vercel

## Getting Started

```bash
# 1. Clone repo
git clone git@github.com:Torrayz/companysyahri.git
cd companysyahri

# 2. Install dependencies
npm install

# 3. Setup environment
cp .env.local.example .env.local
# Edit .env.local dengan credentials Supabase Anda

# 4. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/           # Pages & routes
├── components/    # UI components
├── lib/           # Utilities, Supabase clients
├── actions/       # Server Actions (CRUD)
├── hooks/         # Custom React hooks
└── types/         # TypeScript types
```

## Documentation

- [PRD](./docs/PRD.md) — Product Requirements Document
- [Architecture](./docs/ARCHITECTURE.md) — Technical Architecture
- [Setup Guide](./docs/SETUP.md) — Development Setup Guide

## Admin Panel

Admin dashboard tersedia di `/kelola-panel` (hidden route, tidak ada link dari public website).

## License

Private — CV. Prabaswara Gandar Prima
