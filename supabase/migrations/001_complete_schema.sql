-- ============================================
-- CV. Prabaswara Gandar Prima
-- Complete Database Schema
-- Jalankan sekali di Supabase SQL Editor
-- ============================================

-- ============================================
-- TABLES
-- ============================================

-- Profil perusahaan (single row)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL DEFAULT 'CV. Prabaswara Gandar Prima',
  tagline TEXT,
  description TEXT,
  address TEXT,
  phone TEXT,
  email TEXT,
  whatsapp TEXT,
  vision TEXT,
  mission JSONB,
  logo_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Layanan
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  image_url TEXT,
  "order" INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Portfolio
CREATE TABLE IF NOT EXISTS portfolios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  category TEXT,
  client_name TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Legalitas
CREATE TABLE IF NOT EXISTS legality (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  number TEXT,
  description TEXT,
  file_url TEXT,
  "order" INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pesan masuk
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site config (key-value)
CREATE TABLE IF NOT EXISTS site_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Kenapa Pilih Kami
CREATE TABLE IF NOT EXISTS why_choose_us (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT DEFAULT 'Star',
  "order" INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cara Kerja Kami
CREATE TABLE IF NOT EXISTS how_it_works (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  step_number INT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT DEFAULT 'Cog',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Client Marquee
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo_url TEXT,
  "order" INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE legality ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE why_choose_us ENABLE ROW LEVEL SECURITY;
ALTER TABLE how_it_works ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read active services" ON services FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public read active portfolios" ON portfolios FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public read legality" ON legality FOR SELECT USING (TRUE);
CREATE POLICY "Public read profiles" ON profiles FOR SELECT USING (TRUE);
CREATE POLICY "Public insert messages" ON messages FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Public read site_config" ON site_config FOR SELECT USING (TRUE);
CREATE POLICY "Public read active why_choose_us" ON why_choose_us FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public read active how_it_works" ON how_it_works FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public read active clients" ON clients FOR SELECT USING (is_active = TRUE);

-- Admin full access (authenticated only, aman karena tidak ada registrasi publik)
CREATE POLICY "Admin full access services" ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access portfolios" ON portfolios FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access legality" ON legality FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access profiles" ON profiles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access messages" ON messages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access site_config" ON site_config FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access why_choose_us" ON why_choose_us FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access how_it_works" ON how_it_works FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access clients" ON clients FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- GRANTS
-- ============================================

GRANT SELECT ON public.services TO anon;
GRANT SELECT ON public.portfolios TO anon;
GRANT SELECT ON public.legality TO anon;
GRANT SELECT ON public.profiles TO anon;
GRANT SELECT ON public.site_config TO anon;
GRANT SELECT ON public.why_choose_us TO anon;
GRANT SELECT ON public.how_it_works TO anon;
GRANT SELECT ON public.clients TO anon;
GRANT INSERT ON public.messages TO anon;

GRANT ALL ON public.services TO service_role;
GRANT ALL ON public.portfolios TO service_role;
GRANT ALL ON public.legality TO service_role;
GRANT ALL ON public.profiles TO service_role;
GRANT ALL ON public.messages TO service_role;
GRANT ALL ON public.site_config TO service_role;
GRANT ALL ON public.why_choose_us TO service_role;
GRANT ALL ON public.how_it_works TO service_role;
GRANT ALL ON public.clients TO service_role;
