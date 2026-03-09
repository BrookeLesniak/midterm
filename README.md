# Reelify — Movie Tracker Web App

## Project Description

For my midterm project I am creating a web app that tracks movies using HTML, CSS, and Javascript. Its MVP features would be: Browse a collection of movies, save favorites to localStorage, mark as watched, rate/review, and filter by genre. Other features that I would like to implement later on would be: a User profile with editable info, advanced filtering, user authentication, and a cloud database.

---

## Features

### Phase 1: MVP
- Browse a collection of movies
- Save favorites to localStorage
- Mark movies as watched
- Rate and review movies
- Filter by genre

### Phase 2: Complete Tier Integration
- User profile with editable info
- Advanced filtering and sorting
- User authentication
- Cloud database

---

## Build Plan

### Phase 1: MVP

#### Foundation
- [ ] **1.** Create folder structure: `css/`, `js/`, `pages/`
- [ ] **2.** Build `index.html` with navbar linking all pages
- [ ] **3.** Build `styles.css` — base styles, navbar, card grid, responsive layout
- [ ] **4.** Register for a TMDB API key
- [ ] **5.** Build `api.js` — fetch popular movies, by genre, and by search query

#### Browsing
- [ ] **6.** Build `movies.js` — render movie cards (poster, title, year, genre) from API data
- [ ] **7.** Build `browse.html` — calls `movies.js` on load, displays movie grid
- [ ] **8.** Add search bar that queries API and re-renders the grid

#### Storage Layer
- [ ] **9.** Build `storage.js` with methods for favorites, watched, reviews, and profile — keep all `localStorage` calls inside this file only

#### Favorites & Watched
- [ ] **10.** Add Favorite and Watched toggle buttons to each movie card
- [ ] **11.** Wire buttons to `storage.js`, reflect saved state visually on the card
- [ ] **12.** Build `favorites.html` — renders saved favorites from `storage.js`
- [ ] **13.** Build `watched.html` — renders watched movies from `storage.js`
- [ ] **14.** Add remove buttons on both pages to delete entries from storage

#### Ratings & Reviews
- [ ] **15.** Build a movie detail modal that opens on card click
- [ ] **16.** Add 1–5 star rating input and text review field to the modal
- [ ] **17.** Save and display existing rating/review when modal reopens

#### Genre Filtering
- [ ] **18.** Fetch genre list from TMDB and render filter buttons on `browse.html`
- [ ] **19.** Wire genre selection to re-render the grid, compatible with active search

#### Polish & Testing
- [ ] **20.** Add loading states while API fetches and error messages on failure
- [ ] **21.** Add empty state messages ("No favorites yet", etc.)
- [ ] **22.** Verify all data persists correctly after page refresh
- [ ] **23.** Fix any mobile layout issues

---

### Phase 2: Complete Tier Integration

#### User Profile
- [ ] **24.** Build `profile.html` with editable name, avatar, and bio fields
- [ ] **25.** Display user stats: total watched, total favorites, average rating

#### Advanced Filtering
- [ ] **26.** Add sort options (popularity, release date, your rating)
- [ ] **27.** Add year range and minimum rating filters
- [ ] **28.** Persist active filter/sort preferences in `storage.js`

#### Authentication
- [ ] **29.** Set up Firebase or Supabase project
- [ ] **30.** Build `login.html` and `signup.html`
- [ ] **31.** Add auth guard — redirect unauthenticated users to login
- [ ] **32.** Show logged-in user name/avatar in the navbar

#### Cloud Database
- [ ] **33.** Set up cloud DB collections (favorites, watched, reviews, profile)
- [ ] **34.** Replace `storage.js` internals with cloud DB calls, keeping method names identical
- [ ] **35.** On first login, migrate existing localStorage data to the cloud
- [ ] **36.** Verify data syncs across multiple tabs/devices

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Markup | HTML5 |
| Styling | CSS3 |
| Logic | Vanilla JavaScript |
| Movie Data | TMDB API |
| Storage (MVP) | localStorage |
| Storage (Phase 2) | Firebase / Supabase |
| Auth (Phase 2) | Firebase Auth / Supabase Auth |

---

## Project Structure

```
movie-tracker/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── app.js
│   ├── api.js
│   ├── storage.js
│   ├── movies.js
│   ├── favorites.js
│   └── filters.js
└── pages/
    ├── browse.html
    ├── favorites.html
    ├── watched.html
    └── profile.html
```
