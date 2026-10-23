import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Item, ItemProgress } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(iso: string): string {
  const [, m, d] = iso.split('-').map(Number);
  const months = ['yanv', 'fev', 'mart', 'apr', 'may', 'iyun', 'iyul', 'avg', 'sen', 'okt', 'noy', 'dek'];
  return `${d}-${months[m - 1]}`;
}

type DerivedStatus = 'pending' | 'watched' | 'skipped' | 'partial';

export function getItemStats(item: Item, prog: ItemProgress | undefined) {
  if (item.type === 'movie') {
    if (prog?.status === 'watched') return { total: 1, done: 1, percent: 100, status: 'watched' as DerivedStatus };
    if (prog?.status === 'skipped') return { total: 1, done: 1, percent: 100, status: 'skipped' as DerivedStatus };
    return { total: 1, done: 0, percent: 0, status: 'pending' as DerivedStatus };
  }
  const total = item.episodes.length;
  let watched = 0, skipped = 0;
  item.episodes.forEach(ep => {
    const s = prog?.episodes?.[ep.num];
    if (s === 'watched') watched++;
    else if (s === 'skipped') skipped++;
  });
  const done = watched + skipped;
  const percent = total ? Math.round((done / total) * 100) : 0;
  let status: DerivedStatus = 'pending';
  if (done === total) status = skipped > watched ? 'skipped' : 'watched';
  else if (done > 0) status = 'partial';
  return { total, done, percent, status };
}

export function getOverallStats(items: Item[], progress: Record<string, ItemProgress>) {
  let total = 0, done = 0;
  items.forEach(item => {
    if (item.type === 'movie') {
      total += 1;
      if (progress[item.id]?.status) done += 1;
    } else {
      total += item.episodes.length;
      item.episodes.forEach(ep => {
        if (progress[item.id]?.episodes?.[ep.num]) done += 1;
      });
    }
  });
  return { total, done, percent: total ? Math.round((done / total) * 100) : 0 };
}

export function getNextUp(items: Item[], progress: Record<string, ItemProgress>): Item | null {
  for (const item of items) {
    const s = getItemStats(item, progress[item.id]);
    if (s.status === 'pending' || s.status === 'partial') return item;
  }
  return null;
}
