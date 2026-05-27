export interface ParsedPassage {
  number: number;
  title: string;
  range: [number, number];
  html: string;
  textHtml: string;
  questionsHtml: string;
  sections: ParsedQSection[];
}

export interface ParsedReadingTest {
  title: string;
  passages: ParsedPassage[];
  answerKey: Record<number, string>;
}

export type QuestionType = 'tfng' | 'yn' | 'text';

export interface ParsedQuestionItem {
  number: number;
  text: string;
}

export interface ParsedQSection {
  label: string;
  instruction: string;
  type: QuestionType;
  questions: ParsedQuestionItem[];
  range: [number, number];
}

export interface QuestionSection {
  label: string;
  instruction: string;
  range: [number, number];
}

function detectQType(instruction: string): QuestionType {
  const lower = instruction.toLowerCase();
  if (lower.includes('true') && lower.includes('false')) return 'tfng';
  if (lower.includes('yes') && lower.includes('no') && lower.includes('not given')) return 'yn';
  return 'text';
}

// Split inline text like "1 text.2 text.3 text..." into individual questions
function splitInline(text: string, start: number, end: number): ParsedQuestionItem[] {
  const positions: Array<{ n: number; pos: number }> = [];

  for (let n = start; n <= end; n++) {
    const ns = n.toString();
    // Match: (start OR non-digit) + number + (space or punctuation+space)
    const re = new RegExp(`(?:^|[^\\d])(${ns})(?=\\s|[.)\\s]|$)`, 'g');
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(text)) !== null) {
      const numPos = m.index + m[0].length - ns.length;
      positions.push({ n, pos: numPos });
      break;
    }
  }

  if (positions.length < 1) return [];
  positions.sort((a, b) => a.pos - b.pos);

  return positions.map((p, i) => {
    const numEnd = p.pos + p.n.toString().length;
    // skip separator char after number
    const sep = text[numEnd];
    const textStart = sep && /[.) ]/.test(sep) ? numEnd + 1 : numEnd;
    const textEnd = i + 1 < positions.length ? positions[i + 1].pos : text.length;
    return { number: p.n, text: text.slice(textStart, textEnd).replace(/\s+/g, ' ').trim() };
  });
}

export function parseQSections(questionsHtml: string): ParsedQSection[] {
  if (!questionsHtml) return [];
  const dom = new DOMParser().parseFromString(questionsHtml, 'text/html');
  const children = Array.from(dom.body.children);

  interface RawSection { label: string; start: number; end: number; els: Element[] }
  const raws: RawSection[] = [];
  let cur: RawSection | null = null;

  for (const el of children) {
    const text = (el.textContent || '').trim();
    const m = text.match(/^Questions?\s+(\d+)\s*[-–]\s*(\d+)/i);
    if (m) {
      if (cur) raws.push(cur);
      cur = { label: text, start: parseInt(m[1]), end: parseInt(m[2]), els: [] };
    } else if (cur) {
      cur.els.push(el);
    }
  }
  if (cur) raws.push(cur);
  if (raws.length === 0) return [];

  return raws.map(raw => {
    let questions: ParsedQuestionItem[] = [];
    let instruction = '';

    for (const el of raw.els) {
      const text = (el.textContent || '').trim();

      // Per-element numbered: "N. text", "N) text", "N  text"
      const m = text.match(/^(\d+)[.)]\s*([\s\S]+)/) || text.match(/^(\d+)\s{1,3}(.+)/);
      if (m) {
        const n = parseInt(m[1]);
        if (n >= raw.start && n <= raw.end) {
          questions.push({ number: n, text: m[2].trim() });
          continue;
        }
      }

      // <ol><li> numbered list
      if (el.tagName === 'OL') {
        el.querySelectorAll('li').forEach((li, idx) => {
          const n = raw.start + idx;
          if (n <= raw.end && !questions.find(q => q.number === n))
            questions.push({ number: n, text: (li.textContent || '').trim() });
        });
        continue;
      }

      // Table cells
      if (el.tagName === 'TABLE') {
        el.querySelectorAll('td').forEach(td => {
          const t = (td.textContent || '').trim();
          const tm = t.match(/^(\d+)[.) ]*(.*)$/);
          if (tm) {
            const n = parseInt(tm[1]);
            if (n >= raw.start && n <= raw.end && !questions.find(q => q.number === n))
              questions.push({ number: n, text: tm[2].trim() });
          }
        });
        continue;
      }

      // Instruction text (before first numbered item)
      if (!instruction && text.length > 5 && !text.match(/^(true|false|yes|no|\d)/i)) {
        instruction = text.length > 220 ? text.slice(0, 220) + '…' : text;
      }
    }

    // If not enough questions found, try inline splitting on combined text
    const expected = raw.end - raw.start + 1;
    if (questions.length < expected) {
      const combined = raw.els.map(el => (el.textContent || '')).join(' ').replace(/\s+/g, ' ').trim();
      const inline = splitInline(combined, raw.start, raw.end);
      if (inline.length > questions.length) questions = inline;
    }

    // Final fallback: numbered placeholders
    if (questions.length === 0) {
      for (let i = raw.start; i <= raw.end; i++) questions.push({ number: i, text: '' });
    }

    questions.sort((a, b) => a.number - b.number);
    return {
      label: raw.label,
      instruction,
      type: detectQType(instruction),
      questions,
      range: [raw.start, raw.end] as [number, number],
    };
  });
}

