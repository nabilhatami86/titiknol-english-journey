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
  BookOpenText,
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

type NavChild = { href: string; label: string; icon: React.ElementType };
type NavItem =
  | { href: string; label: string; icon: React.ElementType; children?: never; groupKey?: never }
  | { href?: never; label: string; icon: React.ElementType; children: NavChild[]; groupKey: string };

const navSections: { title: string; items: NavItem[] }[] = [
  {
    title: "",
    items: [
      { href: "/", label: "Dashboard", icon: Home },
    ],
  },
  {
    title: "Learning",
    items: [
      { href: "/vocab", label: "All Vocabulary", icon: BookOpen },
      { href: "/verb", label: "Verb Library", icon: Layers },
      { href: "/grammar-guide", label: "Grammar Guide", icon: BookMarked },
      { href: "/pronunciation-guide", label: "Pronunciation Guide", icon: Volume2 },
      { href: "/story", label: "Stories & Readings", icon: ScrollText },
    ],
  },
  {
    title: "Practice",
    items: [
      { href: "/practice", label: "Practice", icon: GraduationCap },
      { href: "/practice/conversations", label: "Daily Conversations", icon: MessageCircle },
      {
        groupKey: "writing",
        label: "Writing Practice",
        icon: FileText,
        children: [
          { href: "/practice/writing", label: "AI Writing Practice", icon: PenLine },
          { href: "/practice/essay-writing", label: "Guided Essay Writing", icon: BookOpenText },
          { href: "/practice/latihan-surat", label: "Latihan Surat", icon: FileText },
          { href: "/practice/ielts-writing", label: "IELTS Writing", icon: BarChart2 },
        ],
      },
      {
        groupKey: "vocab",
        label: "Vocab Practice",
        icon: BookOpen,
        children: [
          { href: "/practice/vocab-trainer", label: "Vocab Trainer", icon: BookMarked },
          { href: "/tn-intermediate/vocab", label: "Vocab Bank (Int.)", icon: Library },
        ],
      },
      {
        groupKey: "tn",
        label: "TN Course",
        icon: GraduationCap,
        children: [
          { href: "/tn-basic-cource", label: "TN Basic", icon: BookText },
          { href: "/tn-intermediate", label: "TN Intermediate", icon: GraduationCap },
          { href: "/tn-advance", label: "TN Advance", icon: Layers },
        ],
      },
      {
        groupKey: "listening",
        label: "Listening Practice",
        icon: Volume2,
        children: [
          { href: "/practice/ielts-listening", label: "IELTS Listening Test", icon: Youtube },
          { href: "/practice/ielts-tests", label: "Mini-IELTS Tests", icon: BookMarked },
          { href: "/practice/general-listening", label: "General Listening (BBC)", icon: Radio },
        ],
      },
      { href: "/practice/toefl-reading", label: "TOEFL Reading", icon: FileText },
      { href: "/practice/ielts-resources", label: "IELTS Resources", icon: Globe },
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
  writing: ["/practice/writing", "/practice/essay-writing", "/practice/latihan-surat", "/practice/ielts-writing"],
  vocab: ["/practice/vocab-trainer", "/tn-intermediate/vocab"],
  tn: ["/tn-basic-cource", "/tn-intermediate", "/tn-advance"],
  listening: ["/practice/ielts-listening", "/practice/ielts-tests", "/practice/general-listening"],
  reading: ["/practice/toefl-reading"],
};

export function Sidebar() {
  const pathname = usePathname();
  const sidebarOpen = useVocabStore((s) => s.sidebarOpen);
  const setSidebarOpen = useVocabStore((s) => s.setSidebarOpen);

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
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-(--sidebar-bg) border-r border-(--border) transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto flex flex-col",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-(--border)">
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={() => setSidebarOpen(false)}
          >
            <div className="w-8 h-8 rounded-lg overflow-hidden">
              <Image
                src="/download.jpg"
                alt="Logo"
                width={32}
                height={32}
                className="w-8 h-8 object-cover"
              />
            </div>
            <span className="font-bold text-lg text-(--text)">
              TitikNolJourney
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-(--hover)"
          >
            <X className="w-5 h-5 text-(--text-secondary)" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3">
          {navSections.map((section) => (
            <div key={section.title} className={section.title ? "mt-5" : ""}>
              {section.title && (
                <p className="px-3 text-xs font-semibold text-(--text-muted) uppercase tracking-wider mb-1.5">
                  {section.title}
                </p>
              )}
              <div className="space-y-0.5">
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
                            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                            active
                              ? "bg-primary/10 text-primary"
                              : "text-(--text-secondary) hover:bg-(--hover) hover:text-(--text)",
                          )}
                        >
                          <Icon className="w-5 h-5 shrink-0" />
                          <span className="flex-1 text-left">{item.label}</span>
                          {isOpen
                            ? <ChevronDown className="w-4 h-4 shrink-0" />
                            : <ChevronRight className="w-4 h-4 shrink-0" />
                          }
                        </button>

                        {isOpen && (
                          <div className="ml-4 mt-0.5 pl-4 border-l-2 border-(--border) space-y-0.5">
                            {item.children.map((child) => {
                              const ChildIcon = child.icon;
                              return (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={() => setSidebarOpen(false)}
                                  className={cn(
                                    "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                    isActive(child.href)
                                      ? "bg-primary text-white"
                                      : "text-(--text-secondary) hover:bg-(--hover) hover:text-(--text)",
                                  )}
                                >
                                  <ChildIcon className="w-4 h-4 shrink-0" />
                                  {child.label}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                        isActive(item.href)
                          ? "bg-primary text-white"
                          : "text-(--text-secondary) hover:bg-(--hover) hover:text-(--text)",
                      )}
                    >
                      <Icon className="w-5 h-5 shrink-0" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Categories */}
          <div className="mt-5">
            <p className="px-3 text-xs font-semibold text-(--text-muted) uppercase tracking-wider mb-1.5">
              Categories
            </p>
            <div className="space-y-0.5">
              {categories.map((cat) => {
                const Icon = iconMap[cat.icon] || BookOpen;
                const href = `/vocab/${cat.slug}`;
                return (
                  <Link
                    key={cat.slug}
                    href={href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                      isActive(href)
                        ? "bg-primary/10 text-primary"
                        : "text-(--text-secondary) hover:bg-(--hover) hover:text-(--text)",
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="truncate">{cat.name}</span>
                    </div>
                    <span className="text-xs bg-(--bg-secondary) px-1.5 py-0.5 rounded-full shrink-0">
                      {cat.count}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-(--border)">
          <p className="text-xs text-(--text-muted) text-center">
            Learn English Every Day
          </p>
        </div>
      </aside>
    </>
  );
}
