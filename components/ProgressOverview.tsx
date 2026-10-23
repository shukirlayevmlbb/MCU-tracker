'use client';
import { motion } from 'framer-motion';
import type { Item, ProgressMap } from '@/lib/types';
import { getOverallStats } from '@/lib/utils';

interface Props {
  items: Item[];
  progress: ProgressMap;
}

export function ProgressOverview({ items, progress }: Props) {
  const overall = getOverallStats(items, progress);
  const movies = items.filter(i => i.type === 'movie');
  const series = items.filter(i => i.type === 'series');
  const moviesDone = movies.filter(m => progress[m.id]?.status).length;
  const seriesEpDone = series.reduce(
    (acc, s) => acc + s.episodes.filter(ep => progress[s.id]?.episodes?.[ep.num]).length,
    0
  );
  const seriesEpTotal = series.reduce((acc, s) => acc + s.episodes.length, 0);

  return (
    <div className="glass rounded-2xl p-4">
      <div className="flex items-baseline justify-between mb-3">
        <div>
          <div className="text-2xl font-black tracking-tight">
            {overall.percent}
            <span className="text-base font-bold text-zinc-500">%</span>
          </div>
          <div className="text-xs text-zinc-500 mt-0.5">
            {overall.done} / {overall.total} bajarildi
          </div>
        </div>
        <div className="text-right text-xs text-zinc-500 space-y-0.5">
          <div>
            🎬 Filmlar:{' '}
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
              {moviesDone}/{movies.length}
            </span>
          </div>
          <div>
            📺 Qismlar:{' '}
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
              {seriesEpDone}/{seriesEpTotal}
            </span>
          </div>
        </div>
      </div>
      <div className="h-2.5 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${overall.percent}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-marvel-red to-rose-500"
        />
      </div>
    </div>
  );
}
