const WEBSOCKET_CONNECT = import.meta.env.VITE_WEBSOCKET_CONNECT;
const ENVIRONMENT = import.meta.env.VITE_VERCEL_ENV;
const AUTO_EMAIL = import.meta.env.VITE_AUTO_EMAIL;
const AUTO_PASSWORD = import.meta.env.VITE_AUTO_PASSWORD;

const isDev = ENVIRONMENT === 'development';
const isProd = ENVIRONMENT === 'production';
const isPrev = ENVIRONMENT === 'preview';

export default { WEBSOCKET_CONNECT, ENVIRONMENT, AUTO_EMAIL, AUTO_PASSWORD, isDev, isProd, isPrev };
