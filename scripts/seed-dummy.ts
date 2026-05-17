/**
 * Seed script — Inserts dummy data for testing.
 * Run: npx tsx scripts/seed-dummy.ts
 */

import { readFileSync } from 'fs'
import { resolve } from 'path'
import { createClient } from '@supabase/supabase-js'

// Load .env.local manually (no dotenv dependency)
const envPath = resolve(process.cwd(), '.env.local')
const envContent = readFileSync(envPath, 'utf-8')
for (const line of envContent.split('\n')) {
  const trimmed = line.trim()
  if (!trimmed || trimmed.startsWith('#')) continue
  const eqIdx = trimmed.indexOf('=')
  if (eqIdx === -1) continue
  const key = trimmed.slice(0, eqIdx)
  const val = trimmed.slice(eqIdx + 1)
  process.env[key] = val
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !serviceKey) {
  console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceKey)

async function seed() {
  console.log('🌱 Seeding dummy data...\n')

  // ── Services ─────────────────────────
  const services = [
    { title: 'Pengadaan ATK', description: 'Penyediaan alat tulis kantor berkualitas lengkap untuk instansi pemerintah, perusahaan swasta, dan UMKM dengan harga kompetitif.', icon: 'PenTool', order: 1, is_active: true },
    { title: 'IT Hardware', description: 'Pengadaan perangkat IT seperti laptop, desktop, printer, dan networking equipment dari brand terpercaya dengan garansi resmi.', icon: 'Monitor', order: 2, is_active: true },
    { title: 'Furniture Kantor', description: 'Penyediaan furniture kantor ergonomis meliputi meja, kursi, lemari arsip, dan partisi ruangan untuk kenyamanan kerja optimal.', icon: 'Armchair', order: 3, is_active: true },
    { title: 'Konsumsi Event', description: 'Layanan katering dan konsumsi untuk berbagai event: rapat, seminar, workshop, dan acara perusahaan dengan menu variatif.', icon: 'UtensilsCrossed', order: 4, is_active: true },
    { title: 'Website & Aplikasi', description: 'Pembuatan website company profile, landing page, dan aplikasi bisnis menggunakan teknologi modern yang responsif dan SEO-friendly.', icon: 'Globe', order: 5, is_active: true },
  ]

  const { error: sErr } = await supabase.from('services').insert(services)
  if (sErr) console.error('  ❌ Services:', sErr.message)
  else console.log(`  ✅ ${services.length} services`)

  // ── Portfolios ───────────────────────
  const portfolios = [
    { title: 'Pengadaan ATK Dinas Pendidikan', description: 'Penyediaan 500+ item alat tulis kantor untuk Dinas Pendidikan Kota Tangerang.', category: 'pengadaan', client_name: 'Dinas Pendidikan Kota Tangerang', is_active: true },
    { title: 'Supply Laptop ASUS untuk PT Maju Bersama', description: 'Pengadaan 25 unit laptop ASUS Vivobook untuk operasional kantor cabang baru.', category: 'pengadaan', client_name: 'PT Maju Bersama', is_active: true },
    { title: 'Katering Seminar Nasional', description: 'Penyediaan konsumsi 200 pax untuk seminar nasional tentang transformasi digital.', category: 'konsumsi', client_name: 'Universitas Muhammadiyah Tangerang', is_active: true },
    { title: 'Coffee Break & Lunch Rapat Koordinasi', description: 'Layanan coffee break dan makan siang 3 hari berturut-turut untuk rapat koordinasi tahunan.', category: 'konsumsi', client_name: 'Bank Banten', is_active: true },
    { title: 'Website Company Profile PT Karya Digital', description: 'Pembuatan website company profile modern dengan fitur CMS, portofolio, dan form kontak terintegrasi.', category: 'digital', client_name: 'PT Karya Digital Nusantara', is_active: true },
    { title: 'Furniture Kantor Baru Startup', description: 'Penyediaan 30 set meja-kursi kerja ergonomis dan 5 unit lemari arsip untuk startup teknologi.', category: 'furniture', client_name: 'TechSpace Indonesia', is_active: true },
    { title: 'Pengadaan Printer & Scanner', description: 'Supply 10 unit printer multifungsi dan 5 unit scanner high-speed untuk digitalisasi dokumen.', category: 'atk', client_name: 'Kelurahan Sudimara Selatan', is_active: true },
  ]

  const { error: pErr } = await supabase.from('portfolios').insert(portfolios)
  if (pErr) console.error('  ❌ Portfolios:', pErr.message)
  else console.log(`  ✅ ${portfolios.length} portfolios`)

  // ── Legality ─────────────────────────
  const legality = [
    { title: 'Surat Izin Usaha Perdagangan (SIUP)', number: 'SIUP/2026/001', description: 'Izin usaha resmi untuk kegiatan perdagangan.', order: 1 },
    { title: 'Nomor Induk Berusaha (NIB)', number: 'NIB.2026.001.234567', description: 'Nomor identitas berusaha yang diterbitkan melalui OSS.', order: 2 },
    { title: 'Akta Pendirian Perusahaan', number: 'AHU-2026-001', description: 'Akta notaris pendirian CV. Prabaswara Gandar Prima.', order: 3 },
    { title: 'Tanda Daftar Perusahaan (TDP)', number: 'TDP/2026/BTN/001', description: 'Bukti pendaftaran resmi perusahaan.', order: 4 },
    { title: 'NPWP Perusahaan', number: '01.234.567.8-411.000', description: 'Nomor Pokok Wajib Pajak perusahaan.', order: 5 },
  ]

  const { error: lErr } = await supabase.from('legality').insert(legality)
  if (lErr) console.error('  ❌ Legality:', lErr.message)
  else console.log(`  ✅ ${legality.length} legality docs`)

  // ── Messages (test) ──────────────────
  const messages = [
    { name: 'Budi Santoso', email: 'budi@example.com', subject: 'Permintaan Penawaran ATK', message: 'Selamat pagi, kami dari instansi pemerintah ingin meminta penawaran untuk pengadaan ATK tahun 2026. Mohon bisa dikirimkan katalog dan daftar harga terbaru. Terima kasih.', is_read: false },
    { name: 'Siti Rahmawati', email: 'siti@perusahaan.co.id', subject: 'Konsultasi Pembuatan Website', message: 'Halo tim Prabaswara, perusahaan kami sedang membutuhkan website company profile. Apakah bisa dibuatkan proposal dan estimasi biaya? Kami ingin website yang modern dan mobile-friendly.', is_read: false },
    { name: 'Ahmad Fauzi', email: 'ahmad.fauzi@gmail.com', subject: 'Penawaran Furniture Kantor', message: 'Saya tertarik dengan layanan furniture kantor. Kami membutuhkan sekitar 20 set meja kursi untuk kantor baru di Tangerang. Mohon info ketersediaan dan harga.', is_read: true },
  ]

  const { error: mErr } = await supabase.from('messages').insert(messages)
  if (mErr) console.error('  ❌ Messages:', mErr.message)
  else console.log(`  ✅ ${messages.length} messages`)

  // ── Company Profile ──────────────────
  const profile = {
    company_name: 'CV. Prabaswara Gandar Prima',
    tagline: 'Sinergi Kebutuhan Bisnis dan Inovasi Digital',
    description: 'CV. Prabaswara Gandar Prima adalah perusahaan yang bergerak di bidang pengadaan barang & jasa kantor, konsumsi event, dan pembuatan website & aplikasi. Kami berkomitmen memberikan solusi terbaik untuk setiap kebutuhan bisnis Anda.',
    address: 'Jl. Sudimara Selatan No. 10, Ciledug, Kota Tangerang, Banten 15151',
    phone: '021-12345678',
    email: 'info@prabaswara.id',
    whatsapp: '6281314234712',
    vision: 'Menjadi mitra terpercaya dalam penyediaan barang, jasa, dan solusi digital bagi setiap pelaku bisnis di Indonesia.',
    mission: [
      'Menyediakan produk dan jasa berkualitas tinggi dengan harga kompetitif',
      'Membangun hubungan jangka panjang berdasarkan kepercayaan dan integritas',
      'Mengadopsi teknologi terkini untuk meningkatkan efisiensi layanan',
      'Memberikan pelayanan yang responsif, profesional, dan solutif',
    ],
  }

  const { data: existing } = await supabase.from('company_profile').select('id').limit(1).single()
  if (existing) {
    await supabase.from('company_profile').update(profile).eq('id', existing.id)
    console.log('  ✅ Company profile updated')
  } else {
    await supabase.from('company_profile').insert(profile)
    console.log('  ✅ Company profile created')
  }

  // ── Cleanup: Remove "sad" dummy service ──
  const { data: sadService } = await supabase.from('services').select('id').eq('title', 'sad').single()
  if (sadService) {
    await supabase.from('services').delete().eq('id', sadService.id)
    console.log('  🗑️  Removed "sad" dummy service')
  }

  console.log('\n✨ Done! Refresh your browser to see the changes.')
}

seed().catch(console.error)
