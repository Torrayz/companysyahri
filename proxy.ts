import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function proxy(request: NextRequest) {
  const response = NextResponse.next()

  // Security headers
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' https://*.supabase.co data: blob:; connect-src 'self' https://*.supabase.co; frame-src https://maps.google.com;"
  )
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains')
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')

  // Supabase session refresh
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
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // Protect admin routes
  const isAdminRoute = request.nextUrl.pathname.startsWith('/kelola-panel')
  const isLoginPage = request.nextUrl.pathname === '/kelola-panel'

  if (isAdminRoute && !isLoginPage && !user) {
    return NextResponse.redirect(new URL('/kelola-panel', request.url))
  }

  // Redirect to dashboard if already logged in and on login page
  if (isLoginPage && user) {
    return NextResponse.redirect(new URL('/kelola-panel/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
