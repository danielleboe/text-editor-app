// src/js/index.js

import { Workbox } from 'workbox-window';
import Editor from './editor';
// import './database';
import '../css/style.css';

const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
    <div class="loading-spinner"></div>
  </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();
if (typeof editor === 'undefined') {
  loadSpinner();
}

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // Register workbox service worker from the root path
  const workboxSW = new Workbox('/service-worker.js'); // Ensure this path matches your service worker output
  workboxSW.register();
} else {
  console.error('Service workers are not supported in this browser.');
}

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/service-worker.js')
//       .then((registration) => {
//         console.log('Service Worker registered with scope:', registration.scope);
//       })
//       .catch((error) => {
//         console.error('Service Worker registration failed:', error);
//       });
//   });
// }
