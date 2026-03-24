// storage.js — all localStorage access lives here

const KEYS = {
  favorites: 'reelify_favorites',
  watched:   'reelify_watched',
  reviews:   'reelify_reviews',
};

function load(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? null;
  } catch {
    return null;
  }
}

function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.error('Storage full — could not save data.');
  }
}

// ===========================
// Favorites
// ===========================

export function getFavorites() {
  return load(KEYS.favorites) ?? [];
}

export function addFavorite(movie) {
  const favorites = getFavorites();
  if (!favorites.find(m => m.id === movie.id)) {
    favorites.push(movie);
    save(KEYS.favorites, favorites);
  }
}

export function removeFavorite(movieId) {
  save(KEYS.favorites, getFavorites().filter(m => m.id !== movieId));
}

export function isFavorite(movieId) {
  return getFavorites().some(m => m.id === movieId);
}

// ===========================
// Watched
// ===========================

export function getWatched() {
  return load(KEYS.watched) ?? [];
}

export function addWatched(movie) {
  const watched = getWatched();
  if (!watched.find(m => m.id === movie.id)) {
    watched.push(movie);
    save(KEYS.watched, watched);
  }
}

export function removeWatched(movieId) {
  save(KEYS.watched, getWatched().filter(m => m.id !== movieId));
}

export function isWatched(movieId) {
  return getWatched().some(m => m.id === movieId);
}

// ===========================
// Reviews
// ===========================

export function getReviews() {
  return load(KEYS.reviews) ?? {};
}

export function getReview(movieId) {
  return getReviews()[movieId] ?? null;
}

export function saveReview(movieId, { rating, text }) {
  const reviews = getReviews();
  reviews[movieId] = { rating, text };
  save(KEYS.reviews, reviews);
}

export function removeReview(movieId) {
  const reviews = getReviews();
  delete reviews[movieId];
  save(KEYS.reviews, reviews);
}

