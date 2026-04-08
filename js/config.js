const IS_DEV = ['localhost', '127.0.0.1'].includes(location.hostname);

export default {
  WEBSOCKET_CONNECT: IS_DEV ? 'ws://localhost:1337' : 'wss://battle-brawlers-server.vercel.app',
  ENVIRONMENT: IS_DEV ? 'development' : 'production',
  IS_DEV,
  IS_PROD: !IS_DEV,
  AUTO_EMAIL: IS_DEV ? 'me@korte.kim' : '',
  AUTO_PASSWORD: IS_DEV ? 'qwe123' : ''
};
