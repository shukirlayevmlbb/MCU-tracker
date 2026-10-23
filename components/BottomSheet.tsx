'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ChevronDown, CheckCheck, RotateCcw, Star } from 'lucide-react';
import type { Item, ItemProgress, Status } from '@/lib/types';
import { getItemStats, cn } from '@/lib/utils';
import { useMediaInfo } from '@/lib/useMediaInfo';
import { useState } from 'react';

interface Props {
  item: Item | null;
  progress: ItemProgress | undefined;
  onClose: () => void;
  onMovieStatus: (status: Status | null) => void;
  onEpisodeStatus: (epNum: number, status: Status | null) => void;
  onMarkAll: () => void;
  onClear: () => void;
}

export function BottomSheet({ item, progress, onClose, onMovieStatus, onEpisodeStatus, onMarkAll, onClear }: Props) {
  const info = useMediaInfo(item!);
  const [showEpisodes, setShowEpisodes] = useState(false);

  if (!item) return null;
  const stats = getItemStats(item, progress);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
      />
      <motion.div
        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed bottom-0 left-0 right-0 z-[70] max-h-[90vh] overflow-y-auto rounded-t-3xl bg-[#121214] border-t border-white/10 pb-safe"
      >
        {/* Backdrop Image */}
        <div className="relative h-56 w-full bg-zinc-900 overflow-hidden rounded-t-3xl">
          {info?.backdrop ? (
            <img src={info.backdrop} alt="" className="w-full h-full object-cover opacity-60" />
          ) : <div className="w-full h-full skeleton" />}
          <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-[#121214]/40 to-transparent" />
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center backdrop-blur">
            <X size={18} />
          </button>
        </div>

        <div className="px-5 pb-8 -mt-20 relative z-10">
          <div className="flex gap-4">
            <div className="w-24 h-36 rounded-xl overflow-hidden shrink-0 bg-zinc-800 shadow-xl border border-white/10">
              {info?.poster ? <img src={info.poster} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full skeleton" />}
            </div>
            <div className="pt-16 flex-1">
              <h2 className="text-xl font-bold leading-tight">{item.title}</h2>
              <div className="flex items-center gap-2 mt-1 text-sm text-zinc-400">
                <span>{item.year}</span>
                <span>·</span>
                <span>{item.type === 'movie' ? 'Film' : 'Serial'}</span>
                {info?.rating && (
                  <>
                    <span>·</span>
                    <span className="flex items-center gap-1 text-yellow-500 font-medium">
                      <Star size={12} fill="currentColor" /> {info.rating}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {info?.overview && (
            <p className="mt-4 text-sm text-zinc-300 leading-relaxed line-clamp-4">
              {info.overview}
            </p>
          )}

          {/* Boshqaruv tugmalari */}
          <div className="mt-6 flex items-center gap-2">
            {item.type === 'movie' ? (
              <>
                <button onClick={() => onMovieStatus(progress?.status === 'watched' ? null : 'watched')} className={cn('flex-1 h-12 rounded-xl font-semibold flex items-center justify-center gap-2 transition', progress?.status === 'watched' ? 'bg-emerald-500 text-white' : 'bg-white/10 hover:bg-white/15')}>
                  <Check size={18} /> Ko‘rdim
                </button>
                <button onClick={() => onMovieStatus(progress?.status === 'skipped' ? null : 'skipped')} className={cn('w-12 h-12 rounded-xl flex items-center justify-center transition', progress?.status === 'skipped' ? 'bg-zinc-600 text-white' : 'bg-white/10 hover:bg-white/15')}>
                  <X size={18} />
                </button>
              </>
            ) : (
              <>
                <button onClick={() => setShowEpisodes(!showEpisodes)} className="flex-1 h-12 rounded-xl bg-white/10 hover:bg-white/15 font-semibold flex items-center justify-center gap-2 transition">
                  Qismlar ({stats.done}/{stats.total}) <ChevronDown size={16} className={showEpisodes ? 'rotate-180' : ''} />
                </button>
                <button onClick={onMarkAll} className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
                  <CheckCheck size={18} />
                </button>
                <button onClick={onClear} className="w-12 h-12 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center">
                  <RotateCcw size={18} />
                </button>
              </>
            )}
          </div>

          {/* Qismlar ro'yxati */}
          {item.type === 'series' && showEpisodes && (
            <div className="mt-6 grid grid-cols-4 gap-2">
              {item.episodes.map(ep => {
                const s = progress?.episodes?.[ep.num];
                return (
                  <button key={ep.num} onClick={() => {
                    if (!s) onEpisodeStatus(ep.num, 'watched');
                    else if (s === 'watched') onEpisodeStatus(ep.num, 'skipped');
                    else onEpisodeStatus(ep.num, null);
                  }} className={cn('h-10 rounded-lg text-sm font-bold flex items-center justify-center gap-1 transition', s === 'watched' ? 'bg-emerald-500 text-white' : s === 'skipped' ? 'bg-zinc-600 text-white' : 'bg-white/10 hover:bg-white/15')}>
                    {s === 'watched' && <Check size={12} />}
                    {s === 'skipped' && <X size={12} />}
                    {ep.num}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
