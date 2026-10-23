import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const type = searchParams.get('type') as 'movie' | 'tv' | null;
  const title = searchParams.get('title');

  if (!id || !type) return NextResponse.json({ error: 'missing params' }, { status: 400 });

  const tmdbKey = process.env.TMDB_API_KEY;
  const omdbKey = process.env.OMDB_API_KEY;

  let data: any = { poster: null, backdrop: null, overview: '', rating: null, imdbRating: null, genres: [], runtime: null, cast: [], trailer: null, images: [] };

  if (tmdbKey) {
    try {
      // TMDB dan kengaytirilgan ma'lumot olish
      const res = await fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${tmdbKey}&append_to_response=credits,videos,images&language=en-US`, { next: { revalidate: 86400 } });
      if (res.ok) {
        const tmdbData = await res.json();
        data.poster = tmdbData.poster_path ? `https://image.tmdb.org/t/p/w500${tmdbData.poster_path}` : null;
        data.backdrop = tmdbData.backdrop_path ? `https://image.tmdb.org/t/p/original${tmdbData.backdrop_path}` : null;
        data.overview = tmdbData.overview || '';
        data.rating = tmdbData.vote_average ? tmdbData.vote_average.toFixed(1) : null;
        data.genres = tmdbData.genres?.map((g: any) => g.name) || [];
        data.runtime = tmdbData.runtime || tmdbData.episode_run_time?.[0] || null;
        data.cast = tmdbData.credits?.cast?.slice(0, 10).map((c: any) => ({ name: c.name, character: c.character, profile: c.profile_path ? `https://image.tmdb.org/t/p/w185${c.profile_path}` : null })) || [];
        data.images = tmdbData.images?.backdrops?.slice(0, 5).map((i: any) => `https://image.tmdb.org/t/p/w780${i.file_path}`) || [];
        
        // Treylerni topish
        const trailer = tmdbData.videos?.results?.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube');
        if (trailer) data.trailer = trailer.key;
      }
    } catch {}
  }

  if (omdbKey && title) {
    try {
      const omdbRes = await fetch(`https://www.omdbapi.com/?apikey=${omdbKey}&t=${encodeURIComponent(title)}`);
      if (omdbRes.ok) {
        const omdbData = await omdbRes.json();
        if (omdbData.Response === 'True' && omdbData.imdbRating !== 'N/A') {
          data.imdbRating = omdbData.imdbRating;
        }
      }
    } catch {}
  }

  return NextResponse.json(data, { headers: { 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800' } });
}
