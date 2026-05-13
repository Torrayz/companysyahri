-- ============================================
-- CV. Prabaswara Gandar Prima - Initial Schema
-- ============================================

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
  mission JSONB,
  logo_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Layanan
CREATE TABLE services (
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
CREATE TABLE portfolios (
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
CREATE TABLE legality (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  number TEXT,
  description TEXT,
  file_url TEXT,
  "order" INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pesan masuk
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site config (key-value)
CREATE TABLE site_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Public read policies
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

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert messages" ON messages
  FOR INSERT WITH CHECK (TRUE);

ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read site_config" ON site_config
  FOR SELECT USING (TRUE);

-- Admin policies (ganti email sesuai admin Anda)
CREATE POLICY "Admin full access services" ON services
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM auth.users WHERE email IN ('admin@prabaswara.id'))
  );

CREATE POLICY "Admin full access portfolios" ON portfolios
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM auth.users WHERE email IN ('admin@prabaswara.id'))
  );

CREATE POLICY "Admin full access legality" ON legality
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM auth.users WHERE email IN ('admin@prabaswara.id'))
  );

CREATE POLICY "Admin full access profiles" ON profiles
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM auth.users WHERE email IN ('admin@prabaswara.id'))
  );

CREATE POLICY "Admin full access messages" ON messages
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM auth.users WHERE email IN ('admin@prabaswara.id'))
  );

CREATE POLICY "Admin full access site_config" ON site_config
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM auth.users WHERE email IN ('admin@prabaswara.id'))
  );
