import type { NextConfig } from "next";

// The browser never needs a third-party origin on this site -- confirmed by
// crawling every page in a fresh browser: Spotify album art is fetched
// server-side through next/image, the chat and news/now-playing widgets call
// this site's own /api routes, and the chat's generated charts arrive as
// data: images. So everything is locked to 'self'. That also means an image
// URL smuggled into a chat reply can't be used to leak the conversation to
// an outside server -- img-src blocks the request.
// script-src keeps 'unsafe-inline' because the App Router streams its own
// inline scripts; nonces would force every page to render dynamically.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  // Only in production: the dev server relies on eval for hot reload.
  ...(process.env.NODE_ENV === "production" ? [{ key: "Content-Security-Policy", value: csp }] : []),
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.scdn.co" }, // Spotify album art
    ],
  },
  poweredByHeader: false,
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
