import { NextResponse } from 'next/server';

export interface BBCEpisode {
  title: string;
  description: string;
  audioUrl: string;
  pageUrl: string;
  pubDate: string;
  duration: string;
  imageUrl: string;
}

const RSS_SOURCES = [
  {
    name: 'BBC 6 Minute English',
    url: 'https://podcasts.files.bbci.co.uk/p02pc9zn.rss',
    accent: 'British',
    level: 'B1–B2',
  },
  {
    name: 'BBC The English We Speak',
    url: 'https://podcasts.files.bbci.co.uk/p02pc9lt.rss',
    accent: 'British',
    level: 'B2–C1',
  },
];

function extractCDATA(str: string): string {
  return str.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim();
}

function getTagContent(xml: string, tag: string): string {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  if (!match) return '';
  return extractCDATA(match[1].trim());
}

function getAttr(xml: string, tag: string, attr: string): string {
  const match = xml.match(new RegExp(`<${tag}[^>]*\\s${attr}="([^"]*)"`, 'i'));
  return match ? match[1] : '';
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/&#39;/g, "'").replace(/&quot;/g, '"').trim();
}

function parseItems(rssText: string): BBCEpisode[] {
  const items = rssText.match(/<item>([\s\S]*?)<\/item>/gi) ?? [];
  return items.slice(0, 20).map(item => {
    const title = stripHtml(getTagContent(item, 'title'));
    const rawDesc = getTagContent(item, 'description') || getTagContent(item, 'itunes:summary');
    const description = stripHtml(rawDesc).slice(0, 300) + (rawDesc.length > 300 ? '…' : '');
    const audioUrl = getAttr(item, 'enclosure', 'url');
    const pageUrl = extractCDATA(getTagContent(item, 'link'));
    const pubDate = getTagContent(item, 'pubDate');
    const duration = getTagContent(item, 'itunes:duration');
    const imageUrl =
      getAttr(item, 'itunes:image', 'href') ||
      getAttr(item, 'media:thumbnail', 'url') || '';

    return { title, description, audioUrl, pageUrl, pubDate, duration, imageUrl };
  }).filter(ep => ep.title && ep.audioUrl);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sourceIdx = parseInt(searchParams.get('source') ?? '0', 10);
  const source = RSS_SOURCES[sourceIdx] ?? RSS_SOURCES[0];

  try {
    const res = await fetch(source.url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; podcast-fetcher/1.0)' },
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`RSS fetch failed: ${res.status}`);

    const text = await res.text();
    const episodes = parseItems(text);

    return NextResponse.json({
      source: source.name,
      accent: source.accent,
      level: source.level,
      episodes,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
