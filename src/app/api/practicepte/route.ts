import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const n = req.nextUrl.searchParams.get('n');
  if (!n || isNaN(Number(n))) return NextResponse.json({ error: 'Invalid test number' }, { status: 400 });

  try {
    const res = await fetch(`https://practicepteonline.com/ielts-listening-test-${n}/`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      next: { revalidate: 86400 },
    });
    if (!res.ok) return NextResponse.json({ error: `HTTP ${res.status}` }, { status: res.status });
    const html = await res.text();
    return NextResponse.json({ html }, { headers: { 'Cache-Control': 'public, max-age=86400' } });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
