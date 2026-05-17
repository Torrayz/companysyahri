# Panduan SEO — CV. Prabaswara Gandar Prima

---

## Yang Sudah Dilakukan (oleh AI) ✅

- [x] Meta title & description per halaman
- [x] Open Graph tags (og:title, og:description, og:type)
- [x] JSON-LD Structured Data (Organization, LocalBusiness)
- [x] Dynamic sitemap (`/sitemap.xml`)
- [x] robots.txt (block admin route)
- [x] Semantic HTML (h1, h2, nav, main, footer)
- [x] Next.js Image optimization (WebP, lazy loading)
- [x] Mobile responsive
- [x] Self-hosted font (Plus Jakarta Sans via next/font)

---

## Yang Harus Dilakukan oleh Anda (Torray)

### 1. Setup Google Search Console
1. Buka [search.google.com/search-console](https://search.google.com/search-console)
2. Tambahkan property dengan URL website (setelah deploy)
3. Verifikasi ownership (pilih DNS atau HTML tag)
4. Submit sitemap: `https://domain-anda.com/sitemap.xml`

### 2. Setup Google Business Profile
1. Buka [business.google.com](https://business.google.com)
2. Daftarkan "CV. Prabaswara Gandar Prima"
3. Isi: alamat, jam operasional, nomor telepon, website URL
4. Upload foto (logo, kantor jika ada)
5. Ini membuat bisnis Anda muncul di Google Maps

### 3. Tentukan Domain
- Domain `.com` atau `.co.id` lebih dipercaya Google
- Saran: `prabaswaragandarprima.co.id` atau `prabaswara.co.id`
- Setelah ada domain, update `NEXT_PUBLIC_SITE_URL` di env

### 4. Isi Konten yang Berkualitas
SEO terbaik = konten yang berguna. Pastikan:
- Deskripsi layanan lengkap dan natural (bukan copy-paste)
- Portfolio ada gambar + deskripsi detail
- Legalitas lengkap (membangun trust)

### 5. Dapatkan Backlinks
- Daftarkan di direktori bisnis Indonesia (Yellow Pages, dll)
- Minta klien link ke website Anda
- Buat akun di platform: LinkedIn, Instagram, Google Business

---

## Optimasi Tambahan (Bisa Dikerjakan Nanti)

### Blog / Artikel
- Buat konten tentang: tips pengadaan, cara pilih vendor, dll
- Ini mendatangkan traffic organik dari Google
- Target: 1-2 artikel per bulan

### Kecepatan Website
Setelah deploy, cek:
- [PageSpeed Insights](https://pagespeed.web.dev/) → target score > 90
- [GTmetrix](https://gtmetrix.com/)

Jika score rendah:
- Compress gambar sebelum upload (tools: squoosh.app)
- Pastikan tidak ada gambar > 500KB

### Monitor Rankings
- Gunakan Google Search Console → Performance tab
- Lihat query apa yang sudah muncul
- Target keywords:
  - "pengadaan atk tangerang"
  - "vendor barang kantor tangerang"
  - "jasa pembuatan website tangerang"
  - "catering event tangerang"

---

## Checklist SEO Per Halaman

| Halaman | Title | Description | H1 | JSON-LD |
|---------|:-----:|:-----------:|:--:|:-------:|
| Beranda | ✅ | ✅ | ✅ | ✅ |
| Profil | ✅ | ✅ | ✅ | - |
| Layanan | ✅ | ✅ | ✅ | - |
| Portfolio | ✅ | ✅ | ✅ | - |
| Legalitas | ✅ | ✅ | ✅ | - |
| Kontak | ✅ | ✅ | ✅ | - |

---

## Ringkasan

```
SEO = Konten bagus + Teknis benar + Waktu

Yang AI sudah handle: teknis (meta, sitemap, structured data, performance)
Yang Anda perlu lakukan: konten berkualitas + Google Search Console + domain
```

SEO butuh waktu 1-3 bulan untuk mulai terlihat hasilnya di Google. Konsisten isi konten dan pastikan website tetap online.
