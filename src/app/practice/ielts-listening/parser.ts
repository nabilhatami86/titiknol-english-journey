export interface ParsedPart {
  number: number;
  label: string;
  range: [number, number];
  html: string;
}

export interface ParsedTest {
  title: string;
  parts: ParsedPart[];
  answerKey: Record<number, string>;
}

function cleanChildren(el: Element): Element {
  const clone = el.cloneNode(true) as Element;
  clone.querySelectorAll('script, style, iframe, form, input, button, select, .ad, .sharedaddy, .share-buttons').forEach(e => e.remove());
  clone.querySelectorAll('img, svg').forEach(e => e.remove());
  clone.querySelectorAll('a').forEach(a => {
    a.replaceWith((a.ownerDocument || document).createTextNode(a.textContent || ''));
  });
  clone.querySelectorAll('[style]').forEach(e => e.removeAttribute('style'));
  clone.querySelectorAll('[class]').forEach(e => e.removeAttribute('class'));
  return clone;
}

export function isCorrect(n: number, userAnswer: string, answerKey: Record<number, string>): boolean {
  const correct = answerKey[n];
  if (!correct) return false;
  const ua = userAnswer.trim().toLowerCase();
  const ans = correct.trim().toLowerCase();
  if (!ua) return false;
  if (ua === ans) return true;
  // Handle (s) optional: "forest(s)" → matches "forest" or "forests"
  const stripped = ans.replace(/\s*\([^)]+\)/g, '').trim();
  if (ua === stripped) return true;
  // Handle slash alternatives: "A/B" → matches "A" or "B"
  if (ans.includes('/')) return ans.split('/').map(s => s.trim()).includes(ua);
  return false;
}

export function parseListeningTest(html: string): ParsedTest {
  const dom = new DOMParser().parseFromString(html, 'text/html');

  const title =
    dom.querySelector('h1.entry-title')?.textContent?.trim() ||
    dom.querySelector('.entry-header h1')?.textContent?.trim() ||
    dom.querySelector('h1')?.textContent?.trim() ||
    '';

  const contentEl =
    dom.querySelector('.entry-content') ||
    dom.querySelector('.post-content') ||
    dom.querySelector('article') ||
    dom.body;

  const children = Array.from(contentEl.children);
  const answerKey: Record<number, string> = {};

  // ── Find answer section ──────────────────────────────────────────────
  let answerStartIdx = children.length;
  for (let i = 0; i < children.length; i++) {
    const text = (children[i].textContent || '').trim();
    if (/^(show\s*answers?|answers?\s*:?|answer\s*key)$/i.test(text)) {
      answerStartIdx = i + 1;
      break;
    }
  }

  // Extract answers after marker
  for (let i = answerStartIdx; i < children.length; i++) {
    const text = children[i].textContent || '';
    for (const m of text.matchAll(/\b(\d+)[.)]\s+([^\n\r]+)/g)) {
      const n = parseInt(m[1]);
      if (n >= 1 && n <= 40 && !answerKey[n]) {
        answerKey[n] = m[2].trim().replace(/\s+/g, ' ');
      }
    }
  }

  // Fallback: last-occurrence scan
  if (Object.keys(answerKey).length < 20) {
    const fullText = contentEl.textContent || '';
    for (const m of fullText.matchAll(/\b(\d+)[.)]\s+([^\n\r]+)/g)) {
      const n = parseInt(m[1]);
      if (n >= 1 && n <= 40) {
        answerKey[n] = m[2].trim().replace(/\s+/g, ' ');
      }
    }
  }

  // ── Find part markers ────────────────────────────────────────────────
  interface PartMarker { idx: number; number: number; label: string; range: [number, number] }
  const partMarkers: PartMarker[] = [];
  const seenParts = new Set<number>();

  for (let i = 0; i < answerStartIdx; i++) {
    const text = (children[i].textContent || '').trim();
    const m = text.match(/Part\s+(\d)\s*[:\s]*Questions?\s*(\d+)(?:\s*[-–\s]+\s*(\d+))?/i);
    if (m && text.length < 250 && !seenParts.has(parseInt(m[1]))) {
      const partNum = parseInt(m[1]);
      seenParts.add(partNum);
      partMarkers.push({
        idx: i,
        number: partNum,
        label: text.replace(/\s+/g, ' ').trim(),
        range: [parseInt(m[2]), m[3] ? parseInt(m[3]) : parseInt(m[2]) + 9],
      });
    }
  }
  partMarkers.sort((a, b) => a.number - b.number);

  // ── Build parts ──────────────────────────────────────────────────────
  const parts: ParsedPart[] = [];

  if (partMarkers.length === 0) {
    let html = '';
    for (let i = 0; i < answerStartIdx; i++) {
      html += cleanChildren(children[i]).outerHTML + '\n';
    }
    parts.push({ number: 1, label: 'Questions 1-40', range: [1, 40], html });
  } else {
    for (let i = 0; i < partMarkers.length; i++) {
      const startIdx = partMarkers[i].idx;
      const endIdx = i + 1 < partMarkers.length ? partMarkers[i + 1].idx : answerStartIdx;
      let html = '';
      for (let j = startIdx; j < endIdx; j++) {
        html += cleanChildren(children[j]).outerHTML + '\n';
      }
      parts.push({ number: partMarkers[i].number, label: partMarkers[i].label, range: partMarkers[i].range, html });
    }
  }

  return { title, parts, answerKey };
}
