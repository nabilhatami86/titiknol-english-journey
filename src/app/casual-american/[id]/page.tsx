import Link from "next/link";
import commandUSAvocab from "@/data/commandUSAvocab";
import { approxTranslate } from "@/lib/approxTranslate";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props) {
  const p = (await params) as { id: string };
  const item = commandUSAvocab.find((c) => c.id === p.id);
  return {
    title: item
      ? `"${item.sayLike.replace(/"/g, "")}" Meaning — Casual American`
      : "Not found",
  };
}

export default async function Page({ params }: Props) {
  const p = (await params) as { id: string };
  const id = p.id;
  const item = commandUSAvocab.find((c) => c.id === id);

  // Find neighboring items for Prev / Next navigation
  const index = commandUSAvocab.findIndex((c) => c.id === id);
  const prev = index > 0 ? commandUSAvocab[index - 1] : null;
  const next =
    index >= 0 && index < commandUSAvocab.length - 1
      ? commandUSAvocab[index + 1]
      : null;

  if (!item) {
    return (
      <div className="min-h-screen bg-white text-zinc-900 flex flex-col items-center justify-center p-6 antialiased">
        <div className="max-w-md text-center">
          <span className="text-4xl font-extrabold text-zinc-300 block mb-4">
            404
          </span>
          <h1 className="text-2xl font-bold tracking-tight mb-2">
            Vocab Not Found
          </h1>
          <p className="text-zinc-500 mb-6">
            No entry found for{" "}
            <code className="bg-zinc-100 px-1.5 py-0.5 rounded text-sm text-zinc-800">
              “{id}”
            </code>
            .
          </p>
          <Link
            href="/casual-american"
            className="inline-flex items-center justify-center bg-zinc-900 text-white font-medium px-5 py-2.5 rounded-xl hover:bg-zinc-800 transition-colors shadow-sm"
          >
            Back to Directory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900 antialiased selection:bg-indigo-100 selection:text-indigo-900">
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Navigation */}
        <Link
          href="/casual-american"
          className="inline-flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors group mb-10"
        >
          <span className="mr-1.5 transform group-hover:-translate-x-1 transition-transform">
            ←
          </span>
          Back to list
        </Link>

        {/* Hero Section */}
        <header className="mb-8 border-b border-zinc-100 pb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-600 text-xs font-medium uppercase tracking-wider mb-4">
            🇺🇸 Casual American Style
          </div>
          <h1 className="text-4xl font-black tracking-tight text-zinc-950 mb-3 sm:text-5xl">
            {item.sayLike.replace(/"/g, "")}
          </h1>
          <p className="text-lg text-zinc-500 font-medium">
            Instead of saying:{" "}
            <span className="text-zinc-800 italic font-semibold">
              &ldquo;{item.insteadOf}&rdquo;
            </span>
          </p>

          <p className="mt-3 text-sm text-primary font-medium">
            Terjemahan: {item.translation ?? approxTranslate(item.insteadOf)}
          </p>

          {/* Prev / Next controls */}
          <div className="mt-5 flex items-center gap-3">
            {prev ? (
              <Link
                href={`/casual-american/${encodeURIComponent(prev.id)}`}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-(--bg) border border-(--border) text-sm hover:shadow-sm transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="truncate max-w-[10rem]">
                  {prev.sayLike.replace(/"/g, "")}
                </span>
              </Link>
            ) : (
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm text-(--text-muted)">
                No previous
              </div>
            )}

            <div className="flex-1" />

            {next ? (
              <Link
                href={`/casual-american/${encodeURIComponent(next.id)}`}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-(--bg) border border-(--border) text-sm hover:shadow-sm transition"
              >
                <span className="truncate max-w-[10rem]">
                  {next.sayLike.replace(/"/g, "")}
                </span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm text-(--text-muted)">
                No next
              </div>
            )}
          </div>
        </header>

        {/* Content Cards */}
        <main className="space-y-6">
          {/* Meaning / Implies */}
          <section className="p-6 rounded-2xl border border-zinc-100 bg-zinc-50/50 shadow-sm hover:shadow-md hover:border-zinc-200/60 transition-all duration-200">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-3">
              What it implies
            </h2>
            <p className="text-zinc-700 text-lg leading-relaxed font-normal">
              {item.implies}
            </p>
          </section>

          {/* Notes (Conditional) */}
          {item.notes && (
            <section className="p-6 rounded-2xl border border-dashed border-zinc-200 bg-white shadow-sm">
              <h2 className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-3">
                Context & Usage Notes
              </h2>
              <p className="text-zinc-600 leading-relaxed text-[15px]">
                {item.notes}
              </p>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
