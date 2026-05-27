'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CollapsibleCardProps {
  title: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  children: React.ReactNode;
}

// Uncontrolled — manages its own open/close state
export function CollapsibleCard({
  title,
  icon,
  badge,
  defaultOpen = false,
  className,
  children,
}: CollapsibleCardProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={cn('bg-(--bg-card) border border-(--border) rounded-xl overflow-hidden', className)}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-(--hover) transition-colors"
      >
        <span className="text-sm font-semibold text-(--text) flex items-center gap-2 min-w-0">
          {icon}
          <span className="truncate">{title}</span>
          {badge}
        </span>
        {open
          ? <ChevronUp className="w-4 h-4 text-(--text-muted) shrink-0" />
          : <ChevronDown className="w-4 h-4 text-(--text-muted) shrink-0" />
        }
      </button>
      {open && (
        <div className="border-t border-(--border) px-4 py-3">
          {children}
        </div>
      )}
    </div>
  );
}

interface ControlledCollapsibleCardProps extends CollapsibleCardProps {
  open: boolean;
  onToggle: () => void;
}

// Controlled — parent owns open/close state (use when you need to reset externally)
export function ControlledCollapsibleCard({
  open,
  onToggle,
  title,
  icon,
  badge,
  className,
  children,
}: ControlledCollapsibleCardProps) {
  return (
    <div className={cn('bg-(--bg-card) border border-(--border) rounded-xl overflow-hidden', className)}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-(--hover) transition-colors"
      >
        <span className="text-sm font-semibold text-(--text) flex items-center gap-2 min-w-0">
          {icon}
          <span className="truncate">{title}</span>
          {badge}
        </span>
        {open
          ? <ChevronUp className="w-4 h-4 text-(--text-muted) shrink-0" />
          : <ChevronDown className="w-4 h-4 text-(--text-muted) shrink-0" />
        }
      </button>
      {open && (
        <div className="border-t border-(--border) px-4 py-3">
          {children}
        </div>
      )}
    </div>
  );
}
