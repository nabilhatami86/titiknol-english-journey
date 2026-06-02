"use client";

import { useMemo, useState } from "react";
import { Search, Languages, BookOpen, Shuffle, Check } from "lucide-react";
import VerbTable from "@/components/verb/VerbTable";
import { irregularVerbs, regularVerbs } from "@/data/verbs";

const VERB_FORMS = [
  {
    label: "V1",
    subtitle: "Base Form",
    desc: "Present simple & after modal verb",
    example: "I walk every day.",
  },
  {
    label: "Vs/es",
    subtitle: "3rd Person Singular",
    desc: "He / She / It — present simple",
    example: "She walks to school.",
  },
  {
    label: "V2",
    subtitle: "Past Form",
    desc: "Simple past — completed action",
    example: "I walked yesterday.",
  },
  {
    label: "V3",
    subtitle: "Past Participle",
    desc: "Perfect tense & passive voice",
    example: "She has gone home.",
  },
  {
    label: "V-ing",
    subtitle: "Present Participle",
    desc: "Continuous tense & gerund",
    example: "I am walking now.",
  },
];

export default function VerbPage() {
  const [search, setSearch] = useState("");
  const [showMeaning, setShowMeaning] = useState(false);

  const filteredIrregular = useMemo(
    () =>
      irregularVerbs.filter(
        (v) =>
          v.base.toLowerCase().includes(search.toLowerCase()) ||
          v.meaning.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
  );

  const filteredRegular = useMemo(
    () =>
      regularVerbs.filter(
        (v) =>
          v.base.toLowerCase().includes(search.toLowerCase()) ||
          v.meaning.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
  );

  const totalVerbs = irregularVerbs.length + regularVerbs.length;

  return (
    <div className="p-4 lg:p-6 max-w-5xl mx-auto space-y-7 animate-fade-in">

      {/* ── Hero card ────────────────────────────────────────────── */}
      <div className="relative rounded-2xl overflow-hidden border border-(--border) bg-(--bg-card)">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent pointer-events-none" />
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-primary/5 pointer-events-none" />
        <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full bg-primary/5 pointer-events-none" />

        <div className="relative p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/15 border border-primary/20 flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-(--text) leading-tight">
                Verb Learning Module
              </h1>
              <p className="text-sm text-(--text-secondary) mt-1.5 leading-relaxed">
                Pelajari bentuk-bentuk verb bahasa Inggris — Regular dan Irregular —
                beserta penggunaannya dalam kalimat.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-(--border)/50">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
              <BookOpen className="w-3 h-3" /> {totalVerbs} total verbs
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
              {irregularVerbs.length} irregular
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-(--bg-secondary) text-(--text-secondary) border border-(--border)">
              {regularVerbs.length} regular
            </span>
          </div>
        </div>
      </div>

      {/* ── Verb Forms section ───────────────────────────────────── */}
      <section className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shuffle className="w-4 h-4 text-primary" />
            </div>
            <h2 className="text-base font-bold text-(--text) tracking-tight">Verb Forms</h2>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-(--border) to-transparent" />
          <span className="text-xs text-(--text-muted) font-medium">5 forms</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {VERB_FORMS.map((f) => (
            <div
              key={f.label}
              className="relative rounded-2xl overflow-hidden border border-(--border) bg-(--bg-card) hover:border-primary/30 transition-colors"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
              <div className="relative p-3.5 space-y-2">
                <span className="inline-flex items-center text-xs font-bold px-2.5 py-0.5 rounded-full border bg-primary/15 text-primary border-primary/25">
                  {f.label}
                </span>
                <p className="text-xs font-bold text-(--text) leading-tight">{f.subtitle}</p>
                <p className="text-xs text-(--text-secondary) leading-snug">{f.desc}</p>
                <p className="text-[11px] text-(--text-muted) italic leading-snug">
                  &ldquo;{f.example}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Search + Controls ────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 text-xs">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary font-semibold border border-primary/20">
            {filteredIrregular.length} irregular
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-(--bg-secondary) text-(--text-secondary) font-semibold border border-(--border)">
            {filteredRegular.length} regular
          </span>
          {search && (
            <span className="text-(--text-muted) font-medium">
              dari {filteredIrregular.length + filteredRegular.length} hasil
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowMeaning((v) => !v)}
            className={`flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl border font-medium transition-all ${
              showMeaning
                ? "bg-primary/15 text-primary border-primary/30"
                : "border-(--border) text-(--text-secondary) hover:border-primary/30 hover:text-primary"
            }`}
          >
            {showMeaning ? <Check size={12} /> : <Languages size={12} />}
            {showMeaning ? "Sembunyikan Arti" : "Tampilkan Arti"}
          </button>

          <div className="relative">
            <Search
              size={13}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted)"
            />
            <input
              type="text"
              placeholder="Cari verb atau arti..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-52 border border-(--border) rounded-xl pl-8 pr-3 py-2 text-xs bg-(--bg-card) text-(--text) placeholder:text-(--text-muted) focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition"
            />
          </div>
        </div>
      </div>

      {/* ── Irregular Verbs ──────────────────────────────────────── */}
      <section className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0">
            <span className="text-white text-[11px] font-bold leading-none">I</span>
          </div>
          <h2 className="text-base font-bold text-(--text) tracking-tight">Irregular Verbs</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-(--border) to-transparent" />
          <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-semibold border border-primary/20">
            {filteredIrregular.length} verbs
          </span>
        </div>

        <div className="bg-(--bg-card) border border-(--border) rounded-2xl overflow-hidden">
          <div className="px-5 py-3.5 bg-gradient-to-r from-primary/[0.06] to-transparent border-b border-(--border)">
            <p className="text-xs text-(--text-secondary)">
              V2 dan V3 tidak mengikuti aturan -ed. Harus dihafal!
              <span className="ml-2 font-medium text-(--text)">
                ex: sing → sang → sung
              </span>
            </p>
          </div>
          <VerbTable verbs={filteredIrregular} type="irregular" showMeaning={showMeaning} />
        </div>
      </section>

      {/* ── Regular Verbs ────────────────────────────────────────── */}
      <section className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-(--text-muted) flex items-center justify-center shrink-0">
            <span className="text-white text-[11px] font-bold leading-none">R</span>
          </div>
          <h2 className="text-base font-bold text-(--text) tracking-tight">Regular Verbs</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-(--border) to-transparent" />
          <span className="text-xs px-2.5 py-1 rounded-full bg-(--bg-secondary) text-(--text-secondary) font-semibold border border-(--border)">
            {filteredRegular.length} verbs
          </span>
        </div>

        <div className="bg-(--bg-card) border border-(--border) rounded-2xl overflow-hidden">
          <div className="px-5 py-3.5 bg-gradient-to-r from-(--border)/30 to-transparent border-b border-(--border)">
            <p className="text-xs text-(--text-secondary)">
              V2 dan V3 dibentuk dengan menambahkan -ed. V2 = V3.
              <span className="ml-2 font-medium text-(--text)">
                ex: work → worked → worked
              </span>
            </p>
          </div>
          <VerbTable verbs={filteredRegular} type="regular" showMeaning={showMeaning} />
        </div>
      </section>
    </div>
  );
}
