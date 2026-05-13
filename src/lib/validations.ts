import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter').max(100),
  email: z.string().email('Email tidak valid'),
  subject: z.string().min(3, 'Subjek minimal 3 karakter').max(200).optional(),
  message: z.string().min(10, 'Pesan minimal 10 karakter').max(2000),
})

export const serviceSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().max(1000).optional(),
  icon: z.string().max(50).optional(),
  image_url: z.string().url().optional(),
  order: z.number().int().min(0).default(0),
  is_active: z.boolean().default(true),
})

export const portfolioSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().max(1000).optional(),
  image_url: z.string().url().optional(),
  category: z.enum(['pengadaan', 'konsumsi', 'digital', 'atk']),
  client_name: z.string().max(100).optional(),
  is_active: z.boolean().default(true),
})

export const legalitySchema = z.object({
  title: z.string().min(2).max(100),
  number: z.string().max(100).optional(),
  description: z.string().max(500).optional(),
  file_url: z.string().optional(),
  order: z.number().int().min(0).default(0),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
export type ServiceData = z.infer<typeof serviceSchema>
export type PortfolioData = z.infer<typeof portfolioSchema>
export type LegalityData = z.infer<typeof legalitySchema>
