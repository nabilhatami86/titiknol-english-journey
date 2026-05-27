import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  maxVisible?: number;
  className?: string;
}

export function Pagination({ page, totalPages, onChange, maxVisible = 13, className }: PaginationProps) {
  const pages = Array.from({ length: Math.min(totalPages, maxVisible) }, (_, i) => i + 1);

  return (
    <div className={cn('flex items-center justify-center gap-1 flex-wrap', className)}>
      <button
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className="p-2 rounded-lg border border-(--border) disabled:opacity-40 hover:bg-(--bg-secondary) transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={cn(
            'w-9 h-9 rounded-lg text-sm font-medium transition-colors',
            p === page
              ? 'bg-primary text-white'
              : 'border border-(--border) text-(--text-secondary) hover:bg-(--bg-secondary)',
          )}
        >
          {p}
        </button>
      ))}

      <button
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        className="p-2 rounded-lg border border-(--border) disabled:opacity-40 hover:bg-(--bg-secondary) transition-colors"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
