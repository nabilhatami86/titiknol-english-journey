"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Home,
  Layers,
  Heart,
  GraduationCap,
  BookText,
  Zap,
  Palette,
  Wind,
  MessageSquare,
  MessageCircle,
  BookMarked,
  Calendar,
  Briefcase,
  X,
  ScrollText,
  Languages,
  Volume2,
  Library,
  PenLine,
  BarChart2,
  FileText,
  ChevronDown,
  ChevronRight,
  Youtube,
  Radio,
  Globe,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useVocabStore } from "@/store/useVocabStore";
import { categories } from "@/data/vocabulary";
import Image from "next/image";
import { useState } from "react";

const iconMap: Record<string, React.ElementType> = {
  BookOpen,
  Zap,
  Palette,
  Wind,
  MessageSquare,
  Calendar,
  Briefcase,
};

type NavChild = {
  href: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
};
type NavItem =
  | {
      href: string;
      label: string;
      icon: React.ElementType;
      badge?: string;
      children?: never;
      groupKey?: never;
    }
  | {
      href?: never;
      label: string;
      icon: React.ElementType;
      children: NavChild[];
      groupKey: string;
    };

const navSections: { title: string; emoji?: string; items: NavItem[] }[] = [
  {
    title: "",
    items: [{ href: "/", label: "Dashboard", icon: Home }],
  },
  {
    title: "Learning",
    emoji: "",
    items: [
      { href: "/vocab", label: "All Vocabulary", icon: BookOpen },
      { href: "/verb", label: "Verb Library", icon: Layers },
      { href: "/grammar-guide", label: "Grammar Guide", icon: BookMarked },
      { href: "/pronunciation-guide", label: "Pronunciation", icon: Volume2 },
      { href: "/story", label: "Stories & Readings", icon: ScrollText },
    ],
  },
  {
    title: "Practice",
    emoji: "",
    items: [
      { href: "/practice", label: "Practice Hub", icon: GraduationCap },
      {
        href: "/practice/conversations",
        label: "Daily Conversations",
        icon: MessageCircle,
      },
      {
        groupKey: "tn",
        label: "TN Course",
        icon: Sparkles,
        children: [
          {
            href: "/tn-basic-cource",
            label: "TN Basic",
            icon: BookText,
            badge: "Beginner",
          },
          {
            href: "/tn-intermediate",
            label: "TN Intermediate",
            icon: GraduationCap,
            badge: "Mid",
          },
          {
            href: "/tn-advance",
            label: "TN Advance",
            icon: Layers,
            badge: "Adv",
          },
        ],
      },
      {
        groupKey: "writing",
        label: "Writing Practice",
        icon: FileText,
        children: [
          {
            href: "/practice/writing",
            label: "AI Writing Check",
            icon: PenLine,
          },
          {
            href: "/practice/latihan-surat",
            label: "Latihan Surat",
            icon: FileText,
          },
          {
            href: "/practice/ielts-writing",
            label: "IELTS Writing",
            icon: BarChart2,
          },
        ],
      },
      {
        groupKey: "vocab",
        label: "Vocab Practice",
        icon: BookOpen,
        children: [
          {
            href: "/practice/vocab-trainer",
            label: "Vocab Trainer",
            icon: BookMarked,
          },
          {
            href: "/tn-intermediate/vocab",
            label: "Vocab Bank (Int.)",
            icon: Library,
          },
        ],
      },
      {
        groupKey: "listening",
        label: "Listening Practice",
        icon: Volume2,
        children: [
          {
            href: "/practice/ielts-listening",
            label: "IELTS Listening",
            icon: Youtube,
          },
          {
            href: "/practice/ielts-tests",
            label: "Mini-IELTS Tests",
            icon: BookMarked,
          },
          {
            href: "/practice/general-listening",
            label: "BBC Listening",
            icon: Radio,
          },
        ],
      },
      {
        href: "/practice/toefl-reading",
        label: "TOEFL Reading",
        icon: FileText,
      },
      {
        href: "/practice/ielts-resources",
        label: "IELTS Resources",
        icon: Globe,
      },
      { href: "/practice/toefl", label: "TOEFL Practice", icon: GraduationCap },
    ],
  },
  {
    title: "Tools",
    items: [
      { href: "/translate", label: "Translate", icon: Languages },
      { href: "/favorites", label: "Favorites", icon: Heart },
    ],
  },
];

