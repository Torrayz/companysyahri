/**
 * TypeScript Type Definitions — Interfaces untuk semua entity database.
 *
 * Setiap interface merepresentasikan satu tabel di Supabase.
 * Digunakan untuk type-safety di seluruh aplikasi.
 *
 * @module types/index
 */

export interface Profile {

  id: string
  company_name: string
  tagline: string | null
  description: string | null
  address: string | null
  phone: string | null
  email: string | null
  whatsapp: string | null
  vision: string | null
  mission: string[] | null
  logo_url: string | null
  updated_at: string
}

export interface Service {
  id: string
  title: string
  description: string | null
  icon: string | null
  image_url: string | null
  order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Portfolio {
  id: string
  title: string
  description: string | null
  image_url: string | null
  category: string
  client_name: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Legality {
  id: string
  title: string
  number: string | null
  description: string | null
  file_url: string | null
  order: number
  created_at: string
}

export interface Message {
  id: string
  name: string
  email: string
  subject: string | null
  message: string
  is_read: boolean
  created_at: string
}
