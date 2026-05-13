export const SITE_CONFIG = {
  name: 'CV. Prabaswara Gandar Prima',
  tagline: 'Sinergi Kebutuhan Bisnis dan Inovasi Digital',
  address: 'Sudimara Selatan, Ciledug, Kota Tangerang, Banten',
  year: 2026,
} as const

export const NAV_LINKS = [
  { href: '/', label: 'Beranda' },
  { href: '/profil', label: 'Profil' },
  { href: '/layanan', label: 'Layanan' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/legalitas', label: 'Legalitas' },
  { href: '/kontak', label: 'Kontak' },
] as const

export const ADMIN_NAV_LINKS = [
  { href: '/kelola-panel/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { href: '/kelola-panel/profil', label: 'Profil', icon: 'Building2' },
  { href: '/kelola-panel/layanan', label: 'Layanan', icon: 'Briefcase' },
  { href: '/kelola-panel/portfolio', label: 'Portfolio', icon: 'FolderOpen' },
  { href: '/kelola-panel/legalitas', label: 'Legalitas', icon: 'FileCheck' },
  { href: '/kelola-panel/media', label: 'Media', icon: 'Image' },
  { href: '/kelola-panel/pesan', label: 'Pesan', icon: 'Mail' },
] as const