export function extractQuestionSections(html: string): QuestionSection[] {
  const dom = new DOMParser().parseFromString(html, 'text/html');
  const sections: QuestionSection[] = [];
  const seen = new Set<string>();

  dom.querySelectorAll('h3, h4, p, strong, b').forEach(el => {
    const text = (el.textContent || '').trim();
    const m = text.match(/^Questions?\s+(\d+)\s*[-–]\s*(\d+)/i);
    if (!m) return;
    const start = parseInt(m[1]);
    const end = parseInt(m[2]);
    if (start < 1 || end > 40 || start > end) return;
    const key = `${start}-${end}`;
    if (seen.has(key)) return;
    seen.add(key);

    let instruction = '';
    let next: Element | null = el.nextElementSibling ?? el.parentElement?.nextElementSibling ?? null;
    for (let i = 0; i < 4 && next; i++) {
      const t = (next.textContent || '').trim();
      if (t.match(/^Questions?\s+\d+/i)) break;
      if (t.length > 8 && t.length < 250 && !t.match(/^\d+[.)]/)) { instruction = t; break; }
      next = next.nextElementSibling;
    }

    sections.push({ label: `Questions ${start}–${end}`, instruction, range: [start, end] });
  });

  return sections.sort((a, b) => a.range[0] - b.range[0]);
}

export function isCorrectReading(n: number, userAnswer: string, answerKey: Record<number, string>): boolean {
  const correct = answerKey[n];
  if (!correct) return false;
  const ua = userAnswer.trim().toLowerCase();
  const ans = correct.trim().toLowerCase();
  if (!ua) return false;
  if (ua === ans) return true;
  const stripped = ans.replace(/\s*\([^)]+\)/g, '').trim();
  if (ua === stripped) return true;
  if (ans.includes('/')) return ans.split('/').map(s => s.trim()).includes(ua);
  return false;
}

function extractRange(text: string): [number, number] {
  const nums: number[] = [];
  for (const m of text.matchAll(/Questions?\s+(\d+)(?:\s*[-–]\s*(\d+))?/gi)) {
    const n1 = parseInt(m[1]);
    if (n1 >= 1 && n1 <= 40) nums.push(n1);
    if (m[2]) { const n2 = parseInt(m[2]); if (n2 >= 1 && n2 <= 40) nums.push(n2); }
  }
  for (const m of text.matchAll(/\((\d+)\)/g)) {
    const n = parseInt(m[1]);
    if (n >= 1 && n <= 40) nums.push(n);
  }
  if (nums.length === 0) return [1, 40];
  return [Math.min(...nums), Math.max(...nums)];
}

function cleanEl(el: Element): Element {
  const clone = el.cloneNode(true) as Element;
  clone.querySelectorAll('script, style, iframe, .ad, .sharedaddy, form, input, button').forEach(e => e.remove());
  clone.querySelectorAll('img, svg').forEach(e => e.remove());
  clone.querySelectorAll('a').forEach(a => {
    a.replaceWith((a.ownerDocument || document).createTextNode(a.textContent || ''));
  });
  clone.querySelectorAll('[style]').forEach(e => e.removeAttribute('style'));
  clone.querySelectorAll('[class]').forEach(e => e.removeAttribute('class'));
  return clone;
}

