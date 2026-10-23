'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ChevronLeft, Star, Play, Check, X, CheckCheck, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { ITEMS } from '@/lib/data';
import { useProgress } from '@/lib/useProgress';
import { getItemStats, cn } from '@/lib/utils';
import type { Status } from '@/lib/types';

export default function MediaDetails() {
  const { id } = useParams();
  const router = useRouter();
  const item = ITEMS.find(i => i.id === id);
  
  const { progress, loaded, setMovieStatus, setEpisodeStatus, markAllWatched, clearItem } = useProgress();
  const [details, setDetails] = useState<any>(null);

  useEffect(() => {
    if (!item) return;
    const params = new URLSearchParams({ id: String(item.tmdbId), type: item.tmdbType, title: item.title });
    fetch(`/api/details?${params.toString()}`).then(r => r.json()).then(setDetails);
  }, [item]);

  if (!loaded || !item) return null;

  const itemProgress = progress[item.id];
  const stats = getItemStats(item, itemProgress);

  return (
    <div className="min-h-screen pb-24 bg-black">
      {/* Hero Backdrop */}
      <div className="relative h-[45vh] w-full">
        {details?.backdrop ? (
          <motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} src={details.backdrop} className="w-full h-full object-cover" />
        ) : <div className="w-full h-full skeleton" />}
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
        
        <button onClick={() => router.back()} className="absolute top-6 left-4 w-10 h-10 rounded-full glass flex items-center justify-center text-white">
          <ChevronLeft size={22} />
        </button>
      </div>

      <main className="relative -mt-32 px-5 max-w-2xl mx-auto z-10">
        {/* Poster va Asosiy Ma'lumotlar */}
        <div className="flex gap-4">
          <div className="w-28 h-40 rounded-2xl overflow-hidden shrink-0 shadow-2xl shadow-black/80 border border-white/10">
            {details?.poster ? <img src={details.poster} className="w-full h-full object-cover" /> : <div className="w-full h-full skeleton" />}
          </div>
          <div className="pt-20">
            <h1 className="text-2xl font-bold leading-tight text-white">{item.title}</h1>
            <div className="flex items-center gap-3 mt-2 text-sm text-zinc-400 font-medium">
              <span>{item.year}</span>
              {details?.runtime && <span>{details.runtime} daq</span>}
              {details?.imdbRating && (
                <span className="flex items-center gap-1 text-yellow-500"><Star size={14} fill="currentColor"/> {details.imdbRating} IMDb</span>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {details?.genres?.map((g: string) => (
                <span key={g} className="px-2.5 py-1 rounded-md bg-white/10 text-[11px] font-medium text-zinc-300">{g}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Boshqaruv paneli */}
        <div className="mt-8 flex gap-3">
          {item.type === 'movie' ? (
            <>
              <button onClick={() => setMovieStatus(item.id, itemProgress?.status === 'watched' ? null : 'watched')} className={cn('flex-1 h-14 rounded-2xl font-semibold text-[15px] flex items-center justify-center gap-2 transition-all', itemProgress?.status === 'watched' ? 'bg-white text-black' : 'glass-btn text-white')}>
                <Check size={20} strokeWidth={2.5} /> Ko‘rdim
              </button>
              <button onClick={() => setMovieStatus(item.id, itemProgress?.status === 'skipped' ? null : 'skipped')} className={cn('w-14 h-14 rounded-2xl flex items-center justify-center transition-all', itemProgress?.status === 'skipped' ? 'bg-zinc-700 text-white' : 'glass-btn text-white')}>
                <X size={20} strokeWidth={2.5} />
              </button>
            </>
          ) : (
            <>
              <button onClick={() => markAllWatched(item.id, item.episodes.length)} className="flex-1 h-14 rounded-2xl glass-btn text-white font-semibold flex items-center justify-center gap-2">
                <CheckCheck size={20} /> Hammasini ko'rdim
              </button>
              <button onClick={() => clearItem(item.id)} className="w-14 h-14 rounded-2xl glass-btn text-zinc-400 flex items-center justify-center">
                <RotateCcw size={20} />
              </button>
            </>
          )}
        </div>

        {/* Tavsif */}
        {details?.overview && (
          <div className="mt-8">
            <h2 className="text-lg font-bold text-white mb-2">Tavsif</h2>
            <p className="text-[15px] text-zinc-400 leading-relaxed">{details.overview}</p>
          </div>
        )}

        {/* Treyler */}
        {details?.trailer && (
          <div className="mt-8">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2"><Play size={18} fill="currentColor"/> Treyler</h2>
            <div className="aspect-video rounded-2xl overflow-hidden glass">
              <iframe 
                src={`https://www.youtube-nocookie.com/embed/${details.trailer}?autoplay=0&rel=0`} 
                className="w-full h-full" 
                allowFullScreen 
              />
            </div>
          </div>
        )}

        {/* Aktyorlar */}
        {details?.cast?.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-bold text-white mb-3">Aktyorlar</h2>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {details.cast.map((actor: any, i: number) => (
                <div key={i} className="w-20 shrink-0 text-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-zinc-800 mx-auto border border-white/10">
                    {actor.profile ? <img src={actor.profile} className="w-full h-full object-cover" /> : null}
                  </div>
                  <p className="text-xs font-semibold text-white mt-2 line-clamp-1">{actor.name}</p>
                  <p className="text-[10px] text-zinc-500 line-clamp-1">{actor.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Qismlar (Seriallar uchun) */}
        {item.type === 'series' && (
          <div className="mt-8">
            <h2 className="text-lg font-bold text-white mb-3">Qismlar ({stats.done}/{stats.total})</h2>
            <div className="grid grid-cols-4 gap-2">
              {item.episodes.map(ep => {
                const s = itemProgress?.episodes?.[ep.num];
                return (
                  <button key={ep.num} onClick={() => {
                    if (!s) setEpisodeStatus(item.id, ep.num, 'watched');
                    else if (s === 'watched') setEpisodeStatus(item.id, ep.num, 'skipped');
                    else setEpisodeStatus(item.id, ep.num, null);
                  }} className={cn('h-12 rounded-xl text-sm font-bold flex items-center justify-center gap-1 glass-btn', s === 'watched' ? 'bg-white text-black' : s === 'skipped' ? 'bg-zinc-700 text-white' : 'text-zinc-300')}>
                    {s === 'watched' && <Check size={14} />}
                    {s === 'skipped' && <X size={14} />}
                    {ep.num}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
