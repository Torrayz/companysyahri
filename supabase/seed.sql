-- ============================================
-- Seed Data - Jalankan setelah migration
-- ============================================

-- Profil perusahaan
INSERT INTO profiles (company_name, tagline, description, address, phone, whatsapp, vision, mission)
VALUES (
  'CV. Prabaswara Gandar Prima',
  'Sinergi Kebutuhan Bisnis dan Inovasi Digital',
  'CV. Prabaswara Gandar Prima adalah perusahaan penyedia barang dan jasa yang berdiri pada tahun 2026, berlokasi di Kota Tangerang, Banten. Kami melayani kebutuhan pengadaan kantor, konsumsi event, serta solusi teknologi digital.',
  'Sudimara Selatan, Ciledug, Kota Tangerang, Banten',
  NULL,
  NULL,
  'Menjadi perusahaan penyedia barang dan jasa yang inovatif, terpercaya, dan mampu memberikan nilai tambah bagi mitra bisnis di Indonesia.',
  '["Menyediakan produk dan layanan berkualitas dalam bidang pengadaan kebutuhan kantor dan konsumsi event.", "Memberikan solusi teknologi digital melalui pengembangan website dan aplikasi yang modern, efektif, dan sesuai kebutuhan klien.", "Membangun hubungan kerja jangka panjang dengan mitra melalui pelayanan yang profesional, responsif, dan tepat waktu."]'
);

-- Layanan
INSERT INTO services (title, description, icon, "order") VALUES
('Pengadaan ATK', 'Alat tulis kantor lengkap untuk kebutuhan operasional perusahaan dan instansi.', 'PenTool', 1),
('Pengadaan IT Hardware & Elektronik', 'Perangkat komputer, printer, networking, dan peralatan elektronik kantor.', 'Monitor', 2),
('Furniture Kantor Modular', 'Meja, kursi, lemari, dan partisi kantor dengan desain modular dan fungsional.', 'Armchair', 3),
('Konsumsi Event', 'Layanan catering fleksibel untuk corporate event, seminar, dan kegiatan instansi.', 'UtensilsCrossed', 4),
('Pembuatan Website & Aplikasi', 'Solusi digital modern dan custom sesuai kebutuhan bisnis Anda.', 'Globe', 5);

-- Kenapa Pilih Kami
INSERT INTO why_choose_us (title, description, icon, "order") VALUES
('Terdaftar & Legal', 'Perusahaan terdaftar resmi dengan dokumen legalitas lengkap.', 'ShieldCheck', 1),
('Tepat Waktu', 'Komitmen pengerjaan sesuai deadline yang disepakati.', 'Clock', 2),
('Tim Profesional', 'Ditangani langsung oleh tim yang berpengalaman di bidangnya.', 'Users', 3),
('Harga Kompetitif', 'Solusi berkualitas dengan harga yang bersaing di pasar.', 'ThumbsUp', 4);

-- Cara Kerja Kami
INSERT INTO how_it_works (step_number, title, description, icon) VALUES
(1, 'Konsultasi', 'Hubungi kami via WhatsApp atau form kontak. Sampaikan kebutuhan Anda.', 'MessageSquare'),
(2, 'Penawaran', 'Kami berikan proposal dan penawaran harga terbaik sesuai kebutuhan.', 'FileText'),
(3, 'Pengerjaan', 'Tim kami mengerjakan dengan profesional dan update progres berkala.', 'Cog'),
(4, 'Serah Terima', 'Pekerjaan selesai tepat waktu dengan kualitas yang terjamin.', 'PackageCheck');

-- Client Marquee
INSERT INTO clients (name, "order") VALUES
('Instansi Pemerintah', 1),
('PT. Mitra Sejahtera', 2),
('CV. Berkah Mandiri', 3),
('Dinas Pendidikan', 4),
('PT. Teknologi Nusantara', 5),
('UMKM Digital', 6),
('PT. Karya Prima', 7),
('Kementerian Keuangan', 8);

-- Site Config
INSERT INTO site_config (key, value) VALUES
('footer_hours', 'Senin - Jumat: 08.00 - 17.00 WIB\nSabtu: 08.00 - 12.00 WIB'),
('social_instagram', ''),
('social_linkedin', ''),
('social_facebook', ''),
('hero_background_url', '')
ON CONFLICT (key) DO NOTHING;
