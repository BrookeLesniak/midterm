// modal.js — movie detail modal

import { IMG_BASE } from './api.js';
import {
  getReview, saveReview,
  isFavorite, addFavorite, removeFavorite,
  isWatched, addWatched, removeWatched
} from './storage.js';

// Create modal element and append to body once
const modal = document.createElement('div');
modal.className = 'modal-overlay';
modal.innerHTML = `
  <div class="modal">
    <button class="modal-close" aria-label="Close">&times;</button>
    <div class="modal-body">
      <div class="modal-poster-wrap">
        <img class="modal-poster" alt="" />
      </div>
      <div class="modal-info">
        <h2 class="modal-title"></h2>
        <p class="modal-meta"></p>
        <p class="modal-overview"></p>
        <div class="modal-actions">
          <button class="modal-btn-watched">&#128065;<span>Watched</span></button>
          <button class="modal-btn-favorite">&#9829;<span>Favorite</span></button>
        </div>
        <div class="modal-review">
          <p class="review-label">Your Rating</p>
          <div class="star-rating">
            <button class="star" data-value="1">&#9733;</button>
            <button class="star" data-value="2">&#9733;</button>
            <button class="star" data-value="3">&#9733;</button>
            <button class="star" data-value="4">&#9733;</button>
            <button class="star" data-value="5">&#9733;</button>
          </div>
          <textarea class="review-text" placeholder="Write a review..." rows="3"></textarea>
          <button class="btn-save-review">Save Review</button>
          <p class="review-saved-msg" hidden>Review saved!</p>
        </div>
      </div>
    </div>
  </div>
`;
document.body.appendChild(modal);

const closeBtn      = modal.querySelector('.modal-close');
const posterEl      = modal.querySelector('.modal-poster');
const titleEl       = modal.querySelector('.modal-title');
const metaEl        = modal.querySelector('.modal-meta');
const overviewEl    = modal.querySelector('.modal-overview');
const stars         = modal.querySelectorAll('.star');
const reviewText    = modal.querySelector('.review-text');
const saveBtn       = modal.querySelector('.btn-save-review');
const savedMsg      = modal.querySelector('.review-saved-msg');
const favBtn        = modal.querySelector('.modal-btn-favorite');
const watchBtn      = modal.querySelector('.modal-btn-watched');

let currentMovie   = null;
let selectedRating = 0;

// Highlight stars up to the given value
function setStars(value) {
  stars.forEach(star => {
    star.classList.toggle('active', Number(star.dataset.value) <= value);
  });
}

// Star click
stars.forEach(star => {
  star.addEventListener('click', () => {
    selectedRating = Number(star.dataset.value);
    setStars(selectedRating);
  });
});

// Star hover preview
stars.forEach(star => {
  star.addEventListener('mouseenter', () => setStars(Number(star.dataset.value)));
  star.addEventListener('mouseleave', () => setStars(selectedRating));
});

// Favorite toggle
favBtn.addEventListener('click', () => {
  if (!currentMovie) return;
  if (isFavorite(currentMovie.id)) {
    removeFavorite(currentMovie.id);
    favBtn.classList.remove('active');
  } else {
    addFavorite(currentMovie);
    favBtn.classList.add('active');
  }
});

// Watched toggle
watchBtn.addEventListener('click', () => {
  if (!currentMovie) return;
  if (isWatched(currentMovie.id)) {
    removeWatched(currentMovie.id);
    watchBtn.classList.remove('active');
  } else {
    addWatched(currentMovie);
    watchBtn.classList.add('active');
  }
});

// Save review
saveBtn.addEventListener('click', () => {
  if (!currentMovie) return;
  saveReview(currentMovie.id, { rating: selectedRating, text: reviewText.value.trim() });
  savedMsg.hidden = false;
  setTimeout(() => { savedMsg.hidden = true; }, 2000);
});

export function openModal(movie, genres = []) {
  currentMovie = movie;

  favBtn.classList.toggle('active', isFavorite(movie.id));
  watchBtn.classList.toggle('active', isWatched(movie.id));

  // Load existing review before setting stars
  const existing = getReview(currentMovie.id);
  selectedRating     = existing?.rating || 0;
  reviewText.value   = existing?.text || '';

  const year = movie.release_date ? movie.release_date.slice(0, 4) : 'N/A';

  const genreNames = (movie.genre_ids || [])
    .map(id => genres.find(g => g.id === id)?.name)
    .filter(Boolean)
    .join(', ') || 'Unknown';

  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

  if (movie.poster_path) {
    posterEl.src = `${IMG_BASE}${movie.poster_path}`;
    posterEl.alt = `${movie.title} poster`;
    posterEl.style.display = 'block';
  } else {
    posterEl.style.display = 'none';
  }

  titleEl.textContent    = movie.title;
  metaEl.textContent     = `${year} · ${genreNames} · ★ ${rating}`;
  overviewEl.textContent = movie.overview || 'No description available.';

  setStars(selectedRating);
  savedMsg.hidden = true;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

export function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

// Close on backdrop click
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

// Close on X button
closeBtn.addEventListener('click', closeModal);

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
});
