'use client';
import { useEffect, useRef, useState } from 'react';
import type { Item } from '@/lib/types';

const cache = new Map<string, string | null>();

interface Props {
  item: Item;
  priority?: boolean;
}

export function Poster({ item, priority }: Props) {
  const [poster, setPoster] = useState<string | null | undefined>(cache.get(item.id));
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (poster !== undefined) return;
    let cancelled = false;
    const params = new URLSearchParams({
      title: item.title,
      year: String(item.year),
      type: item.tmdbType,
    });
    fetch(`/api/poster?${params.toString()}`)
      .then(r => r.json())
      .then(d => {
        if (cancelled) return;
        cache.set(item.id, d.poster ?? null);
        setPoster(d.poster ?? null);
      })
      .catch(() => {
        if (cancelled) return;
        cache.set(item.id, null);
        setPoster(null);
      });
    return () => { cancelled = true; };
  }, [item, poster]);

  useEffect(() => {
    if (imgRef.current?.complete && poster) setLoaded(true);
  }, [poster]);

  const showSkeleton = !poster || !loaded || errored;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {showSkeleton && <div className="absolute inset-0 skeleton" />}
      {!poster || errored ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900">
          <span className="text-4xl font-black text-white/15">{item.title.charAt(0)}</span>
        </div>
      ) : (
        <img
          ref={imgRef}
          src={poster}
          alt={item.title}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
    </div>
  );
}
