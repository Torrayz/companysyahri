/**
 * Zod Validation Schemas — Validasi data untuk semua entity.
 *
 * Setiap schema digunakan di server actions untuk memvalidasi input
 * sebelum operasi database. Ini mencegah data invalid atau berbahaya
 * masuk ke database.
 *
 * @module lib/validations
 */

import { z } from 'zod'

/** Schema validasi form kontak publik. */
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter').max(100),
  email: z.string().email('Email tidak valid'),
  subject: z.string().min(3, 'Subjek minimal 3 karakter').max(200).optional(),
  message: z.string().min(10, 'Pesan minimal 10 karakter').max(2000),
})

/** Schema validasi layanan (services). */
export const serviceSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().max(1000).optional(),
  icon: z.string().max(50).optional(),
  image_url: z.string().url().optional(),
  order: z.number().int().min(0).default(0),
  is_active: z.boolean().default(true),
})

/** Schema validasi portfolio — termasuk kategori `furniture`. */
export const portfolioSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().max(1000).optional(),
  image_url: z.string().url().optional(),
  category: z.enum(['pengadaan', 'konsumsi', 'digital', 'atk', 'furniture']),
  client_name: z.string().max(100).optional(),
  is_active: z.boolean().default(true),
})

/** Schema validasi dokumen legalitas. */
export const legalitySchema = z.object({
  title: z.string().min(2).max(100),
  number: z.string().max(100).optional(),
  description: z.string().max(500).optional(),
  file_url: z.string().optional(),
  order: z.number().int().min(0).default(0),
})

/**
 * Schema validasi profil perusahaan.
 * Mencegah field arbitrary masuk ke database melalui updateProfile().
 */
export const profileSchema = z.object({
  company_name: z.string().min(1, 'Nama perusahaan wajib diisi').max(200),
  tagline: z.string().max(300).optional().nullable(),
  description: z.string().max(2000).optional().nullable(),
  address: z.string().max(500).optional().nullable(),
  phone: z.string().max(30).optional().nullable(),
  email: z.string().email('Email tidak valid').optional().nullable(),
  whatsapp: z.string().max(30).optional().nullable(),
  vision: z.string().max(1000).optional().nullable(),
  mission: z.array(z.string()).optional().nullable(),
})

// ============ Inferred Types ============

export type ContactFormData = z.infer<typeof contactFormSchema>
export type ServiceData = z.infer<typeof serviceSchema>
export type PortfolioData = z.infer<typeof portfolioSchema>
export type LegalityData = z.infer<typeof legalitySchema>
export type ProfileData = z.infer<typeof profileSchema>
