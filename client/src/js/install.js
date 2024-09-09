const butInstall = document.getElementById('buttonInstall');

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the mini-infobar from appearing on mobile
  event.preventDefault();
  // Store the event so it can be triggered later
  deferredPrompt = event;
  // Show the install button
  butInstall.style.display = 'block';

  console.log('beforeinstallprompt event fired');
});

butInstall.addEventListener('click', async () => {
  if (deferredPrompt) {
    // Hide the install button
    butInstall.style.display = 'none';
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const result = await deferredPrompt.userChoice;
    console.log('User response to the install prompt:', result);
    // Clear the deferred prompt
    deferredPrompt = null;
  } else {
    console.log('No deferredPrompt available.');
  }
});

window.addEventListener('appinstalled', (event) => {
  // Clear the deferred prompt
  deferredPrompt = null;
  console.log('PWA was installed successfully:', event);
});
