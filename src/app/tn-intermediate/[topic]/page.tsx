import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CheckCircle, XCircle, Lightbulb, Table2 } from 'lucide-react';
import { allGrammarTopics, type TenseTopic, type GrammarTopic, type WrongRight } from '@/data/tnIntermediateGrammar';
import ExerciseSection from '@/components/grammar/ExerciseSection';
import AnnotatedText from '@/components/grammar/AnnotatedText';

type Props = { params: Promise<{ topic: string }> };

export async function generateStaticParams() {
  return allGrammarTopics.map((t) => ({ topic: t.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic } = await params;
  const t = allGrammarTopics.find((x) => x.id === topic);
  if (!t) return { title: 'Not Found' };
  return { title: `${t.title} — TN Intermediate`, description: t.shortDefinition };
}

// ─── Shared sub-components ───────────────────────────────────────────────────

function WrongRightList({ items }: { items: WrongRight[] }) {
  return (
    <div className="space-y-3">
      {items.map((wr, i) => (
        <div key={i} className="bg-(--bg-card) border border-(--border) rounded-xl p-4 space-y-2">
          <div className="flex items-start gap-2">
            <XCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-primary font-semibold uppercase mb-0.5">Salah</p>
              <p className="text-sm font-mono text-(--text) line-through decoration-primary">{wr.wrong}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-primary font-semibold uppercase mb-0.5">Benar</p>
              <p className="text-sm font-mono text-(--text)">{wr.right}</p>
            </div>
          </div>
          <p className="text-xs text-(--text-muted) pl-6">{wr.note}</p>
        </div>
      ))}
    </div>
  );
}

function DataTable({ headers, rows, caption }: { headers: string[]; rows: string[][]; caption?: string }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-(--border)">
      {caption && (
        <p className="text-xs text-(--text-muted) px-4 pt-3 pb-1 font-semibold uppercase tracking-wider">
          {caption}
        </p>
      )}
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-(--bg-secondary)">
            {headers.map((h) => (
              <th key={h} className="text-left text-xs font-bold text-(--text-secondary) uppercase tracking-wide px-4 py-2.5 border-b border-(--border)">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-b border-(--border) last:border-0 hover:bg-(--hover) transition-colors">
              {row.map((cell, ci) => (
                <td key={ci} className={`px-4 py-2.5 text-(--text-secondary) leading-relaxed align-top ${ci === 0 ? 'font-semibold text-primary font-mono text-xs' : 'text-xs'}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Tense Detail ─────────────────────────────────────────────────────────────

function GrammarCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-(--bg-card) border border-(--border) rounded-xl overflow-hidden">
      <div className="px-5 py-3 bg-primary/5 border-b border-(--border)">
        <h3 className="font-semibold text-(--text)">{title}</h3>
      </div>
      <div className="p-5 space-y-1.5">{children}</div>
    </div>
  );
}

function BulletRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 py-0.5">
      <span className="text-primary mt-1.5 shrink-0 text-xs">●</span>
      <div className="flex-1">{children}</div>
    </div>
  );
}

function TenseDetail({ tense }: { tense: TenseTopic }) {
  return (
    <div className="space-y-5">
      {/* Formula */}
      <GrammarCard title="Rumus">
        {(
          [
            { label: '(+)', value: tense.formula.positive, color: 'text-primary bg-primary/10 dark:bg-primary/30 border-primary/60' },
            { label: '(−)', value: tense.formula.negative, color: 'text-primary bg-primary/10 dark:bg-primary/30 border-primary/60' },
            { label: '(?)', value: tense.formula.question, color: 'text-primary bg-primary/10 dark:bg-primary/30 border-primary/60' },
          ] as const
        ).map(({ label, value, color }) => (
          <div key={label} className={`flex items-start gap-3 rounded-lg border px-4 py-2.5 ${color}`}>
            <span className="font-bold text-sm w-6 shrink-0 mt-0.5">{label}</span>
            <code className="text-sm font-mono break-all">{value}</code>
          </div>
        ))}
      </GrammarCard>

      {/* Signal Words */}
      <GrammarCard title="Time Signal">
        <div className="flex flex-wrap gap-2 pt-1">
          {tense.signalWords.map((w) => (
            <span key={w} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-(--bg-secondary) border border-(--border) text-primary font-semibold">
              {w}
            </span>
          ))}
        </div>
      </GrammarCard>

      {/* Usage / Fungsi */}
      <GrammarCard title="Fungsi">
        {tense.usage.map((u, i) => (
          <BulletRow key={i}>
            <p className="text-sm font-semibold text-(--text)">{u.title}</p>
            <AnnotatedText text={u.example} className="text-xs text-primary font-mono mt-0.5 flex flex-wrap items-end gap-x-1 gap-y-1" />
          </BulletRow>
        ))}
      </GrammarCard>

      {/* Examples */}
      <GrammarCard title="Contoh Kalimat">
        {tense.examples.map((ex, i) => (
          <div key={i} className="py-1.5 border-b border-(--border)/50 last:border-0">
            <BulletRow>
              <AnnotatedText text={ex.sentence} className="text-sm font-semibold text-(--text) flex flex-wrap items-end gap-x-1 gap-y-1" />
              {ex.altForm && (
                <p className="text-xs font-mono text-(--text-muted) italic mt-0.5">= {ex.altForm}</p>
              )}
              <p className="text-xs text-(--text-secondary) mt-0.5">{ex.translation}</p>
              {ex.note && (
                <span className="inline-flex items-center gap-1 text-[10px] text-primary/80 bg-primary/5 rounded-md px-2 py-0.5 mt-0.5">
                  <Lightbulb className="w-3 h-3 shrink-0" />
                  {ex.note}
                </span>
              )}
            </BulletRow>
          </div>
        ))}
      </GrammarCard>

      {/* Wrong vs Right */}
      {tense.wrongRight.length > 0 && (
        <GrammarCard title="Kesalahan Umum">
          <WrongRightList items={tense.wrongRight} />
        </GrammarCard>
      )}
    </div>
  );
}

// ─── Grammar Detail (Adjective Clause / Gerund) ───────────────────────────────

function GrammarDetail({ topic }: { topic: GrammarTopic }) {
  return (
    <div className="space-y-8">
      {topic.sections.map((sec, si) => (
        <section key={si} className="space-y-4">
          <h2 className="text-base font-bold text-(--text) border-b border-(--border) pb-2">
            {sec.title}
          </h2>

          {sec.explanation && (
            <p className="text-sm text-(--text-secondary) leading-relaxed">{sec.explanation}</p>
          )}

          {sec.bullets && (
            <ul className="space-y-1.5">
              {sec.bullets.map((b, bi) => (
                <li key={bi} className="flex items-start gap-2 text-sm text-(--text-secondary)">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          )}

          {sec.table && (
            <div className="flex items-start gap-2">
              <Table2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <DataTable headers={sec.table.headers} rows={sec.table.rows} caption={sec.table.caption} />
              </div>
            </div>
          )}

          {sec.examples && sec.examples.length > 0 && (
            <div className="space-y-2">
              {sec.examples.map((ex, ei) => (
                <div key={ei} className="bg-(--bg-card) border border-(--border) rounded-xl px-4 py-3 space-y-1.5">
                  <AnnotatedText text={ex.sentence} className="text-sm font-semibold text-(--text)" />
                  {ex.altForm && (
                    <p className="text-xs font-mono text-(--text-muted) italic">= {ex.altForm}</p>
                  )}
                  <p className="text-xs text-(--text-secondary)">{ex.translation}</p>
                  {ex.note && (
                    <p className="inline-flex items-center gap-1 text-xs text-primary/80 bg-primary/5 rounded-md px-2 py-1 mt-0.5">
                      <Lightbulb className="w-3 h-3 shrink-0" />
                      {ex.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {sec.tip && (
            <div className="flex items-start gap-2.5 bg-primary/10 dark:bg-primary/20 border border-primary/50 rounded-xl px-4 py-3">
              <Lightbulb className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <p className="text-xs text-primary dark:text-primary leading-relaxed">{sec.tip}</p>
            </div>
          )}

          {sec.wrongRight && sec.wrongRight.length > 0 && (
            <WrongRightList items={sec.wrongRight} />
          )}

          {/* Subsections */}
          {sec.subsections && (
            <div className="space-y-5 pl-0 sm:pl-2">
              {sec.subsections.map((sub, subi) => (
                <div key={subi} className="space-y-3">
                  <h3 className="text-sm font-bold text-primary">{sub.subtitle}</h3>

                  {sub.explanation && (
                    <p className="text-sm text-(--text-secondary) leading-relaxed">{sub.explanation}</p>
                  )}

                  {sub.bullets && (
                    <ul className="space-y-1.5">
                      {sub.bullets.map((b, bi) => (
                        <li key={bi} className="flex items-start gap-2 text-sm text-(--text-secondary)">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}

                  {sub.table && (
                    <DataTable headers={sub.table.headers} rows={sub.table.rows} caption={sub.table.caption} />
                  )}

                  {sub.examples && sub.examples.length > 0 && (
                    <div className="space-y-2">
                      {sub.examples.map((ex, ei) => (
                        <div key={ei} className="bg-(--bg-card) border border-(--border) rounded-xl px-4 py-3 space-y-1">
                          <p className="text-sm font-semibold text-(--text)">{ex.sentence}</p>
                          <p className="text-xs text-(--text-secondary)">{ex.translation}</p>
                          {ex.note && (
                            <p className="inline-flex items-center gap-1 text-xs text-primary/80 bg-primary/5 rounded-md px-2 py-1 mt-1">
                              <Lightbulb className="w-3 h-3 shrink-0" />
                              {ex.note}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {sub.tip && (
                    <div className="flex items-start gap-2.5 bg-primary/10 dark:bg-primary/20 border border-primary/50 rounded-xl px-4 py-3">
                      <Lightbulb className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <p className="text-xs text-primary dark:text-primary leading-relaxed">{sub.tip}</p>
                    </div>
                  )}

                  {sub.wrongRight && sub.wrongRight.length > 0 && (
                    <WrongRightList items={sub.wrongRight} />
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function TopicDetailPage({ params }: Props) {
  const { topic } = await params;
  const t = allGrammarTopics.find((x) => x.id === topic);
  if (!t) notFound();

  const currentIndex = allGrammarTopics.findIndex((x) => x.id === topic);
  const prev = allGrammarTopics[currentIndex - 1] ?? null;
  const next = allGrammarTopics[currentIndex + 1] ?? null;

  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fade-in max-w-3xl mx-auto">
      {/* Back */}
      <Link
        href="/tn-intermediate"
        className="inline-flex items-center gap-1.5 text-sm text-(--text-secondary) hover:text-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Semua Materi
      </Link>

      {/* Title */}
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <t.icon className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-(--text)">{t.title}</h1>
          <p className="text-sm text-(--text-secondary) mt-1">{t.shortDefinition}</p>
        </div>
      </div>

      {/* Content */}
      {t.kind === 'tense' ? <TenseDetail tense={t} /> : <GrammarDetail topic={t} />}

      {/* Exercises */}
      <div className="border-t border-(--border) pt-6">
        <ExerciseSection exercises={t.exercises} />
      </div>

      {/* Prev / Next Navigation */}
      <div className="flex gap-3 pt-2">
        {prev && (
          <Link
            href={`/tn-intermediate/${prev.id}`}
            className="flex-1 flex items-center gap-2 border border-(--border) rounded-xl px-4 py-3 hover:bg-(--hover) transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 text-(--text-muted) group-hover:text-primary transition-colors shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] text-(--text-muted) uppercase">Sebelumnya</p>
              <p className="text-sm font-medium text-(--text) group-hover:text-primary transition-colors truncate">{prev.title}</p>
            </div>
          </Link>
        )}
        {next && (
          <Link
            href={`/tn-intermediate/${next.id}`}
            className="flex-1 flex items-center justify-end gap-2 border border-(--border) rounded-xl px-4 py-3 hover:bg-(--hover) transition-colors group text-right"
          >
            <div className="min-w-0">
              <p className="text-[10px] text-(--text-muted) uppercase">Selanjutnya</p>
              <p className="text-sm font-medium text-(--text) group-hover:text-primary transition-colors truncate">{next.title}</p>
            </div>
            <ArrowLeft className="w-4 h-4 text-(--text-muted) group-hover:text-primary transition-colors rotate-180 shrink-0" />
          </Link>
        )}
      </div>
    </div>
  );
}
