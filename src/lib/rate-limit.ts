/**
 * In-Memory Rate Limiter.
 *
 * Membatasi jumlah request berdasarkan key (biasanya IP + action)
 * dalam window waktu tertentu. Expired entries di-cleanup secara periodik.
 *
 * ⚠️ Catatan: Di environment serverless (Vercel), in-memory Map
 * mungkin ter-reset antar invocation. Untuk production dengan traffic
 * tinggi, pertimbangkan Upstash Redis.
 *
 * @module lib/rate-limit
 */

const rateLimit = new Map<string, { count: number; resetTime: number }>()

/**
 * Cek apakah request masih diizinkan berdasarkan rate limit.
 *
 * @param key - Identifier unik (contoh: `contact:192.168.1.1`)
 * @param maxAttempts - Jumlah maksimum request yang diizinkan
 * @param windowMs - Window waktu dalam milidetik
 * @returns Object berisi `allowed` (boolean) dan `remaining` (sisa kuota)
 *
 * @example
 * ```ts
 * const { allowed } = checkRateLimit(`contact:${ip}`, 3, 60 * 60 * 1000)
 * if (!allowed) return { error: 'Terlalu banyak request' }
 * ```
 */
export function checkRateLimit(
  key: string,
  maxAttempts: number,
  windowMs: number
): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const record = rateLimit.get(key)

  if (!record || now > record.resetTime) {
    rateLimit.set(key, { count: 1, resetTime: now + windowMs })
    return { allowed: true, remaining: maxAttempts - 1 }
  }

  if (record.count >= maxAttempts) {
    return { allowed: false, remaining: 0 }
  }

  record.count++
  return { allowed: true, remaining: maxAttempts - record.count }
}

/**
 * Cleanup expired rate limit entries.
 * Dipanggil secara periodik untuk mencegah memory leak.
 */
function cleanupExpired() {
  const now = Date.now()
  for (const [key, record] of rateLimit) {
    if (now > record.resetTime) {
      rateLimit.delete(key)
    }
  }
}

// Cleanup setiap 5 menit untuk mencegah memory leak
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupExpired, 5 * 60 * 1000)
}
