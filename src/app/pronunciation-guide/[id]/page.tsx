import { notFound } from "next/navigation";
import Link from "next/link";
import { Volume2, ArrowLeft, ChevronRight, Lightbulb, AlertCircle, XCircle, CheckCircle } from "lucide-react";
import { pronunciationTopics } from "@/data/pronunciationGuide";
import { type Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return pronunciationTopics.map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const topic = pronunciationTopics.find((t) => t.id === id);
  if (!topic) return { title: "Not Found" };
  return {
    title: `${topic.title} — Pronunciation Guide`,
    description: topic.shortDescription,
  };
}

const soundColors: Record<string, string> = {
  "/t/":           "bg-primary/10 text-primary",
  "/d/":           "bg-primary/10 text-primary",
  "/ɪd/":          "bg-primary/15 text-primary",
  "/s/":           "bg-primary/10 text-primary",
  "/z/":           "bg-primary/10 text-primary",
  "/ɪz/":          "bg-primary/15 text-primary",
  "/θ/":           "bg-primary/10 text-primary",
  "/ð/":           "bg-primary/10 text-primary",
  "/ə/":           "bg-primary/10 text-primary",
  "/uː/ atau /ʊ/": "bg-primary/10 text-primary",
  "/iː/ atau /ɛ/": "bg-primary/10 text-primary",
  "/oʊ/ atau /aʊ/": "bg-primary/10 text-primary",
  "´xx":           "bg-primary/10 text-primary",
  "x´x":           "bg-primary/15 text-primary",
  "xx´":           "bg-primary/20 text-primary",
  "/k/":           "bg-primary/10 text-primary",
  "/g/":           "bg-primary/10 text-primary",
  "/dʒ/":          "bg-primary/10 text-primary",
  "❌ K":          "bg-primary/20 text-primary font-semibold",
  "❌ B":          "bg-primary/20 text-primary font-semibold",
  "❌ GH":         "bg-primary/20 text-primary font-semibold",
  "❌ W":          "bg-primary/20 text-primary font-semibold",
  "❌ L":          "bg-primary/20 text-primary font-semibold",
  "❌ H":          "bg-primary/20 text-primary font-semibold",
  "❌ P":          "bg-primary/20 text-primary font-semibold",
  "❌ T":          "bg-primary/20 text-primary font-semibold",
};

function getSoundColor(sound: string) {
  return soundColors[sound] ?? "bg-primary/10 text-primary";
}

