'use client';
import { useMemo, useRef, useState } from 'react';
import { Header } from '@/components/Header';
import { ProgressOverview } from '@/components/ProgressOverview';
import { NextUpCard } from '@/components/NextUpCard';
import { FilterBar, FilterType } from '@/components/FilterBar';
import { MediaCard } from '@/components/MediaCard';
import { ITEMS } from '@/lib/data';
import { useProgress } from '@/lib/useProgress';
import { getItemStats } from '@/lib/utils';

export default function Home() {
  const {
    progress, loaded, setMovieStatus, setEpisodeStatus, markAllWatched, clearItem, resetAll,
  } = useProgress();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return ITEMS.filter(item => {
      if (q && !item.title.toLowerCase().includes(q)) return false;
      const s = getItemStats(item, progress[item.id]);
      switch (filter) {
        case 'pending': return s.status === 'pending' || s.status === 'partial';
        case 'watched': return s.status === 'watched';
        case 'skipped': return s.status === 'skipped';
        case 'movies': return item.type === 'movie';
        case 'series': return item.type === 'series';
        default: return true;
      }
    });
  }, [search, filter, progress]);

  const scrollTo = (id: string) => {
    cardRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleReset = () => {
    if (confirm('Barcha progressni tozalashni xohlaysizmi?')) resetAll();
  };

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-marvel-red border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-safe">
      <Header />
      <main className="max-w-3xl mx-auto px-3 pt-3 space-y-3">
        <ProgressOverview items={ITEMS} progress={progress} />
        <NextUpCard items={ITEMS} progress={progress} onScrollTo={scrollTo} />
        <FilterBar
          search={search}
          onSearchChange={setSearch}
          filter={filter}
          onFilterChange={setFilter}
          onReset={handleReset}
        />

        <div className="space-y-2.5 pt-1">
          {filtered.map((item, idx) => (
            <div key={item.id} ref={el => { cardRefs.current[item.id] = el; }}>
              <MediaCard
                item={item}
                progress={progress[item.id]}
                onMovieStatus={s => setMovieStatus(item.id, s)}
                onEpisodeStatus={(n, s) => setEpisodeStatus(item.id, n, s)}
                onMarkAll={() => item.type === 'series' && markAllWatched(item.id, item.episodes.length)}
                onClear={() => clearItem(item.id)}
                priority={idx < 3}
              />
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-zinc-500 text-sm">Hech narsa topilmadi</div>
          )}
        </div>

        <footer className="text-center text-xs text-zinc-500 py-6">
          <div>Marvel Xronologiya Tracker</div>
          <div className="mt-1 opacity-70">MCU ni xronologik tartibda kuzatib boring</div>
        </footer>
      </main>
    </div>
  );
}
