'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  ExternalLink, Loader2, BookOpen, Headphones,
  ArrowLeft, AlertCircle, ImageOff,
} from 'lucide-react';
import { Pagination } from '@/components/ui/Pagination';
import type { QuestionType, TestItem, QuestionSection, TestDetail } from '@/types/mini-ielts';
import { parseTestList, parseTestDetail } from './parsers';

// ── Sub-components (page-specific) ───────────────────────────────────────────

function TypeBadge({ qt }: { qt: QuestionType }) {
  return (
    <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-primary/10 text-primary border border-primary/20">
      {qt.count}× {qt.type}
    </span>
  );
}

function TestCard({ test, onClick }: { test: TestItem; onClick: () => void }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="border border-(--border) rounded-xl overflow-hidden bg-(--bg-card) hover:shadow-md transition-shadow flex flex-col">
      <div className="relative aspect-video bg-(--bg-secondary) overflow-hidden">
        {!imgError && test.image ? (
          <img
            src={test.image}
            alt={test.title}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageOff className="w-8 h-8 text-(--text-muted)" />
          </div>
        )}
        <span className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
          {test.total} Q
        </span>
      </div>

      <div className="p-3 flex flex-col flex-1 gap-2">
        <h3 className="font-semibold text-(--text) text-sm line-clamp-2 leading-snug">{test.title}</h3>

        <div className="flex flex-wrap gap-1">
          {test.questionTypes.map((qt, i) => <TypeBadge key={i} qt={qt} />)}
        </div>

        <div className="flex gap-2 mt-auto pt-1">
          <button
            onClick={onClick}
            className="flex-1 flex items-center justify-center gap-1.5 bg-primary text-white text-xs font-medium px-3 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            <BookOpen className="w-3.5 h-3.5" />
            View Questions
          </button>
          <a
            href={test.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 border border-(--border) text-(--text-secondary) text-xs px-3 py-2 rounded-lg hover:bg-(--bg-secondary) transition-colors"
            title="Open on mini-ielts.com"
          >
            <Headphones className="w-3.5 h-3.5" />
            Audio
          </a>
        </div>
      </div>
    </div>
  );
}

