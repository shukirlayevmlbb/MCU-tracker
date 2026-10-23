'use client';
import { Check, X, ChevronDown, CheckCheck, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Item, ItemProgress, Status } from '@/lib/types';
import { getItemStats, formatDate, cn } from '@/lib/utils';
import { Poster } from './Poster';

interface Props {
  item: Item;
  progress: ItemProgress | undefined;
  onMovieStatus: (status: Status | null) => void;
  onEpisodeStatus: (epNum: number, status: Status | null) => void;
  onMarkAll: () => void;
  onClear: () => void;
  priority?: boolean;
}

export function MediaCard({
  item, progress, onMovieStatus, onEpisodeStatus, onMarkAll, onClear, priority,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const stats = getItemStats(item, progress);

  const statusText = {
    pending: 'Ko‘rilmagan',
    partial: `${stats.done}/${stats.total} qism`,
    watched: '✓ Ko‘rildi',
    skipped: '○ O‘tkazildi',
  }[stats.status];

  const statusColor = {
    pending: 'text-zinc-400',
    partial: 'text-amber-500',
    watched: 'text-emerald-500',
    skipped: 'text-zinc-500',
  }[stats.status];

  return (
    <motion.div
      layout
      className={cn(
        'glass rounded-2xl overflow-hidden',
        stats.status === 'watched' && 'ring-1 ring-emerald-500/30',
        stats.status === 'skipped' && 'opacity-70'
      )}
    >
      <div className="p-3 flex gap-3">
        <div className="relative w-20 h-28 sm:w-24 sm:h-36 rounded-xl overflow-hidden shrink-0 bg-zinc-800">
          <Poster item={item} priority={priority} />
          <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded-md bg-black/70 backdrop-blur text-[10px] font-bold text-white">
            #{item.order}
          </div>
        </div>

        <div className="flex-1 min-w-0 flex flex-col">
          <h3 className="font-semibold text-sm leading-tight line-clamp-2">{item.title}</h3>
          <div className="mt-1 flex items-center gap-2 text-xs text-zinc-500">
            <span>{formatDate(item.date)}</span>
            <span>·</span>
            <span>{item.type === 'movie' ? 'Film' : `${item.episodes.length} qism`}</span>
          </div>
          <div className={cn('mt-2 text-[11px] font-medium', statusColor)}>{statusText}</div>

          {item.type === 'series' && (
            <div className="mt-2 h-1 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
              <div
                className="h-full bg-marvel-red transition-all duration-300"
                style={{ width: `${stats.percent}%` }}
              />
            </div>
          )}

          <div className="mt-auto pt-2 flex items-center gap-1.5">
            {item.type === 'movie' ? (
              <>
                <button
                  onClick={() => onMovieStatus(progress?.status === 'watched' ? null : 'watched')}
                  aria-label="Ko‘rdim"
                  className={cn(
                    'w-9 h-9 rounded-full flex items-center justify-center transition active:scale-90',
                    progress?.status === 'watched'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-zinc-200/70 dark:bg-white/10 hover:bg-zinc-300/70 dark:hover:bg-white/15'
                  )}
                >
                  <Check size={16} strokeWidth={3} />
                </button>
                <button
                  onClick={() => onMovieStatus(progress?.status === 'skipped' ? null : 'skipped')}
                  aria-label="O‘tkazdim"
                  className={cn(
                    'w-9 h-9 rounded-full flex items-center justify-center transition active:scale-90',
                    progress?.status === 'skipped'
                      ? 'bg-zinc-500 text-white'
                      : 'bg-zinc-200/70 dark:bg-white/10 hover:bg-zinc-300/70 dark:hover:bg-white/15'
                  )}
                >
                  <X size={16} strokeWidth={3} />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setExpanded(v => !v)}
                  className="flex-1 h-9 rounded-full bg-zinc-200/70 dark:bg-white/10 hover:bg-zinc-300/70 dark:hover:bg-white/15 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                >
                  Qismlar
                  <ChevronDown size={14} className={cn('transition-transform', expanded && 'rotate-180')} />
                </button>
                <button
                  onClick={onMarkAll}
                  className="w-9 h-9 rounded-full bg-zinc-200/70 dark:bg-white/10 hover:bg-emerald-500/20 text-emerald-500 flex items-center justify-center transition active:scale-90"
                  aria-label="Hammasini ko‘rdim"
                >
                  <CheckCheck size={16} />
                </button>
                <button
                  onClick={onClear}
                  className="w-9 h-9 rounded-full bg-zinc-200/70 dark:bg-white/10 hover:bg-zinc-300/70 dark:hover:bg-white/15 flex items-center justify-center transition active:scale-90"
                  aria-label="Tozalash"
                >
                  <RotateCcw size={14} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {expanded && item.type === 'series' && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 pt-2 border-t border-black/5 dark:border-white/5">
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
                {item.episodes.map(ep => {
                  const s = progress?.episodes?.[ep.num];
                  return (
                    <EpisodeButton
                      key={ep.num}
                      num={ep.num}
                      status={s}
                      onChange={next => onEpisodeStatus(ep.num, next)}
                    />
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function EpisodeButton({
  num, status, onChange,
}: { num: number; status?: Status; onChange: (s: Status | null) => void }) {
  const cycle = () => {
    if (!status) onChange('watched');
    else if (status === 'watched') onChange('skipped');
    else onChange(null);
  };
  return (
    <button
      onClick={cycle}
      className={cn(
        'h-8 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition active:scale-95',
        status === 'watched' && 'bg-emerald-500 text-white',
        status === 'skipped' && 'bg-zinc-500/80 text-white',
        !status && 'bg-zinc-200/70 dark:bg-white/10 hover:bg-zinc-300/70 dark:hover:bg-white/15'
      )}
    >
      {status === 'watched' && <Check size={12} strokeWidth={3} />}
      {status === 'skipped' && <X size={12} strokeWidth={3} />}
      <span>{num}</span>
    </button>
  );
}
