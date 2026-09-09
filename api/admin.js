// api/admin.js
// Serves the teacher/admin page with Gemini key injected
// URL: https://your-app.vercel.app/api/admin

export const config = { runtime: 'edge' };

export default async function handler(req) {
  const base = new URL(req.url).origin;
  const res = await fetch(base + '/shaheen-admin.html');
  if (!res.ok) return new Response('Template not found. Make sure shaheen-admin.html is in /public/', { status: 404 });

  const html = (await res.text()).replace(
    "window.GEMINI_API_KEY || '__GEMINI_KEY__'",
    `'${process.env.GEMINI_API_KEY || ''}'`
  );

  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}
