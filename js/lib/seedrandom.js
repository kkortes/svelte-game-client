// ESM wrapper for seedrandom (which is UMD/CJS)
// Load it as a script and expose the global
const script = document.createElement('script');
script.src = '/nodemodules/seedrandom/seedrandom.min.js';
document.head.appendChild(script);

await new Promise(resolve => { script.onload = resolve; });

export default Math.seedrandom;
