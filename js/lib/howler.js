// ESM wrapper for Howler.js (UMD)
// Loads async — Howl/Howler become available after script loads
const script = document.createElement('script');
script.src = '/nodemodules/howler/dist/howler.min.js';
document.head.appendChild(script);

await new Promise((resolve, reject) => {
  script.onload = resolve;
  script.onerror = () => {
    console.warn('[howler] Failed to load audio library');
    resolve(); // Don't block the app
  };
});

export const Howl = window.Howl || function() { return { play() {} }; };
export const Howler = window.Howler || {};
export default { Howl, Howler };
