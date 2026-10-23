'use client';
import { Search, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

export type FilterType = 'all' | 'pending' | 'watched' | 'skipped' | 'movies' | 'series';

interface Props {
  search: string;
  onSearchChange: (v: string) => void;
  filter: FilterType;
  onFilterChange: (f: FilterType) => void;
  onReset: () => void;
}

const FILTERS: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'Hammasi' },
  { key: 'pending', label: 'Qolgan' },
  { key: 'watched', label: 'Ko‘rilgan' },
  { key: 'skipped', label: 'O‘tkazilgan' },
  { key: 'movies', label: 'Filmlar' },
  { key: 'series', label: 'Seriallar' },
];

export function FilterBar({ search, onSearchChange, filter, onFilterChange, onReset }: Props) {
  return (
    <div className="space-y-2">
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
        <input
          type="text"
          placeholder="Qidirish..."
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          className="w-full h-10 pl-9 pr-3 rounded-xl glass text-sm outline-none focus:ring-2 focus:ring-marvel-red/40 transition"
        />
      </div>
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {FILTERS.map(f => (
          <button
            key={f.key}
            onClick={() => onFilterChange(f.key)}
            className={cn(
              'shrink-0 h-8 px-3 rounded-full text-xs font-semibold transition',
              filter === f.key
                ? 'bg-marvel-red text-white'
                : 'bg-zinc-200/70 dark:bg-white/10 hover:bg-zinc-300/70 dark:hover:bg-white/15'
            )}
          >
            {f.label}
          </button>
        ))}
        <button
          onClick={onReset}
          className="shrink-0 h-8 px-3 rounded-full text-xs font-semibold bg-red-500/10 text-red-500 hover:bg-red-500/20 transition flex items-center gap-1"
        >
          <RotateCcw size={12} />
          Tozalash
        </button>
      </div>
    </div>
  );
}
