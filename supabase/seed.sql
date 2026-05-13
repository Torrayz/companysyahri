-- Seed: Profil perusahaan
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

-- Seed: Layanan
INSERT INTO services (title, description, icon, "order") VALUES
('Pengadaan ATK', 'Alat tulis kantor lengkap untuk kebutuhan operasional perusahaan dan instansi.', 'PenTool', 1),
('Pengadaan IT Hardware & Elektronik', 'Perangkat komputer, printer, networking, dan peralatan elektronik kantor.', 'Monitor', 2),
('Furniture Kantor Modular', 'Meja, kursi, lemari, dan partisi kantor dengan desain modular dan fungsional.', 'Armchair', 3),
('Konsumsi Event', 'Layanan catering fleksibel untuk corporate event, seminar, dan kegiatan instansi.', 'UtensilsCrossed', 4),
('Pembuatan Website & Aplikasi', 'Solusi digital modern dan custom sesuai kebutuhan bisnis Anda.', 'Globe', 5);
