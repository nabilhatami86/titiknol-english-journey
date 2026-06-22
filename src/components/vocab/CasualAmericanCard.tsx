"use client";

import Link from "next/link";
import React from "react";
import type { CommandUSAVocab } from "@/data/commandUSAvocab";
import { approxTranslate } from "@/lib/approxTranslate";

type Props = {
  item: CommandUSAVocab;
};

export default function CasualAmericanCard({ item }: Props) {
  return (
    <Link
      href={`/casual-american/${encodeURIComponent(item.id)}`}
      className="group block bg-(--bg-card) border border-(--border) rounded-xl p-4 hover:shadow-lg hover:border-primary/30 transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-(--text) group-hover:text-primary truncate">
            {item.sayLike.replace(/"/g, "")}
          </h3>
          <p className="text-xs text-(--text-muted) mt-1 italic">
            Instead of: {item.insteadOf}
          </p>
          <p className="text-sm text-primary mt-2 italic">
            Terjemahan: {item.translation ?? approxTranslate(item.insteadOf)}
          </p>
        </div>
      </div>

      <p className="text-sm text-(--text-secondary) mt-3 line-clamp-3">
        {item.implies}
      </p>

      {item.notes && (
        <p className="text-xs text-(--text-muted) mt-3 italic">{item.notes}</p>
      )}
    </Link>
  );
}
