import AsyncAwaitWebsocket from 'async-await-websockets';

import config from '/js/config.js';

let saveTimeout = null;

const buildSavePayload = () => ({
  token: $.token,
  inventory: JSON.parse(JSON.stringify($.inventory)),
  characters: JSON.parse(JSON.stringify($.characters)),
  experience: $.experience,
  coins: $.coins,
  accountRewards: $.accountRewards,
});

const saveGameState = () => {
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(async () => {
    if (!$.socket || !$.token) return;

    await $.socket.sendAsync('store-game-state', buildSavePayload());

    console.info('Game state saved');
  }, 1000);
};

// Flush any pending debounced save immediately, wait for server ACK, and
// return. Use this before a full-page navigation that depends on the saved
// state being readable by the destination page (e.g. recruiting a brawler
// and redirecting to /brawlers/<index>).
export const saveNow = async () => {
  clearTimeout(saveTimeout);
  saveTimeout = null;
  if (!$.socket || !$.token) return;
  await $.socket.sendAsync('store-game-state', buildSavePayload());
  console.info('Game state saved (forced)');
};

let wasConnected = false;

export const init = () => {
  const ws = AsyncAwaitWebsocket(config.WEBSOCKET_CONNECT);

  ws.on('open', (e) => {
    $.socket = e.target;
    if (wasConnected) notify({ success: 'Connected to game server' });
    wasConnected = true;
  });

  ws.on('close', () => {
    if ($.socket) notify({ error: "Can't connect to game server" });
    $.socket = undefined;
  });

  ws.on('broadcast', (data) => console.info('Broadcast:', data));

  // Flush pending save before page unloads (MPA navigation, tab close, etc.)
  window.addEventListener('beforeunload', () => {
    if (!saveTimeout || !$.socket || !$.token) return;
    clearTimeout(saveTimeout);
    $.socket.sendAsync('store-game-state', {
      token: $.token,
      inventory: JSON.parse(JSON.stringify($.inventory)),
      characters: JSON.parse(JSON.stringify($.characters)),
      experience: $.experience,
      coins: $.coins,
      accountRewards: $.accountRewards,
    });
  });

  $.on('afterUpdate', (current, prev) => {
    const settings = current.settings;
    if (settings) {
      Object.entries(settings).forEach(([key, value]) => {
        window.localStorage.setItem(key, JSON.stringify(value));
      });
    }

    // Only save when game data actually changed
    if (
      current.characters !== prev.characters ||
      current.inventory !== prev.inventory ||
      current.experience !== prev.experience ||
      current.coins !== prev.coins ||
      current.accountRewards !== prev.accountRewards
    ) {
      saveGameState();
    }
  });
};
