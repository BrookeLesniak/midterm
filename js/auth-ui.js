// auth-ui.js — auth guard + nav population used by every protected page

import { auth, onAuthStateChanged, signOut } from './firebase.js';

// Call this at the top of every protected page's module script.
// - Redirects to loginPath if not signed in.
// - Populates the nav username and wires the logout button.
// - Returns a Promise that resolves with the user once auth is confirmed.
export function initAuthUI(loginPath) {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.href = loginPath;
        return;
      }

      const nameEl = document.querySelector('.nav-username');
      if (nameEl) nameEl.textContent = user.displayName || user.email;

      const logoutBtn = document.querySelector('.nav-logout');
      if (logoutBtn && !logoutBtn._wired) {
        logoutBtn._wired = true;
        logoutBtn.addEventListener('click', async () => {
          await signOut(auth);
          window.location.href = loginPath;
        });
      }

      resolve(user);
    });
  });
}
