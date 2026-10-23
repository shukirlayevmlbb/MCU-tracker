'use client';
import { ChevronRight } from 'lucide-react';
import type { Item, ProgressMap } from '@/lib/types';
import { getNextUp, formatDate } from '@/lib/utils';
import { Poster } from './Poster';

interface Props {
  items: Item[];
  progress: ProgressMap;
  onScrollTo: (id: string) => void;
}

export function NextUpCard({ items, progress, onScrollTo }: Props) {
  const next = getNextUp(items, progress);
  if (!next) {
    return (
      <div className="glass rounded-2xl p-4 text-center">
        <div className="text-2xl">🎉</div>
        <div className="mt-1 font-bold">Hammasi bajarildi!</div>
        <div className="text-xs text-zinc-500 mt-1">Siz haqiqiy Marvel fidokoriningiz</div>
      </div>
    );
  }
  return (
    <button
      onClick={() => onScrollTo(next.id)}
      className="glass rounded-2xl p-3 w-full text-left flex items-center gap-3 hover:ring-2 hover:ring-marvel-red/40 transition group"
    >
      <div className="relative w-14 h-20 rounded-lg overflow-hidden shrink-0 bg-zinc-800">
        <Poster item={next} priority />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] font-bold text-marvel-red uppercase tracking-wider">Keyingi navbat</div>
        <div className="font-semibold text-sm leading-tight line-clamp-2 mt-0.5">{next.title}</div>
        <div className="text-xs text-zinc-500 mt-0.5">{formatDate(next.date)}</div>
      </div>
      <ChevronRight size={18} className="text-zinc-400 group-hover:translate-x-0.5 transition" />
    </button>
  );
}
