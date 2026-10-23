import { NextRequest, NextResponse } from 'next/server';

const TMDB_BASE = 'https://api.themoviedb.org/3';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title');
  const year = searchParams.get('year');
  const type = searchParams.get('type') as 'movie' | 'tv' | null;

  if (!title || !type) {
    return NextResponse.json({ error: 'missing params' }, { status: 400 });
  }
  const key = process.env.TMDB_API_KEY;
  if (!key) {
    return NextResponse.json({ poster: null, backdrop: null });
  }

  const params = new URLSearchParams({
    api_key: key,
    query: title,
    language: 'en-US',
    include_adult: 'false',
  });
  if (year) params.set(type === 'movie' ? 'year' : 'first_air_date_year', year);

  try {
    const res = await fetch(`${TMDB_BASE}/search/${type}?${params.toString()}`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) throw new Error(`TMDB ${res.status}`);
    const data = await res.json();
    const first = data.results?.[0];
    const poster = first?.poster_path
      ? `https://image.tmdb.org/t/p/w500${first.poster_path}`
      : null;
    const backdrop = first?.backdrop_path
      ? `https://image.tmdb.org/t/p/w780${first.backdrop_path}`
      : null;

    return NextResponse.json(
      { poster, backdrop, tmdbId: first?.id ?? null },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
        },
      }
    );
  } catch {
    return NextResponse.json({ poster: null, backdrop: null });
  }
}
