// firebase.js — Firebase app init and auth exports

import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js';

const firebaseConfig = {
  apiKey: "AIzaSyBpbLBXTWlpUQnCaFXBX9q0W9AlWQgss6Q",
  authDomain: "reelify-a0af6.firebaseapp.com",
  projectId: "reelify-a0af6",
  storageBucket: "reelify-a0af6.firebasestorage.app",
  messagingSenderId: "304614193263",
  appId: "1:304614193263:web:ed36474edb197e8434359a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
};
