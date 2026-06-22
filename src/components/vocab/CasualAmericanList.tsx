"use client";

import React from "react";
import { CommandUSAVocab } from "@/data/commandUSAvocab";
import CasualAmericanCard from "./CasualAmericanCard";

type Props = {
  items?: CommandUSAVocab[];
};

export default function CasualAmericanList({ items = [] }: Props) {
  if (items.length === 0) {
    return (
      <div className="p-6 text-(--text-muted)">
        No entries yet. Add items to `src/data/commandUSAvocab.ts`.
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((it, i) => (
          <CasualAmericanCard key={`${it.id ?? "item"}-${i}`} item={it} />
        ))}
      </div>
    </div>
  );
}
