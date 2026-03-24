// api.js — all TMDB API calls live here

const BASE_URL = 'https://api.themoviedb.org/3';
const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTEwZDY4ZjZkODdjOTkwZGQxZmIxNDkyOWI4ZDhjZSIsIm5iZiI6MTc3NDMwNjI5OS40NDIsInN1YiI6IjY5YzFjM2ZiZDdlM2M2MmU2OGEyNTk3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zNOVFp-n-Zsd7M7ZR2_XZpl57Z43L6WooNelG-3g_FY';

export const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  'Content-Type': 'application/json',
};

async function apiFetch(endpoint) {
  const res = await fetch(`${BASE_URL}${endpoint}`, { headers });
  if (!res.ok) throw new Error(`TMDB error: ${res.status}`);
  return res.json();
}

// Fetch popular movies (paginated)
export async function fetchPopularMovies(page = 1) {
  const data = await apiFetch(`/movie/popular?page=${page}`);
  return data.results;
}

// Fetch movies by genre ID
export async function fetchMoviesByGenre(genreId, page = 1) {
  const data = await apiFetch(`/discover/movie?with_genres=${genreId}&page=${page}`);
  return data.results;
}

// Search movies by query string
export async function searchMovies(query, page = 1) {
  if (!query.trim()) return [];
  const encoded = encodeURIComponent(query);
  const data = await apiFetch(`/search/movie?query=${encoded}&page=${page}`);
  return data.results;
}

// Fetch all genres
export async function fetchGenres() {
  const data = await apiFetch('/genre/movie/list');
  return data.genres;
}
