import { cn } from '@/lib/utils';

// Base skeleton block — pass className to set size/shape
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-(--bg-secondary)',
        className,
      )}
    />
  );
}

// Multiple text lines, last line 3/4 width (natural paragraph look)
export function SkeletonText({
  lines = 3,
  className,
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn('h-3', i === lines - 1 ? 'w-3/4' : 'w-full')}
        />
      ))}
    </div>
  );
}

// Generic card outline with a title + text body
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'rounded-xl border border-(--border) p-4 space-y-3',
        className,
      )}
    >
      <Skeleton className="h-4 w-2/5" />
      <SkeletonText lines={3} />
    </div>
  );
}

// Row with icon + label (sidebar items, list entries)
export function SkeletonRow({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Skeleton className="w-8 h-8 rounded-lg shrink-0" />
      <div className="flex-1 space-y-1.5">
        <Skeleton className="h-3 w-3/5" />
        <Skeleton className="h-2.5 w-2/5" />
      </div>
    </div>
  );
}

// Stacked rows — good for list views
export function SkeletonList({
  rows = 4,
  className,
}: {
  rows?: number;
  className?: string;
}) {
  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonRow key={i} />
      ))}
    </div>
  );
}

// Score / result card (used in IELTS Writing, Letter Review, etc.)
export function SkeletonResult({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-4', className)}>
      {/* Big score */}
      <div className="rounded-2xl border border-(--border) p-6 space-y-3">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-14 w-16" />
        <SkeletonText lines={2} />
      </div>
      {/* 4 criterion bars */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-xl border border-(--border) p-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-3.5 w-40" />
            <Skeleton className="h-2 flex-1 rounded-full" />
            <Skeleton className="h-5 w-8" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Image thumbnail card (test lists, vocabulary cards, etc.)
export function SkeletonImageCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'rounded-xl border border-(--border) overflow-hidden',
        className,
      )}
    >
      <Skeleton className="w-full aspect-video" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-3.5 w-4/5" />
        <div className="flex gap-1.5">
          <Skeleton className="h-4 w-16 rounded-full" />
          <Skeleton className="h-4 w-20 rounded-full" />
        </div>
        <Skeleton className="h-8 w-full rounded-lg mt-1" />
      </div>
    </div>
  );
}
