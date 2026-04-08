// ESM wrapper for Howler.js (UMD)
const script = document.createElement('script');
script.src = '/nodemodules/howler/dist/howler.min.js';
document.head.appendChild(script);

await new Promise(resolve => { script.onload = resolve; });

export const Howl = window.Howl;
export const Howler = window.Howler;
export default { Howl, Howler };
