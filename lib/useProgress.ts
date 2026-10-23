'use client';
import { useCallback, useEffect, useState } from 'react';
import type { ProgressMap, Status } from './types';

const KEY = 'marvel-progress-v1';

export function useProgress() {
  const [progress, setProgress] = useState<ProgressMap>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setProgress(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try { localStorage.setItem(KEY, JSON.stringify(progress)); } catch {}
  }, [progress, loaded]);

  const setMovieStatus = useCallback((itemId: string, status: Status | null) => {
    setProgress(p => {
      const next = { ...p };
      if (!status) delete next[itemId];
      else next[itemId] = { ...next[itemId], status };
      return next;
    });
  }, []);

  const setEpisodeStatus = useCallback((itemId: string, epNum: number, status: Status | null) => {
    setProgress(p => {
      const cur = p[itemId] ?? {};
      const eps = { ...(cur.episodes ?? {}) };
      if (!status) delete eps[epNum];
      else eps[epNum] = status;
      const next = { ...p };
      if (Object.keys(eps).length === 0) delete next[itemId];
      else next[itemId] = { ...cur, episodes: eps };
      return next;
    });
  }, []);

  const markAllWatched = useCallback((itemId: string, episodeCount?: number) => {
    setProgress(p => {
      const next = { ...p };
      if (episodeCount) {
        const eps: Record<number, Status> = {};
        for (let i = 1; i <= episodeCount; i++) eps[i] = 'watched';
        next[itemId] = { episodes: eps };
      } else {
        next[itemId] = { status: 'watched' };
      }
      return next;
    });
  }, []);

  const clearItem = useCallback((itemId: string) => {
    setProgress(p => {
      const next = { ...p };
      delete next[itemId];
      return next;
    });
  }, []);

  const resetAll = useCallback(() => setProgress({}), []);

  return { progress, loaded, setMovieStatus, setEpisodeStatus, markAllWatched, clearItem, resetAll };
}
