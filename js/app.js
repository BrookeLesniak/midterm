// app.js — runs on every page

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// Highlight active nav link based on current page
const currentPath = window.location.pathname;
document.querySelectorAll('.nav-links a').forEach(link => {
  if (link.getAttribute('href') && currentPath.endsWith(link.getAttribute('href').replace('../', ''))) {
    link.classList.add('active');
  }
});
