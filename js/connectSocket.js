import config from '/js/config.js';
import AsyncAwaitWebsocket from '/nodemodules/async-await-websockets/client.js';
import { notify } from '/js/actions.js';

let saveTimeout = null;

const saveGameState = () => {
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(async () => {
    if (!$.socket || !$.token) return;

    await $.socket.sendAsync('store-game-state', {
      token: $.token,
      inventory: JSON.parse(JSON.stringify($.inventory)),
      characters: JSON.parse(JSON.stringify($.characters)),
      experience: $.experience,
      coins: $.coins,
      accountRewards: $.accountRewards
    });

    console.info('Game state saved');
  }, 1000);
};

const connectWebSocket = () => {
  const ws = AsyncAwaitWebsocket(config.WEBSOCKET_CONNECT);

  ws.on('open', () => {
    $.socket = ws;
    notify({ success: 'Connected to game server' });
  });

  ws.on('close', () => {
    notify({ error: "Can't connect to game server" });
  });

  ws.on('broadcast', (data) => {
    console.info('Broadcast:', data);
  });
};

export const init = () => {
  connectWebSocket();

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
      accountRewards: $.accountRewards
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