export function parseReadingTest(html: string): ParsedReadingTest {
  const dom = new DOMParser().parseFromString(html, 'text/html');

  const title =
    dom.querySelector('h1.entry-title')?.textContent?.trim() ||
    dom.querySelector('.entry-header h1')?.textContent?.trim() ||
    dom.querySelector('h1')?.textContent?.trim() || '';

  const contentEl =
    dom.querySelector('.entry-content') ||
    dom.querySelector('.post-content') ||
    dom.querySelector('article') ||
    dom.body;

  const children = Array.from(contentEl.children);

  // ── Answer key ────────────────────────────────────────────────────────
  const answerKey: Record<number, string> = {};

  let answerStartIdx = children.length;
  for (let i = 0; i < children.length; i++) {
    const text = (children[i].textContent || '').trim();
    if (/^(show\s*answers?|answers?\s*:?|answer\s*key)$/i.test(text)) {
      answerStartIdx = i + 1;
      break;
    }
  }

  for (let i = answerStartIdx; i < children.length; i++) {
    const text = children[i].textContent || '';
    for (const m of text.matchAll(/\b(\d+)[.)]\s+([^\n\r]+)/g)) {
      const n = parseInt(m[1]);
      if (n >= 1 && n <= 40 && !answerKey[n]) answerKey[n] = m[2].trim().replace(/\s+/g, ' ');
    }
  }

  if (Object.keys(answerKey).length < 20) {
    const fullText = contentEl.textContent || '';
    for (const m of fullText.matchAll(/\b(\d+)[.)]\s+([^\n\r]+)/g)) {
      const n = parseInt(m[1]);
      if (n >= 1 && n <= 40) answerKey[n] = m[2].trim().replace(/\s+/g, ' ');
    }
  }

  // ── Passage headings (h3 that are not "Questions N-N") ────────────────
  interface PassageMarker { idx: number; title: string }
  const passageMarkers: PassageMarker[] = [];

  for (let i = 0; i < answerStartIdx; i++) {
    const el = children[i];
    if (el.tagName === 'H3' || el.tagName === 'H2') {
      const text = (el.textContent || '').trim();
      if (!text.match(/^Questions?\s+\d+/i) && !text.match(/^Reading\s+Passage/i) && text.length > 3) {
        passageMarkers.push({ idx: i, title: text });
      }
    }
  }

  // Fallback: look for "Reading Passage N" in paragraphs
  if (passageMarkers.length === 0) {
    for (let i = 0; i < answerStartIdx; i++) {
      const text = (children[i].textContent || '').trim();
      if (text.match(/^Reading\s+Passage\s+\d+/i)) {
        passageMarkers.push({ idx: i, title: text });
      }
    }
  }

  // ── Build passages ────────────────────────────────────────────────────
  const passages: ParsedPassage[] = [];

  function buildPassageHtml(startIdx: number, endIdx: number): { html: string; textHtml: string; questionsHtml: string } {
    let html = '';
    let textHtml = '';
    let questionsHtml = '';
    let inQuestions = false;
    for (let j = startIdx; j < endIdx; j++) {
      const text = (children[j].textContent || '').trim();
      const cleaned = cleanEl(children[j]).outerHTML + '\n';
      html += cleaned;
      if (!inQuestions && text.match(/^Questions?\s+\d+/i)) inQuestions = true;
      if (inQuestions) questionsHtml += cleaned;
      else textHtml += cleaned;
    }
    return { html, textHtml, questionsHtml };
  }

  if (passageMarkers.length === 0) {
    const { html, textHtml, questionsHtml } = buildPassageHtml(0, answerStartIdx);
    const range = extractRange(html);
    passages.push({ number: 1, title: 'Reading Passage', range, html, textHtml, questionsHtml, sections: parseQSections(questionsHtml) });
  } else {
    for (let i = 0; i < passageMarkers.length; i++) {
      const startIdx = passageMarkers[i].idx;
      const endIdx = i + 1 < passageMarkers.length ? passageMarkers[i + 1].idx : answerStartIdx;
      const { html, textHtml, questionsHtml } = buildPassageHtml(startIdx, endIdx);
      const range = extractRange(html);
      passages.push({ number: i + 1, title: passageMarkers[i].title, range, html, textHtml, questionsHtml, sections: parseQSections(questionsHtml) });
    }
  }

  return { title, passages, answerKey };
}
