'use client';
import { useEffect, useState } from 'react';
import type { Item } from './types';

export interface MediaInfo {
  poster: string | null;
  backdrop: string | null;
  overview: string;
  rating: string | null;
}

const cache = new Map<string, MediaInfo>();

export function useMediaInfo(item: Item | null) { // <-- Item | null qilindi
  const [info, setInfo] = useState<MediaInfo | undefined>(item ? cache.get(item.id) : undefined);

  useEffect(() => {
    if (!item || info) return;
    let cancelled = false;
    
    const params = new URLSearchParams({
      id: String(item.tmdbId),
      type: item.tmdbType,
      title: item.title,
    });

    fetch(`/api/media?${params.toString()}`)
      .then(r => r.json())
      .then(data => {
        if (cancelled) return;
        const finalData = { poster: data.poster, backdrop: data.backdrop, overview: data.overview, rating: data.rating };
        cache.set(item.id, finalData);
        setInfo(finalData);
      })
      .catch(() => {
        if (cancelled) return;
        const fallback = { poster: null, backdrop: null, overview: '', rating: null };
        cache.set(item.id, fallback);
        setInfo(fallback);
      });

    return () => { cancelled = true; };
  }, [item, info]);

  return info;
}
