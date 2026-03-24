// movies.js — renders movie cards into a grid container

import { IMG_BASE } from './api.js';
import {
  isFavorite, addFavorite, removeFavorite,
  isWatched, addWatched, removeWatched
} from './storage.js';
import { openModal } from './modal.js';

// Build a single movie card element
export function createMovieCard(movie, genres = []) {
  const year = movie.release_date ? movie.release_date.slice(0, 4) : 'N/A';

  const genreNames = (movie.genre_ids || [])
    .slice(0, 2)
    .map(id => genres.find(g => g.id === id)?.name)
    .filter(Boolean)
    .join(', ') || 'Unknown';

  const card = document.createElement('article');
  card.className = 'movie-card';
  card.dataset.id = movie.id;

  const posterHTML = movie.poster_path
    ? `<img class="card-poster" loading="lazy" />`
    : `<div class="card-poster no-poster"></div>`;

  card.innerHTML = `
    ${posterHTML}
    <div class="card-info">
      <h3 class="card-title">${movie.title}</h3>
      <p class="card-meta">${year} &middot; ${genreNames}</p>
      <div class="card-actions">
        <button class="btn-watched" aria-label="Watched" title="Watched">&#128065;</button>
        <button class="btn-favorite" aria-label="Favorite" title="Favorite">&#9829;</button>
      </div>
    </div>
  `;

  if (movie.poster_path) {
    const img = card.querySelector('.card-poster');
    img.src = `${IMG_BASE}${movie.poster_path}`;
    img.alt = `${movie.title} poster`;
  }

  const favBtn = card.querySelector('.btn-favorite');
  const watchBtn = card.querySelector('.btn-watched');

  // Set initial state
  if (isFavorite(movie.id)) favBtn.classList.add('active');
  if (isWatched(movie.id)) watchBtn.classList.add('active');

  // Favorite toggle
  favBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
      favBtn.classList.remove('active');
    } else {
      addFavorite(movie);
      favBtn.classList.add('active');
    }
  });

  // Watched toggle
  watchBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isWatched(movie.id)) {
      removeWatched(movie.id);
      watchBtn.classList.remove('active');
    } else {
      addWatched(movie);
      watchBtn.classList.add('active');
    }
  });

  // Open modal on card click
  card.addEventListener('click', () => openModal(movie, genres));

  return card;
}

// Render an array of movies into a container element
export function renderMovies(movies, container, genres = []) {
  if (!container) {
    console.error('renderMovies: container not found');
    return;
  }

  container.innerHTML = '';

  if (!movies.length) {
    container.innerHTML = '<p class="empty-state">No movies found.</p>';
    return;
  }

  movies.forEach(movie => {
    container.appendChild(createMovieCard(movie, genres));
  });
}
