/**
 * Next.js Middleware — Server-side auth guard untuk route admin.
 *
 * Setiap request ke `/kelola-panel/*` (kecuali halaman login `/kelola-panel`)
 * akan dicek session Supabase-nya. Jika belum login, user diredirect ke
 * halaman login admin.
 *
 * @see https://supabase.com/docs/guides/auth/server-side/nextjs
 */

import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  const response = NextResponse.next({
    request: { headers: request.headers },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  // getUser() bersifat secure — memverifikasi JWT token ke Supabase Auth server.
  // Jangan gunakan getSession() untuk auth guard karena bisa di-spoof.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Jika user belum login dan mengakses halaman admin (bukan login page),
  // redirect ke halaman login admin.
  const { pathname } = request.nextUrl

  const isAdminRoute =
    pathname.startsWith('/kelola-panel/') || pathname.startsWith('/api/admin/')
  const isLoginPage = pathname === '/kelola-panel'

  if (!user && isAdminRoute && !isLoginPage) {
    const loginUrl = new URL('/kelola-panel', request.url)
    return NextResponse.redirect(loginUrl)
  }

  // Jika user sudah login dan mengakses login page, redirect ke dashboard.
  if (user && isLoginPage) {
    const dashboardUrl = new URL('/kelola-panel/dashboard', request.url)
    return NextResponse.redirect(dashboardUrl)
  }

  return response
}

export const config = {
  matcher: [
    // Proteksi semua route admin (kecuali static assets)
    '/kelola-panel/:path*',
    '/api/admin/:path*',
  ],
}
