'use client';
import { Check, X, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import type { Item, ItemProgress, Status } from '@/lib/types';
import { getItemStats, formatDate, cn } from '@/lib/utils';
import { useMediaInfo } from '@/lib/useMediaInfo';

interface Props {
  item: Item;
  progress: ItemProgress | undefined;
  onMovieStatus: (status: Status | null) => void;
  priority?: boolean;
}

export function MediaCard({ item, progress, onMovieStatus, priority }: Props) {
  const info = useMediaInfo(item);
  const stats = getItemStats(item, progress);

  return (
    <motion.div layout className={cn('glass rounded-[24px] p-3 flex gap-4 transition-all', stats.status === 'watched' && 'opacity-60 grayscale-[0.2]')}>
      {/* Rasm qismi Link bilan o'ralgan */}
      <Link href={`/media/${item.id}`} className="relative w-24 h-36 rounded-[16px] overflow-hidden shrink-0 bg-zinc-900 group active:scale-95 transition-transform">
        {info?.poster ? (
          <img src={info.poster} alt={item.title} loading={priority ? 'eager' : 'lazy'} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : <div className="w-full h-full skeleton" />}
        <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-white shadow-sm">#{item.order}</div>
      </Link>

      {/* Ma'lumot qismi */}
      <Link href={`/media/${item.id}`} className="flex-1 min-w-0 flex flex-col justify-center py-1">
        <h3 className="font-semibold text-[15px] leading-tight text-white line-clamp-2">{item.title}</h3>
        
        <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[11px] font-medium text-zinc-400">
          <span>{formatDate(item.date)}</span>
          <span className="w-1 h-1 rounded-full bg-zinc-600"></span>
          <span>{item.year}</span>
          {info?.rating && (
            <>
              <span className="w-1 h-1 rounded-full bg-zinc-600"></span>
              <span className="flex items-center gap-1 text-yellow-500"><Star size={10} fill="currentColor"/> {info.rating}</span>
            </>
          )}
        </div>

        {item.type === 'series' && (
          <div className="mt-4">
            <div className="flex justify-between text-[10px] text-zinc-500 mb-1">
              <span>Progress</span>
              <span>{stats.done}/{stats.total}</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div className="h-full bg-white/80 rounded-full transition-all duration-500" style={{ width: `${stats.percent}%` }} />
            </div>
          </div>
        )}
      </Link>

      {/* Tezkor tugmalar (Faqat kino uchun) */}
      {item.type === 'movie' && (
        <div className="flex flex-col justify-center gap-2 pr-1">
          <button onClick={(e) => { e.preventDefault(); onMovieStatus(progress?.status === 'watched' ? null : 'watched'); }} className={cn('w-10 h-10 rounded-full flex items-center justify-center glass-btn', progress?.status === 'watched' ? 'bg-white text-black' : 'text-zinc-300')}>
            <Check size={18} strokeWidth={2.5} />
          </button>
          <button onClick={(e) => { e.preventDefault(); onMovieStatus(progress?.status === 'skipped' ? null : 'skipped'); }} className={cn('w-10 h-10 rounded-full flex items-center justify-center glass-btn', progress?.status === 'skipped' ? 'bg-zinc-700 text-white' : 'text-zinc-300')}>
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>
      )}
    </motion.div>
  );
}
