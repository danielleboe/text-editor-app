// const butInstall = document.getElementById('buttonInstall');

// console.log('Service Worker Registered:', 'serviceWorker' in navigator);
// console.log('Manifest Linked:', document.querySelector('link[rel="manifest"]'));
// console.log('Running over HTTPS:', location.protocol === 'https:');



// let deferredPrompt;

// window.addEventListener('beforeinstallprompt', (event) => {
//   console.log(`11111beforeinsall-befre`);
//   // Prevent the mini-infobar from appearing on mobile
//   event.preventDefault();
//   // Store the event so it can be triggered later
//   deferredPrompt = event;
//   // Show the install button
//   butInstall.style.display = 'block';

//   console.log('beforeinstallprompt event fired');
// });

// butInstall.addEventListener('click', async () => {
//   if (deferredPrompt) {
//     // Hide the install button
//     butInstall.style.display = 'none';
//     // Show the install prompt
//     deferredPrompt.prompt();
//     // Wait for the user to respond to the prompt
//     const result = await deferredPrompt.userChoice;
//     console.log('User response to the install prompt:', result);
//     // Clear the deferred prompt
//     deferredPrompt = null;
//   } else {
//     console.log('No deferredPrompt available.');
//   }
// });

// window.addEventListener('appinstalled', (event) => {
//   // Clear the deferred prompt
//   deferredPrompt = null;
//   console.log('PWA was installed successfully:', event);
// });
const butInstall = document.getElementById('buttonInstall');

// Assume we always have an install prompt available for simplicity
let deferredPrompt = null;

// Handle the click event on the install button
butInstall.addEventListener('click', async () => {
  if (!deferredPrompt) {
    console.log('No install prompt is available.');
    return;
  }

  // Show the install prompt
  deferredPrompt.prompt();
  
  // Wait for the user to respond to the prompt
  const result = await deferredPrompt.userChoice;
  console.log('User response to the install prompt:', result);

  // Clear the deferredPrompt variable
  deferredPrompt = null;
});

// This ensures the button is always visible, since we're not relying on the beforeinstallprompt event.
butInstall.style.display = 'block';
