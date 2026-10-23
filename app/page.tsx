'use client';
import { useMemo, useRef, useState } from 'react';
import { Header } from '@/components/Header';
import { ProgressOverview } from '@/components/ProgressOverview';
import { NextUpCard } from '@/components/NextUpCard';
import { FilterBar, FilterType } from '@/components/FilterBar';
import { MediaCard } from '@/components/MediaCard';
import { BottomNav } from '@/components/BottomNav';
import { BottomSheet } from '@/components/BottomSheet';
import { ITEMS } from '@/lib/data';
import { useProgress } from '@/lib/useProgress';
import { getItemStats } from '@/lib/utils';
import type { Item } from '@/lib/types';

export default function Home() {
  const { progress, loaded, setMovieStatus, setEpisodeStatus, markAllWatched, clearItem, resetAll } = useProgress();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [activeTab, setActiveTab] = useState('list');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
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

  const scrollTo = (id: string) => cardRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  const handleReset = () => { if (confirm('Barcha progressni tozalashni xohlaysizmi?')) resetAll(); };

  if (!loaded) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-marvel-red border-t-transparent animate-spin" /></div>;

  return (
    <div className="min-h-screen pb-28">
      <Header />
      
      <main className="max-w-2xl mx-auto px-4 pt-4 space-y-4">
        {activeTab === 'list' && (
          <>
            <ProgressOverview items={ITEMS} progress={progress} />
            <NextUpCard items={ITEMS} progress={progress} onScrollTo={scrollTo} />
            <FilterBar search={search} onSearchChange={setSearch} filter={filter} onFilterChange={setFilter} onReset={handleReset} />
            
            <div className="space-y-3 pt-2">
              {filtered.map((item, idx) => (
                <div key={item.id} ref={el => { cardRefs.current[item.id] = el; }}>
                  <MediaCard 
                    item={item} progress={progress[item.id]} 
                    onClick={() => setSelectedItem(item)}
                    onMovieStatus={s => setMovieStatus(item.id, s)} 
                    priority={idx < 3} 
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'stats' && (
          <div className="glass rounded-3xl p-6 text-center mt-10">
            <h2 className="text-lg font-bold">Statistika tez orada...</h2>
            <p className="text-sm text-zinc-400 mt-2">Bu yerda batafsil grafiklar va ma'lumotlar bo'ladi.</p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="glass rounded-3xl p-6 text-center mt-10">
            <h2 className="text-lg font-bold">Sozlamalar</h2>
            <p className="text-sm text-zinc-400 mt-2">Tez orada qo'shiladi.</p>
            <button onClick={handleReset} className="mt-6 px-6 py-3 bg-red-500/10 text-red-500 rounded-xl font-semibold text-sm">Progresni tozalash</button>
          </div>
        )}
      </main>

      <BottomNav activeTab={activeTab} setTab={setActiveTab} />

      <BottomSheet 
        item={selectedItem} progress={selectedItem ? progress[selectedItem.id] : undefined}
        onClose={() => setSelectedItem(null)}
        onMovieStatus={s => selectedItem && setMovieStatus(selectedItem.id, s)}
        onEpisodeStatus={(n, s) => selectedItem && setEpisodeStatus(selectedItem.id, n, s)}
        onMarkAll={() => selectedItem?.type === 'series' && markAllWatched(selectedItem.id, selectedItem.episodes.length)}
        onClear={() => selectedItem && clearItem(selectedItem.id)}
      />
    </div>
  );
}