const GROUP_PATHS: Record<string, string[]> = {
  writing: [
    "/practice/writing",
    "/practice/essay-writing",
    "/practice/latihan-surat",
    "/practice/ielts-writing",
  ],
  vocab: ["/practice/vocab-trainer", "/tn-intermediate/vocab"],
  tn: ["/tn-basic-cource", "/tn-intermediate", "/tn-advance"],
  listening: [
    "/practice/ielts-listening",
    "/practice/ielts-tests",
    "/practice/general-listening",
  ],
  reading: ["/practice/toefl-reading"],
};

const BADGE_COLORS: Record<string, string> = {
  Beginner: "bg-primary/10 text-primary",
  Mid:      "bg-primary/15 text-primary",
  Adv:      "bg-primary/20 text-primary font-bold",
};

export function Sidebar() {
  const pathname = usePathname();
  const sidebarOpen = useVocabStore((s) => s.sidebarOpen);
  const setSidebarOpen = useVocabStore((s) => s.setSidebarOpen);
  const [catOpen, setCatOpen] = useState(false);

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const [key, paths] of Object.entries(GROUP_PATHS)) {
      initial[key] = paths.some((p) => pathname.startsWith(p));
    }
    return initial;
  });

  const toggleGroup = (key: string) =>
    setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }));

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const isGroupActive = (key: string) =>
    (GROUP_PATHS[key] ?? []).some((p) => pathname.startsWith(p));

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-(--sidebar-bg) border-r border-(--border) transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto flex flex-col",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* ── Brand header ─────────────────────────────────────── */}
        <div className="relative overflow-hidden border-b border-(--border)">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/12 via-primary/5 to-transparent pointer-events-none" />
          <div className="relative flex items-center justify-between px-4 py-4">
            <Link
              href="/"
              className="flex items-center gap-3 min-w-0"
              onClick={() => setSidebarOpen(false)}
            >
              <div className="w-9 h-9 rounded-xl overflow-hidden ring-2 ring-primary/20 shrink-0 shadow-sm">
                <Image
                  src="/download.jpg"
                  alt="Logo"
                  width={36}
                  height={36}
                  className="w-9 h-9 object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-sm text-(--text) truncate leading-tight">
                  TitikNolJourney
                </p>
                <p className="text-[10px] text-primary/70 font-medium tracking-wide">
                  English Course
                </p>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg hover:bg-(--hover) text-(--text-muted) hover:text-(--text) transition-colors shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── Navigation ───────────────────────────────────────── */}
        <nav className="flex-1 overflow-y-auto py-3 px-2.5 space-y-1">
          {navSections.map((section) => (
            <div key={section.title || "home"}>
              {section.title && (
                <div className="flex items-center gap-2 px-2 pt-3 pb-1.5">
                  <div className="w-1 h-3 rounded-full bg-primary/50 shrink-0" />
                  <p className="text-[10px] font-bold text-primary/60 uppercase tracking-widest">
                    {section.title}
                  </p>
                  <div className="flex-1 h-px bg-primary/10" />
                </div>
              )}

              <div className="space-y-px">
                {section.items.map((item) => {
                  const Icon = item.icon;

                  if (item.children) {
                    const isOpen = openGroups[item.groupKey] ?? false;
                    const active = isGroupActive(item.groupKey);
                    return (
                      <div key={item.label}>
                        <button
                          onClick={() => toggleGroup(item.groupKey)}
                          className={cn(
                            "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150",
                            active
                              ? "bg-primary/10 text-primary"
                              : "text-(--text-secondary) hover:bg-(--hover) hover:text-(--text)",
                          )}
                        >
                          <span
                            className={cn(
                              "flex items-center justify-center w-6 h-6 rounded-md shrink-0",
                              active
                                ? "bg-primary/15 text-primary"
                                : "bg-(--bg-secondary) text-(--text-muted)",
                            )}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </span>
                          <span className="flex-1 text-left text-[13px]">
                            {item.label}
                          </span>
                          <span
                            className={cn(
                              "transition-transform duration-200",
                              isOpen ? "rotate-0" : "-rotate-90",
                            )}
                          >
                            <ChevronDown className="w-3.5 h-3.5" />
                          </span>
                        </button>

                        {isOpen && (
                          <div className="ml-3 mt-0.5 mb-0.5 pl-3 border-l-2 border-(--border) space-y-px">
                            {item.children.map((child) => {
                              const ChildIcon = child.icon;
                              const childActive = isActive(child.href);
                              return (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={() => setSidebarOpen(false)}
                                  className={cn(
                                    "flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-150",
                                    childActive
                                      ? "bg-primary/10 text-primary"
                                      : "text-(--text-secondary) hover:bg-(--hover) hover:text-(--text)",
                                  )}
                                >
                                  <ChildIcon
                                    className={cn(
                                      "w-3.5 h-3.5 shrink-0",
                                      childActive
                                        ? "text-primary"
                                        : "text-(--text-muted)",
                                    )}
                                  />
                                  <span className="flex-1 truncate">
                                    {child.label}
                                  </span>
                                  {child.badge && (
                                    <span
                                      className={cn(
                                        "text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0",
                                        BADGE_COLORS[child.badge] ??
                                          "bg-(--bg-secondary) text-(--text-muted)",
                                      )}
                                    >
                                      {child.badge}
                                    </span>
                                  )}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  }

                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={cn(
                        "flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-150",
                        active
                          ? "bg-primary/10 text-primary"
                          : "text-(--text-secondary) hover:bg-(--hover) hover:text-(--text)",
                      )}
                    >
                      <span
                        className={cn(
                          "flex items-center justify-center w-6 h-6 rounded-md shrink-0",
                          active
                            ? "bg-primary/15 text-primary"
                            : "bg-(--bg-secondary) text-(--text-muted)",
                        )}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </span>
                      <span className="truncate">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          {/* ── Categories collapsible ──────────────────────────── */}
          <div className="pt-2">
            <button
              onClick={() => setCatOpen((v) => !v)}
              className="w-full flex items-center gap-2 px-2 py-1.5 group"
            >
              <div className="w-1 h-3 rounded-full bg-primary/50 shrink-0" />
              <span className="text-[10px] font-bold text-primary/60 uppercase tracking-widest">
                Categories
              </span>
              <div className="flex-1 h-px bg-primary/10" />
              <ChevronDown
                className={cn(
                  "w-3 h-3 text-(--text-muted) transition-transform duration-200 shrink-0",
                  catOpen ? "rotate-0" : "-rotate-90",
                )}
              />
            </button>

            {catOpen && (
              <div className="mt-1 space-y-px">
                {categories.map((cat) => {
                  const Icon = iconMap[cat.icon] || BookOpen;
                  const href = `/vocab/${cat.slug}`;
                  const active = isActive(href);
                  return (
                    <Link
                      key={cat.slug}
                      href={href}
                      onClick={() => setSidebarOpen(false)}
                      className={cn(
                        "flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg text-[13px] transition-all duration-150",
                        active
                          ? "bg-primary/10 text-primary"
                          : "text-(--text-secondary) hover:bg-(--hover) hover:text-(--text)",
                      )}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <Icon
                          className={cn(
                            "w-3.5 h-3.5 shrink-0",
                            active ? "text-primary" : "text-(--text-muted)",
                          )}
                        />
                        <span className="truncate text-[12.5px]">
                          {cat.name}
                        </span>
                      </div>
                      <span
                        className={cn(
                          "text-[10px] font-semibold px-1.5 py-0.5 rounded-full shrink-0",
                          active
                            ? "bg-primary/15 text-primary"
                            : "bg-(--bg-secondary) text-(--text-muted)",
                        )}
                      >
                        {cat.count}
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* ── Footer ───────────────────────────────────────────── */}
        <div className="px-4 py-3 border-t border-(--border)">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
            <p className="text-[11px] text-primary/60 font-medium">
              Learn English Every Day
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
