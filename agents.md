# Agents.md — Panduan untuk AI Assistant

> Baca file ini PERTAMA sebelum mengerjakan apapun di proyek milik Torray.

---

## Tentang Owner

- **Nama:** Torray
- **Bahasa:** Bahasa Indonesia campur istilah teknis English
- **GitHub:** github.com/Torrayz
- **Ekspektasi:** Hasil kerja profesional, bukan template. Kode harus production-ready.

---

## Prinsip Kerja

### 1. JANGAN Push Tanpa Testing

```
WAJIB sebelum commit:
1. Build pass (next build / npm run build)
2. TypeScript: 0 error (tsc --noEmit)
3. Tidak ada runtime error yang obvious
4. Review: maintainability, keamanan, performance
```

Jika build gagal → FIX DULU, baru commit. Tidak boleh commit kode yang broken.

### 2. Git Workflow

```
main (production-ready)
  └── feat/nama-fitur    → fitur baru
  └── fix/nama-bug       → bug fix
  └── refactor/nama      → refactoring

Flow:
1. git checkout -b feat/nama-fitur
2. Develop + test
3. git commit (pesan bahasa Indonesia, natural, deskriptif)
4. git push -u origin feat/nama-fitur
5. git checkout main && git merge feat/nama-fitur --no-ff
6. git push
```

**Commit message:**
- Bahasa Indonesia, natural (bukan template AI)
- Deskriptif tapi singkat
- Contoh: `tambah halaman portfolio dengan filter kategori`
- Contoh: `fix: form tidak reset saat validasi gagal`

### 3. Sebelum Mulai Kerja

- Baca `docs/CHANGELOG.md` → pahami status proyek
- Baca `docs/ARCHITECTURE.md` → pahami struktur
- Cek `package.json` → pahami tech stack yang dipakai
- JANGAN install library baru tanpa alasan kuat
- JANGAN ganti arsitektur tanpa konfirmasi owner

### 4. Kualitas Kode

**Wajib:**
- TypeScript strict (no `any` kecuali terpaksa)
- Tidak ada unused imports/variables
- Tidak ada library yang di-install tapi tidak dipakai
- Error handling yang proper (try-catch, fallback UI)
- Input validation di server-side (jangan hanya client)

**Perhatikan:**
- Performance (bundle size, lazy loading, image optimization)
- Keamanan (RLS, input sanitization, rate limiting)
- Maintainability (kode mudah dibaca, folder terstruktur)
- Accessibility (semantic HTML, alt text, keyboard nav)

### 5. Jika Menemukan Bug / Issue

1. Diagnosa root cause (jangan langsung patch)
2. Jika sudah gagal 2x dengan pendekatan yang sama → ganti approach
3. Jelaskan ke owner apa yang salah dan kenapa
4. Fix + test + baru commit

### 6. Dokumentasi

```
docs/
├── CHANGELOG.md       → status proyek, apa yang sudah/belum
├── ARCHITECTURE.md    → arsitektur teknis
├── PRD.md             → product requirements
├── SETUP.md           → panduan setup development
└── SEO.md             → panduan SEO (jika ada)
```

Update `CHANGELOG.md` setiap ada perubahan signifikan.

---

## Hal yang TIDAK BOLEH Dilakukan

1. ❌ Push/commit tanpa build pass
2. ❌ Install library tanpa dipakai
3. ❌ Hardcode credentials/secrets di kode
4. ❌ Mengubah arsitektur tanpa konfirmasi
5. ❌ Membuat file/kode yang redundan
6. ❌ Commit message template AI ("feat: implement xyz", "chore: add abc")
7. ❌ Mengabaikan error — harus fix sebelum lanjut
8. ❌ Menjawab "sudah saya fix" tanpa benar-benar test
9. ❌ Menambah fitur yang tidak diminta
10. ❌ Meninggalkan console.log/debug code di production

---

## Tech Stack (Bervariasi Per Proyek)

Cek `package.json` setiap proyek. Jangan asumsi. Yang umum dipakai Torray:
- Next.js (App Router)
- Tailwind CSS
- Supabase
- Vercel
- TypeScript

Tapi bisa berbeda — selalu cek dulu.

---

## Gaya Komunikasi

- Langsung ke inti, tidak bertele-tele
- Jika butuh informasi → tanya, jangan asumsi
- Jika ada masalah → jelaskan kenapa, bukan hanya "saya fix"
- Jika ada pilihan → jelaskan tradeoff, biarkan owner pilih
- Bahasa Indonesia + istilah teknis English

---

## Checklist Sebelum Push

```
[ ] Build pass
[ ] TypeScript 0 error
[ ] Tidak ada unused code/imports
[ ] Tidak ada hardcoded secrets
[ ] Error handling ada
[ ] Mobile responsive (jika UI)
[ ] Dark mode compatible (jika sudah ada dark mode)
[ ] Commit message natural bahasa Indonesia
```

---

*File ini berlaku untuk semua proyek Torray. AI harus membaca ini sebelum mulai kerja.*
