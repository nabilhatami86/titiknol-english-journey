"use client";

import { Fragment, useState } from "react";
import { ChevronDown } from "lucide-react";
import { VerbItem } from "@/data/verbs";
import { cn } from "@/lib/utils";

type VerbTableProps = {
  verbs: VerbItem[];
  type: "irregular" | "regular";
  showMeaning: boolean;
};

const FORM_BADGE = "bg-primary/10 text-primary";

function getContextualMeanings(verb: VerbItem) {
  const m = verb.meaning;
  return [
    { form: "V1",    word: verb.v1,  label: "Present / I-You-We-They", context: m },
    { form: "Vs/es", word: verb.v1,  label: "Present / He-She-It",     context: m },
    { form: "V2",    word: verb.v2,  label: "Simple Past",             context: `${m} (lampau)` },
    { form: "V3",    word: verb.v3,  label: "Past Participle",         context: `sudah ${m} / di-${m}` },
    { form: "V-ing", word: verb.ing, label: "Present Participle",      context: `sedang ${m}` },
  ];
}

export default function VerbTable({ verbs, type, showMeaning }: VerbTableProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggle = (base: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(base)) next.delete(base);
      else next.add(base);
      return next;
    });
  };

  const isIrregular = type === "irregular";

  if (verbs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-14 gap-2">
        <div className="w-10 h-10 rounded-full bg-(--bg-secondary) flex items-center justify-center">
          <span className="text-(--text-muted) text-lg">🔍</span>
        </div>
        <p className="text-sm text-(--text-muted)">Tidak ada verb yang ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-(--bg-secondary)">
            <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-(--text-muted)">
              Base
            </th>
            {showMeaning && (
              <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-primary/60">
                Arti
              </th>
            )}
            <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-(--text-muted)">
              V1
            </th>
            <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-(--text-muted)">
              V2
            </th>
            <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-(--text-muted)">
              V3
            </th>
            <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-(--text-muted)">
              V-ing
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-(--border)">
          {verbs.map((verb, i) => {
            const isOpen = expanded.has(verb.base);
            const rows = getContextualMeanings(verb);
            return (
              <Fragment key={`${verb.base}-${i}`}>
                <tr
                  onClick={() => toggle(verb.base)}
                  className={cn(
                    "hover:bg-(--hover) transition-colors cursor-pointer select-none",
                    isOpen && (isIrregular ? "bg-primary/5" : "bg-(--bg-secondary)/50"),
                  )}
                >
                  <td className={cn(
                    "px-5 py-3 font-bold",
                    isIrregular ? "text-primary" : "text-(--text)",
                  )}>
                    <span className="flex items-center gap-1.5">
                      {verb.base}
                      <ChevronDown
                        size={12}
                        className={cn(
                          "text-(--text-muted) transition-transform duration-200 shrink-0",
                          isOpen && "rotate-180",
                        )}
                      />
                    </span>
                  </td>
                  {showMeaning && (
                    <td className="px-4 py-3 text-primary/75 text-xs italic">
                      {verb.meaning}
                    </td>
                  )}
                  <td className="px-4 py-3 text-(--text)">{verb.v1}</td>
                  <td className="px-4 py-3 text-(--text-secondary)">{verb.v2}</td>
                  <td className="px-4 py-3 text-(--text-secondary)">{verb.v3}</td>
                  <td className="px-4 py-3 text-(--text-secondary)">{verb.ing}</td>
                </tr>

                {isOpen && (
                  <tr>
                    <td
                      colSpan={showMeaning ? 6 : 5}
                      className="px-5 py-4 border-t bg-primary/[0.03] border-primary/15"
                    >
                      <p className="text-[10px] text-(--text-muted) uppercase tracking-widest font-bold mb-3">
                        Konteks Penggunaan
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                        {rows.map((r) => (
                          <div
                            key={r.form}
                            className="bg-(--bg-card) border border-(--border) rounded-xl p-2.5 space-y-1 hover:border-primary/30 transition-colors"
                          >
                            <div className="flex items-center gap-1.5">
                              <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded-md", FORM_BADGE)}>
                                {r.form}
                              </span>
                              <span className="text-xs font-bold text-(--text)">{r.word}</span>
                            </div>
                            <p className="text-[11px] text-(--text-secondary) leading-snug">{r.label}</p>
                            <p className="text-[11px] text-(--text-muted) italic leading-snug">{r.context}</p>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
