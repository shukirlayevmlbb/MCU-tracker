import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const type = searchParams.get('type') as 'movie' | 'tv' | null;
  const title = searchParams.get('title'); // OMDb uchun

  if (!id || !type) return NextResponse.json({ error: 'missing params' }, { status: 400 });

  const tmdbKey = process.env.TMDB_API_KEY;
  const omdbKey = process.env.OMDB_API_KEY;

  let poster = null, backdrop = null, overview = '', rating = null;

  // 1. TMDB dan olish
  if (tmdbKey) {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${tmdbKey}&language=en-US`, { next: { revalidate: 86400 } });
      if (res.ok) {
        const data = await res.json();
        poster = data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : null;
        backdrop = data.backdrop_path ? `https://image.tmdb.org/t/p/w780${data.backdrop_path}` : null;
        overview = data.overview || '';
      }
    } catch {}
  }

  // 2. OMDb dan IMDb reytingini olish (Faqat kino bo'lsa yoki serial nomi aniq bo'lsa)
  if (omdbKey && title) {
    try {
      const omdbRes = await fetch(`https://www.omdbapi.com/?apikey=${omdbKey}&t=${encodeURIComponent(title)}`);
      if (omdbRes.ok) {
        const omdbData = await omdbRes.json();
        if (omdbData.Response === 'True' && omdbData.imdbRating !== 'N/A') {
          rating = omdbData.imdbRating;
        }
      }
    } catch {}
  }

  return NextResponse.json(
    { poster, backdrop, overview, rating },
    { headers: { 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800' } }
  );
}
