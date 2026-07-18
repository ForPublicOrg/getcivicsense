/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  // Pure-static site: no remote images, no DB, no third-party origins. The CSP
  // is deliberately far tighter than the sibling's (no ads / Turnstile / Firebase).
  async headers() {
    const csp = [
      "default-src 'self'",
      // 'unsafe-inline' only for the tiny theme-bootstrap script; no eval, no third parties.
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "font-src 'self' data:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ].join('; ');

    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        // Prebuilt payloads change only on deploy - let the CDN serve them long and stale.
        source: '/:file(search-index.json)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=3600, stale-while-revalidate=86400' }],
      },
      {
        source: '/content/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=3600, stale-while-revalidate=86400' }],
      },
    ];
  },
};

export default nextConfig;
