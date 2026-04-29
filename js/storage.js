// storage.js — Firestore-backed storage with synchronous in-memory cache

import { auth, db } from './firebase.js';
import { doc, getDoc, setDoc, collection, getDocs } from 'https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js';

let uid = null;
let cache = { favorites: [], watched: [], reviews: {} };

export async function initStorage(userId) {
  uid = userId;
  const snap = await getDoc(doc(db, 'users', uid));
  if (snap.exists()) {
    const data = snap.data();
    cache.favorites = data.favorites ?? [];
    cache.watched   = data.watched   ?? [];
    cache.reviews   = data.reviews   ?? {};
  } else {
    cache = { favorites: [], watched: [], reviews: {} };
  }
}

function persist() {
  if (!uid) return;
  setDoc(doc(db, 'users', uid), { ...cache }).catch(console.error);
}

// ===========================
// Favorites
// ===========================

export function getFavorites() { return [...cache.favorites]; }

export function addFavorite(movie) {
  if (!isFavorite(movie.id)) { cache.favorites.push(movie); persist(); }
}

export function removeFavorite(movieId) {
  cache.favorites = cache.favorites.filter(m => m.id !== movieId);
  persist();
}

export function isFavorite(movieId) {
  return cache.favorites.some(m => m.id === movieId);
}

// ===========================
// Watched
// ===========================

export function getWatched() { return [...cache.watched]; }

export function addWatched(movie) {
  if (!isWatched(movie.id)) { cache.watched.push(movie); persist(); }
}

export function removeWatched(movieId) {
  cache.watched = cache.watched.filter(m => m.id !== movieId);
  persist();
}

export function isWatched(movieId) {
  return cache.watched.some(m => m.id === movieId);
}

// ===========================
// Reviews
// ===========================

export function getReviews() { return { ...cache.reviews }; }

export function getReview(movieId) { return cache.reviews[movieId] ?? null; }

export function saveReview(movieId, { rating, text }) {
  cache.reviews[movieId] = { rating, text };
  persist();
  const user = auth.currentUser;
  if (user) {
    setDoc(doc(db, 'movieReviews', String(movieId), 'reviews', user.uid), {
      rating, text, displayName: user.displayName || user.email, uid: user.uid
    }).catch(console.error);
  }
}

export async function getMovieReviews(movieId) {
  const snap = await getDocs(collection(db, 'movieReviews', String(movieId), 'reviews'));
  return snap.docs.map(d => d.data());
}

export function removeReview(movieId) {
  delete cache.reviews[movieId];
  persist();
}
