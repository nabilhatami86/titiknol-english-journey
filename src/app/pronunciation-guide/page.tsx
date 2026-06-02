import Link from "next/link";
import { Volume2, ArrowRight } from "lucide-react";
import { pronunciationTopics } from "@/data/pronunciationGuide";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Pronunciation Guide",
  description:
    "Panduan lengkap cara membaca kata-kata Inggris: aturan -ED, -S/-ES, silent letters, bunyi TH, vokal, dan penekanan kata.",
};

const legend = [
  { label: "/t/ — voiceless",      pill: "bg-primary/10 text-primary" },
  { label: "/d/ — voiced",         pill: "bg-primary/10 text-primary" },
  { label: "/ɪd/ — setelah t/d",   pill: "bg-primary/15 text-primary" },
  { label: "Silent",               pill: "bg-primary/20 text-primary" },
  { label: "/θ/ — th tak bersuara", pill: "bg-primary/10 text-primary" },
  { label: "/ð/ — th bersuara",    pill: "bg-primary/10 text-primary" },
  { label: "/ə/ — schwa",          pill: "bg-primary/10 text-primary" },
];

export default function PronunciationGuidePage() {
  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-(--text) flex items-center gap-2">
          <Volume2 className="w-6 h-6 text-primary" />
          Pronunciation Guide
        </h1>
        <p className="text-sm text-(--text-secondary) mt-1">
          Panduan cara membaca kata-kata Inggris dengan benar. Klik topik untuk melihat aturan lengkap
          beserta contoh kata dan tips pengucapan.
        </p>
      </div>

      {/* Kode fonetik */}
      <div className="bg-(--bg-card) border border-(--border) rounded-xl p-4">
        <p className="text-xs font-semibold text-(--text-secondary) uppercase tracking-wider mb-3">
          Simbol yang Digunakan
        </p>
        <div className="flex flex-wrap gap-2">
          {legend.map((c) => (
            <span
              key={c.label}
              className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${c.pill}`}
            >
              {c.label}
            </span>
          ))}
        </div>
        <p className="text-xs text-(--text-muted) mt-3">
          Simbol di dalam tanda <span className="font-mono bg-(--bg-secondary) px-1 rounded">/   /</span> adalah{" "}
          <strong>IPA (International Phonetic Alphabet)</strong> — sistem standar internasional untuk
          menulis pengucapan.
        </p>
      </div>

      {/* Topic cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pronunciationTopics.map((topic) => (
          <Link
            key={topic.id}
            href={`/pronunciation-guide/${topic.id}`}
            className="bg-(--bg-card) border border-(--border) rounded-xl p-5 hover:shadow-lg hover:border-primary/30 transition-all group flex flex-col gap-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <topic.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-(--text) group-hover:text-primary transition-colors leading-tight">
                  {topic.title}
                </h2>
                <p className="text-xs text-(--text-secondary) mt-0.5">{topic.subtitle}</p>
              </div>
            </div>

            <p className="text-sm text-(--text-secondary) leading-relaxed flex-1">
              {topic.shortDescription}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-xs text-(--text-muted)">
                {topic.rules.length} aturan · {topic.rules.reduce((a, r) => a + r.examples.length, 0)} contoh
              </span>
              <div className="flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                Pelajari
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Tips umum */}
      <div className="bg-(--bg-card) border border-(--border) rounded-xl p-5">
        <h2 className="text-base font-semibold text-(--text) mb-3">
          Tips Umum Pengucapan
        </h2>
        <ul className="space-y-2 text-sm text-(--text-secondary)">
          <li className="flex gap-2">
            <span className="text-primary font-bold shrink-0">1.</span>
            Selalu cek pengucapan kata baru di kamus — jangan tebak dari ejaannya saja.
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold shrink-0">2.</span>
            Pelajari <strong>IPA</strong> dasar — tanda seperti /θ/, /ð/, /ə/ sangat membantu membaca kamus.
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold shrink-0">3.</span>
            Latihan <strong>shadowing</strong>: dengarkan native speaker lalu tiru segera — ini melatih intonasi dan ritme.
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold shrink-0">4.</span>
            Rekam suara sendiri dan bandingkan dengan pengucapan asli — cara paling efektif memperbaiki kesalahan.
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold shrink-0">5.</span>
            Fokus pada <strong>word stress</strong> (penekanan suku kata) — salah stress sering lebih membingungkan daripada salah bunyi.
          </li>
        </ul>
      </div>
    </div>
  );
}