function SectionBlock({ section }: { section: QuestionSection }) {
  const isOption = (p: string) => /^[A-F]\s/.test(p);
  const isQuestion = (p: string) => /^\d+[\s.]/.test(p);

  return (
    <div className="border border-(--border) rounded-xl p-4 bg-(--bg-secondary)">
      {section.heading && (
        <h3 className="font-bold text-primary text-base mb-3">{section.heading}</h3>
      )}
      <div className="space-y-1.5 text-sm text-(--text)">
        {section.paragraphs.map((p, i) => {
          if (isOption(p)) {
            return (
              <div key={i} className="flex gap-2 ml-4">
                <span className="font-bold text-primary shrink-0">{p[0]}</span>
                <span>{p.slice(1).trim()}</span>
              </div>
            );
          }
          if (isQuestion(p)) {
            return <p key={i} className="font-medium text-(--text) mt-3">{p}</p>;
          }
          return <p key={i} className="text-(--text-secondary) italic text-xs">{p}</p>;
        })}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function IeltsTestsPage() {
  const [view, setView] = useState<'list' | 'test'>('list');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(13);
  const [tests, setTests] = useState<TestItem[]>([]);
  const [selectedTest, setSelectedTest] = useState<TestDetail | null>(null);
  const [loadingList, setLoadingList] = useState(false);
  const [loadingTest, setLoadingTest] = useState(false);
  const [listError, setListError] = useState('');
  const [testError, setTestError] = useState('');

  const fetchList = useCallback(async (p: number) => {
    setLoadingList(true);
    setListError('');
    try {
      const res = await fetch(`/api/mini-ielts?type=list&page=${p}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      const { tests: t, totalPages: tp } = parseTestList(data.html as string);
      setTests(t);
      setTotalPages(tp);
    } catch (e) {
      setListError((e as Error).message || 'Failed to load tests');
    } finally {
      setLoadingList(false);
    }
  }, []);

  useEffect(() => {
    fetchList(page);
  }, [page, fetchList]);

  const handleTestClick = async (test: TestItem) => {
    setLoadingTest(true);
    setTestError('');
    setView('test');
    setSelectedTest(null);
    try {
      const res = await fetch(`/api/mini-ielts?type=test&id=${test.id}&slug=${test.slug}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setSelectedTest(parseTestDetail(data.html as string, test.url));
    } catch (e) {
      setTestError((e as Error).message || 'Failed to load test');
    } finally {
      setLoadingTest(false);
    }
  };

  const handlePageChange = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ── Test Detail View ──────────────────────────────────────────────────────

  if (view === 'test') {
    return (
      <div className="max-w-3xl mx-auto p-4 md:p-6">
        <button
          onClick={() => { setView('list'); setSelectedTest(null); }}
          className="flex items-center gap-2 text-(--text-secondary) hover:text-(--text) text-sm mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to test list
        </button>

        {loadingTest && (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-(--text-secondary)">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span>Loading questions…</span>
          </div>
        )}

        {testError && (
          <div className="flex items-center gap-3 bg-primary/5 border border-primary/20 text-(--text-secondary) rounded-xl p-4">
            <AlertCircle className="w-5 h-5 shrink-0 text-primary" />
            <span>{testError}</span>
          </div>
        )}

        {selectedTest && (
          <div>
            {selectedTest.image && (
              <div className="rounded-xl overflow-hidden aspect-video mb-4 border border-(--border)">
                <img
                  src={selectedTest.image}
                  alt={selectedTest.title}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
              <div>
                <h1 className="text-xl font-bold text-(--text)">{selectedTest.title}</h1>
                <p className="text-sm text-(--text-muted) mt-1">IELTS Listening Practice · Find audio below</p>
              </div>
              <a
                href={selectedTest.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-primary text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:opacity-90 transition-opacity shrink-0"
              >
                <Headphones className="w-4 h-4" />
                Listen on mini-ielts.com
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="space-y-4">
              {selectedTest.sections.map((section, i) => (
                <SectionBlock key={i} section={section} />
              ))}
            </div>

            <div className="mt-8 p-4 bg-(--bg-secondary) border border-(--border) rounded-xl text-center">
              <p className="text-sm text-(--text-secondary)">
                To listen to the audio for this test, visit{' '}
                <a
                  href={selectedTest.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-medium hover:underline"
                >
                  mini-ielts.com ↗
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── List View ─────────────────────────────────────────────────────────────

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-(--text)">Mini-IELTS Listening Tests</h1>
        <p className="text-sm text-(--text-secondary) mt-1">
          Browse 150+ IELTS listening practice tests. Click a test to read questions, then find the audio on mini-ielts.com.
        </p>
      </div>

      {loadingList && (
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-(--text-secondary)">
          <Loader2 className="w-8 h-8 animate-spin" />
          <span>Loading tests…</span>
        </div>
      )}

      {listError && (
        <div className="flex items-center gap-3 bg-primary/5 border border-primary/20 text-(--text-secondary) rounded-xl p-4 mb-6">
          <AlertCircle className="w-5 h-5 shrink-0 text-primary" />
          <div>
            <p className="font-medium">Failed to load tests</p>
            <p className="text-sm">{listError}</p>
          </div>
          <button
            onClick={() => fetchList(page)}
            className="ml-auto text-sm text-primary underline hover:no-underline"
          >
            Retry
          </button>
        </div>
      )}

      {!loadingList && tests.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {tests.map((test) => (
              <TestCard key={test.id} test={test} onClick={() => handleTestClick(test)} />
            ))}
          </div>

          <div className="mt-4 text-center text-xs text-(--text-muted)">
            Page {page} of {totalPages} · {tests.length} tests shown
          </div>

          <Pagination page={page} totalPages={totalPages} onChange={handlePageChange} className="mt-4" />
        </>
      )}
    </div>
  );
}
