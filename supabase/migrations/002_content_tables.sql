-- ============================================
-- Migration 002: Admin-managed content
-- ============================================

-- Kenapa Pilih Kami
CREATE TABLE why_choose_us (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT DEFAULT 'Star',
  "order" INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cara Kerja Kami
CREATE TABLE how_it_works (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  step_number INT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT DEFAULT 'Cog',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Client Marquee
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo_url TEXT,
  "order" INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS + Grants
ALTER TABLE why_choose_us ENABLE ROW LEVEL SECURITY;
ALTER TABLE how_it_works ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read active why_choose_us" ON why_choose_us FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public read active how_it_works" ON how_it_works FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public read active clients" ON clients FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Admin full access why_choose_us" ON why_choose_us FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access how_it_works" ON how_it_works FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access clients" ON clients FOR ALL USING (auth.role() = 'authenticated');

GRANT SELECT ON public.why_choose_us TO anon;
GRANT SELECT ON public.how_it_works TO anon;
GRANT SELECT ON public.clients TO anon;
GRANT ALL ON public.why_choose_us TO service_role;
GRANT ALL ON public.how_it_works TO service_role;
GRANT ALL ON public.clients TO service_role;

-- Seed data
INSERT INTO why_choose_us (title, description, icon, "order") VALUES
('Terdaftar & Legal', 'Perusahaan terdaftar resmi dengan dokumen legalitas lengkap.', 'ShieldCheck', 1),
('Tepat Waktu', 'Komitmen pengerjaan sesuai deadline yang disepakati.', 'Clock', 2),
('Tim Profesional', 'Ditangani langsung oleh tim yang berpengalaman di bidangnya.', 'Users', 3),
('Harga Kompetitif', 'Solusi berkualitas dengan harga yang bersaing di pasar.', 'ThumbsUp', 4);

INSERT INTO how_it_works (step_number, title, description, icon) VALUES
(1, 'Konsultasi', 'Hubungi kami via WhatsApp atau form kontak. Sampaikan kebutuhan Anda.', 'MessageSquare'),
(2, 'Penawaran', 'Kami berikan proposal dan penawaran harga terbaik sesuai kebutuhan.', 'FileText'),
(3, 'Pengerjaan', 'Tim kami mengerjakan dengan profesional dan update progres berkala.', 'Cog'),
(4, 'Serah Terima', 'Pekerjaan selesai tepat waktu dengan kualitas yang terjamin.', 'PackageCheck');

INSERT INTO clients (name, "order") VALUES
('Instansi Pemerintah', 1),
('PT. Mitra Sejahtera', 2),
('CV. Berkah Mandiri', 3),
('Dinas Pendidikan', 4),
('PT. Teknologi Nusantara', 5),
('UMKM Digital', 6),
('PT. Karya Prima', 7),
('Kementerian Keuangan', 8);

-- Site config seeds for footer & hero
INSERT INTO site_config (key, value) VALUES
('footer_hours', 'Senin - Jumat: 08.00 - 17.00 WIB\nSabtu: 08.00 - 12.00 WIB'),
('social_instagram', ''),
('social_linkedin', ''),
('social_facebook', ''),
('hero_background_url', '')
ON CONFLICT (key) DO NOTHING;
