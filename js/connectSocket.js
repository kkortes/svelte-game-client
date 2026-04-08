import config from '/js/config.js';
import AsyncAwaitWebsocket from '/nodemodules/async-await-websockets/client.js';

let saveTimeout = null;

const saveGameState = () => {
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(async () => {
    if (!$.socket || !$.token) return;

    const res = await $.socket.sendAsync('store-game-state', {
      token: $.token,
      inventory: JSON.parse(JSON.stringify($.inventory)),
      characters: JSON.parse(JSON.stringify($.characters)),
      experience: $.experience,
      coins: $.coins,
      accountRewards: $.accountRewards
    });

    $.serverTimestampSnapshot = res;
    $.syncPerformanceNow = performance.now();
    console.info('Game state saved');
  }, 1000);
};

const connectWebSocket = () => {
  const ws = AsyncAwaitWebsocket(config.WEBSOCKET_CONNECT);

  ws.on('open', () => {
    $.socket = ws;
    console.info('Connected to game server');
  });

  ws.on('close', () => {
    console.info('Disconnected from game server, reconnecting...');
  });

  ws.on('broadcast', (data) => {
    console.info('Broadcast:', data);
  });
};

export const init = () => {
  connectWebSocket();

  $.on('afterUpdate', (current, prev) => {
    const settings = current.settings;
    if (settings) {
      Object.entries(settings).forEach(([key, value]) => {
        window.localStorage.setItem(key, JSON.stringify(value));
      });
    }

    saveGameState();
  });
};
