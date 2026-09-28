export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (request.method === 'OPTIONS') return new Response(null, { headers: cors() });

    // ── Root status page ─────────────────────────────
    if (path === '/' || path === '') {
      return json({
        status: 'ok',
        worker: 'tmdb-proxy',
        message: 'Movies Hub proxy is running 🎬',
        endpoints: [
          '/api/trending?type=movie|tv|all&window=week|day&page=1',
          '/api/search?q=inception&type=multi',
          '/api/discover?type=movie&with_genres=28&page=1',
          '/api/top_rated?type=movie&page=1',
          '/api/movie/:id',
          '/api/tv/:id'
        ]
      });
    }
    // ─────────────────────────────────────────────────

    try {
      // /api/search?q=...&type=multi|movie|tv&page=1
      if (path === '/api/search') {
        const q    = url.searchParams.get('q') || '';
        const type = url.searchParams.get('type') || 'multi';
        const page = url.searchParams.get('page') || '1';
        if (!q) return json({ error: 'Missing q' }, 400);
        const data = await tmdb(env, `/search/${type}?query=${encodeURIComponent(q)}&page=${page}`);
        return json(normalizeList(data, env));
      }

      // /api/trending?type=movie|tv|all&window=week|day&page=1
      if (path === '/api/trending') {
        const type   = url.searchParams.get('type') || 'movie';
        const window = url.searchParams.get('window') || 'week';
        const page   = url.searchParams.get('page') || '1';
        const data = await tmdb(env, `/trending/${type}/${window}?page=${page}`);
        return json(normalizeList(data, env));
      }

      // /api/discover?type=movie|tv&page=1&with_genres=28&sort_by=...
      if (path === '/api/discover') {
        const type = url.searchParams.get('type') || 'movie';
        const page = url.searchParams.get('page') || '1';
        const passthrough = new URLSearchParams(url.searchParams);
        passthrough.delete('type');
        const data = await tmdb(env, `/discover/${type}?${passthrough.toString()}`);
        return json(normalizeList(data, env));
      }

      // /api/top_rated?type=movie|tv&page=1
      if (path === '/api/top_rated') {
        const type = url.searchParams.get('type') || 'movie';
        const page = url.searchParams.get('page') || '1';
        const data = await tmdb(env, `/${type}/top_rated?page=${page}`);
        return json(normalizeList(data, env));
      }

      // /api/movie/:id  or  /api/tv/:id  (with credits appended)
      const detail = path.match(/^\/api\/(movie|tv)\/(\d+)$/);
      if (detail) {
        const [, kind, id] = detail;
        const data = await tmdb(env, `/${kind}/${id}?append_to_response=credits`);
        return json(normalizeDetail(data, env, kind));
      }

      return json({ error: 'Not found' }, 404);
    } catch (err) {
      return json({ error: err.message }, err.status || 500);
    }
  }
};

// ---------- helpers ----------
async function tmdb(env, endpoint) {
  const sep = endpoint.includes('?') ? '&' : '?';
  const res = await fetch(`${env.TMDB_BASE}${endpoint}${sep}api_key=${env.TMDB_KEY}`);
  if (!res.ok) {
    const err = new Error(`TMDB ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

function normalizeList(data, env) {
  return {
    page: data.page,
    total_pages: data.total_pages,
    total_results: data.total_results,
    results: (data.results || []).map(r => ({
      ...r,
      media_type: r.media_type || (r.title ? 'movie' : 'tv'),
      poster:   r.poster_path   ? `${env.TMDB_IMG}${r.poster_path}`   : null,
      backdrop: r.backdrop_path ? `${env.TMDB_BACK}${r.backdrop_path}` : null,
    }))
  };
}

function normalizeDetail(r, env, kind) {
  return {
    ...r,
    media_type: kind,
    poster:   r.poster_path   ? `${env.TMDB_IMG}${r.poster_path}`   : null,
    backdrop: r.backdrop_path ? `${env.TMDB_BACK}${r.backdrop_path}` : null,
    cast: r.credits?.cast?.slice(0, 10).map(c => c.name) || [],
  };
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...cors() }
  });
}
function cors() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
}
