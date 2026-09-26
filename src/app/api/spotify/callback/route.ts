import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

// One-time manual step: Malik visits /api/spotify/login, authorizes on Spotify,
// lands back here with a ?code=, which we exchange for a refresh token. That
// refresh token then gets set as the SPOTIFY_REFRESH_TOKEN env var in Vercel —
// this route is only ever used once per token setup, never on every page load.
export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const error = req.nextUrl.searchParams.get("error");
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (error) {
    return html(`<p>Spotify authorization was denied: ${escapeHtml(error)}</p>`);
  }
  if (!code) {
    return html(`<p>No authorization code received.</p>`);
  }
  if (!clientId || !clientSecret) {
    return html(`<p>SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET aren't configured yet.</p>`);
  }

  const redirectUri = `${req.nextUrl.origin}/api/spotify/callback`;
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    return html(`<p>Token exchange failed: ${escapeHtml(JSON.stringify(data))}</p>`);
  }

  return html(`
    <p>Success! Copy this refresh token and set it as <code>SPOTIFY_REFRESH_TOKEN</code> in Vercel:</p>
    <textarea readonly style="width:100%;height:100px;font-family:monospace;padding:8px;">${escapeHtml(String(data.refresh_token ?? ""))}</textarea>
    <p style="color:#888">You can close this tab once it's saved. This code exchange only works once per authorization.</p>
  `);
}

// Every value interpolated into the page comes from outside (the query
// string or Spotify's response), so it's escaped: an ?error= value would
// otherwise be reflected into HTML on this domain (CodeQL js/reflected-xss).
function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function html(body: string) {
  return new NextResponse(
    `<html><body style="font-family:sans-serif;max-width:600px;margin:60px auto;padding:0 20px;">${body}</body></html>`,
    { headers: { "Content-Type": "text/html; charset=utf-8", "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'" } }
  );
}
