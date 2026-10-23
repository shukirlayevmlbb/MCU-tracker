'use client';
import { Check, X, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Item, ItemProgress, Status } from '@/lib/types';
import { getItemStats, formatDate, cn } from '@/lib/utils';
import { useMediaInfo } from '@/lib/useMediaInfo';

interface Props {
  item: Item;
  progress: ItemProgress | undefined;
  onClick: () => void;
  onMovieStatus: (status: Status | null) => void;
  priority?: boolean;
}

export function MediaCard({ item, progress, onClick, onMovieStatus, priority }: Props) {
  const info = useMediaInfo(item);
  const stats = getItemStats(item, progress);

  return (
    <motion.div layout onClick={onClick} className={cn('glass rounded-2xl p-3 flex gap-3 cursor-pointer active:scale-[0.98] transition-transform', stats.status === 'watched' && 'opacity-70 grayscale-[0.3]')}>
      <div className="relative w-20 h-28 sm:w-24 sm:h-36 rounded-xl overflow-hidden shrink-0 bg-zinc-800">
        {info?.poster ? (
          <img src={info.poster} alt={item.title} loading={priority ? 'eager' : 'lazy'} className="w-full h-full object-cover" />
        ) : <div className="w-full h-full skeleton" />}
        <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded-md bg-black/70 backdrop-blur text-[10px] font-bold text-white">#{item.order}</div>
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <h3 className="font-semibold text-sm leading-tight line-clamp-2">{item.title}</h3>
        <div className="mt-1 flex items-center gap-2 text-xs text-zinc-400">
          <span>{formatDate(item.date)}</span>
          {info?.rating && (
            <span className="flex items-center gap-0.5 text-yellow-500"><Star size={10} fill="currentColor"/> {info.rating}</span>
          )}
        </div>
        
        {item.type === 'series' && (
          <div className="mt-3 h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-marvel-red transition-all" style={{ width: `${stats.percent}%` }} />
          </div>
        )}
      </div>

      {/* Tezkor tugmalar (faqat kino uchun) */}
      {item.type === 'movie' && (
        <div className="flex flex-col justify-center gap-1.5">
          <button onClick={(e) => { e.stopPropagation(); onMovieStatus(progress?.status === 'watched' ? null : 'watched'); }} className={cn('w-9 h-9 rounded-full flex items-center justify-center', progress?.status === 'watched' ? 'bg-emerald-500 text-white' : 'bg-white/10')}>
            <Check size={16} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onMovieStatus(progress?.status === 'skipped' ? null : 'skipped'); }} className={cn('w-9 h-9 rounded-full flex items-center justify-center', progress?.status === 'skipped' ? 'bg-zinc-600 text-white' : 'bg-white/10')}>
            <X size={16} />
          </button>
        </div>
      )}
    </motion.div>
  );
}