export default async function PronunciationTopicPage({ params }: Props) {
  const { id } = await params;
  const topic = pronunciationTopics.find((t) => t.id === id);

  if (!topic) notFound();

  const currentIndex = pronunciationTopics.findIndex((t) => t.id === id);
  const prevTopic = currentIndex > 0 ? pronunciationTopics[currentIndex - 1] : null;
  const nextTopic =
    currentIndex < pronunciationTopics.length - 1
      ? pronunciationTopics[currentIndex + 1]
      : null;

  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fade-in max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm text-(--text-muted)">
        <Link
          href="/pronunciation-guide"
          className="hover:text-primary transition-colors flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" />
          Pronunciation Guide
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-(--text-secondary) font-medium">{topic.title}</span>
      </div>

      {/* Header */}
      <div className="bg-(--bg-card) border border-(--border) rounded-xl p-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <topic.icon className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-(--text) flex items-center gap-2">
              <Volume2 className="w-6 h-6 text-primary" />
              {topic.title}
            </h1>
            <p className="text-sm text-(--text-secondary) mt-0.5">{topic.subtitle}</p>
            <p className="text-sm text-(--text-secondary) mt-3 leading-relaxed">{topic.intro}</p>
          </div>
        </div>
      </div>

      {/* Rules */}
      <div className="space-y-6">
        {topic.rules.map((rule, idx) => (
          <div
            key={idx}
            className="bg-(--bg-card) border border-(--border) rounded-xl overflow-hidden"
          >
            {/* Rule header */}
            <div className="p-4 border-b border-(--border) flex items-start gap-3">
              <span
                className={`text-xs font-bold px-3 py-1.5 rounded-lg shrink-0 mt-0.5 font-mono ${getSoundColor(rule.sound)}`}
              >
                {rule.soundLabel}
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-(--text)">{rule.context}</p>
                <p className="text-sm text-(--text-secondary) mt-1 leading-relaxed">
                  {rule.description}
                </p>
              </div>
            </div>

            {/* Examples table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-(--bg-secondary)">
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-(--text-muted) uppercase tracking-wider w-1/4">
                      Kata
                    </th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-(--text-muted) uppercase tracking-wider w-1/3">
                      Fonetik (IPA)
                    </th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-(--text-muted) uppercase tracking-wider w-1/4">
                      Arti
                    </th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-(--text-muted) uppercase tracking-wider">
                      Catatan
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-(--border)">
                  {rule.examples.map((ex, exIdx) => (
                    <tr
                      key={exIdx}
                      className="hover:bg-(--hover) transition-colors"
                    >
                      <td className="px-4 py-3 font-semibold text-(--text)">{ex.word}</td>
                      <td className="px-4 py-3 font-mono text-primary text-sm">{ex.phonetic}</td>
                      <td className="px-4 py-3 text-(--text-secondary)">{ex.translation}</td>
                      <td className="px-4 py-3 text-(--text-muted) text-xs">{ex.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* Tips */}
      {topic.tips.length > 0 && (
        <div className="bg-(--bg-card) border border-(--border) rounded-xl p-5">
          <h2 className="text-base font-semibold text-(--text) flex items-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5 text-primary" />
            Tips & Trik
          </h2>
          <ul className="space-y-2">
            {topic.tips.map((tip, idx) => (
              <li key={idx} className="flex gap-2 text-sm text-(--text-secondary)">
                <span className="text-primary font-bold shrink-0">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Common Mistakes */}
      {topic.commonMistakes && topic.commonMistakes.length > 0 && (
        <div className="bg-(--bg-card) border border-(--border) rounded-xl p-5">
          <h2 className="text-base font-semibold text-(--text) flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-primary" />
            Kesalahan Umum
          </h2>
          <div className="space-y-3">
            {topic.commonMistakes.map((mistake, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-(--border) overflow-hidden"
              >
                <div className="flex items-stretch">
                  <div className="bg-primary/5 border-r border-(--border) px-4 py-3 flex flex-col gap-1 min-w-0 flex-1">
                    <span className="text-xs font-semibold text-primary/70 uppercase tracking-wider flex items-center gap-1">
                      <XCircle className="w-3 h-3" /> Salah
                    </span>
                    <span className="font-semibold text-(--text)">{mistake.word}</span>
                    <span className="font-mono text-primary/70 text-sm">
                      {mistake.wrong}
                    </span>
                  </div>
                  <div className="bg-primary/10 px-4 py-3 flex flex-col gap-1 min-w-0 flex-1">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Benar
                    </span>
                    <span className="font-mono text-primary text-sm">
                      {mistake.right}
                    </span>
                    <span className="text-xs text-(--text-secondary) mt-1">{mistake.tip}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4 pt-2">
        {prevTopic ? (
          <Link
            href={`/pronunciation-guide/${prevTopic.id}`}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-(--border) bg-(--bg-card) hover:border-primary/30 hover:shadow-sm transition-all text-sm font-medium text-(--text-secondary) hover:text-(--text)"
          >
            <ArrowLeft className="w-4 h-4" />
            <div>
              <div className="text-xs text-(--text-muted)">Sebelumnya</div>
              <div>{prevTopic.title}</div>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextTopic ? (
          <Link
            href={`/pronunciation-guide/${nextTopic.id}`}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-(--border) bg-(--bg-card) hover:border-primary/30 hover:shadow-sm transition-all text-sm font-medium text-(--text-secondary) hover:text-(--text) ml-auto"
          >
            <div className="text-right">
              <div className="text-xs text-(--text-muted)">Berikutnya</div>
              <div>{nextTopic.title}</div>
            </div>
            <ChevronRight className="w-4 h-4" />
          </Link>
        ) : (
          <Link
            href="/pronunciation-guide"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-(--border) bg-(--bg-card) hover:border-primary/30 hover:shadow-sm transition-all text-sm font-medium text-(--text-secondary) hover:text-(--text) ml-auto"
          >
            Kembali ke Daftar
            <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
