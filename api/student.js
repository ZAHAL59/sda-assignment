// api/student.js
// Serves the student page
// URL: https://your-app.vercel.app/api/student

export const config = { runtime: 'edge' };

export default async function handler(req) {
  const base = new URL(req.url).origin;
  const res = await fetch(base + '/shaheen-student.html');
  if (!res.ok) return new Response('Template not found. Make sure shaheen-student.html is in /public/', { status: 404 });

  return new Response(await res.text(), {
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}
