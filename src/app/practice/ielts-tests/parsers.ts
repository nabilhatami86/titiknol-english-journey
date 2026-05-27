import type { TestItem, QuestionSection, TestDetail } from '@/types/mini-ielts';

export function parseTestList(html: string): { tests: TestItem[]; totalPages: number } {
  const dom = new DOMParser().parseFromString(html, 'text/html');

  const tests: TestItem[] = Array.from(dom.querySelectorAll('.thumbnail-w')).flatMap((el) => {
    const photoLink = el.querySelector('.photo a');
    const href = photoLink?.getAttribute('href') || '';
    const match = href.match(/^\/(\d+)\/listening\/(.+)$/);
    if (!match) return [];

    const id = match[1];
    const slug = match[2];
    const img = el.querySelector('.photo img')?.getAttribute('src') || '';
    const titleEl = el.querySelector('.caption h5 a');
    const title = titleEl?.getAttribute('title') || titleEl?.textContent?.trim() || '';
    const total = el.querySelector('[data-total]')?.getAttribute('data-total') || '?';

    const questionTypes = Array.from(el.querySelectorAll('.extra-info li')).flatMap((li) => {
      const text = li.textContent?.replace(/\s+/g, ' ').trim() || '';
      const parts = text.split('-').map((s) => s.trim());
      if (parts.length < 2) return [];
      return [{ count: parts[0], type: parts.slice(1).join('-').trim() }];
    });

    return [{ id, slug, title, image: img, total, questionTypes, url: `http://mini-ielts.com${href}` }];
  });

  const pageMatch = html.match(/Page \d+ of (\d+)/);
  const totalPages = pageMatch ? parseInt(pageMatch[1]) : 13;

  return { tests, totalPages };
}

export function parseTestDetail(html: string, url: string): TestDetail {
  const dom = new DOMParser().parseFromString(html, 'text/html');

  const rawTitle = dom.querySelector('title')?.textContent || '';
  const title = rawTitle.replace(/\s*[-–]\s*IELTS listening practice test\s*/i, '').trim();
  const image = dom.querySelector('meta[property="og:image"]')?.getAttribute('content') || '';

  const sections: QuestionSection[] = [];

  dom.querySelectorAll('.exam-section.panel').forEach((section) => {
    if (section.classList.contains('text-center')) return;

    section.querySelectorAll('.workspace, .collapse').forEach((el) => el.remove());

    section.querySelectorAll('select').forEach((sel) => {
      const num = (sel.getAttribute('id') || '').replace('q', '');
      sel.replaceWith(dom.createTextNode(`[ Q${num} ]`));
    });

    section.querySelectorAll('input').forEach((inp) => {
      const t = inp.getAttribute('type') || '';
      if (t === 'text') {
        inp.replaceWith(dom.createTextNode('______'));
      } else {
        inp.remove();
      }
    });

    const heading = section.querySelector('h2')?.textContent?.trim() || '';
    const paragraphs: string[] = Array.from(section.querySelectorAll('p'))
      .map((p) => p.textContent?.replace(/ /g, ' ').replace(/\s+/g, ' ').trim() || '')
      .filter((t) => t.length > 0);

    if (heading || paragraphs.length > 0) {
      sections.push({ heading, paragraphs });
    }
  });

  return { title, image, url, sections };
}
