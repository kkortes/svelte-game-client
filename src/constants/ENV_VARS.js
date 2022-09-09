// Named exports are needed to import these individually in .js-files (see `src/helpers.js`)
export const WEBSOCKET_CONNECT = import.meta.env.VITE_WEBSOCKET_CONNECT;
export const ENVIRONMENT = import.meta.env.VITE_VERCEL_ENV;
export const AUTO_EMAIL = import.meta.env.VITE_AUTO_EMAIL;
export const AUTO_PASSWORD = import.meta.env.VITE_AUTO_PASSWORD;
export const IS_DEV = ENVIRONMENT === 'development';
export const IS_PROD = ENVIRONMENT === 'production';
export const IS_PREV = ENVIRONMENT === 'preview';

// Default export is needed to expose `ENV` (see `vite.config.js`)
export default {
  WEBSOCKET_CONNECT,
  ENVIRONMENT,
  AUTO_EMAIL,
  AUTO_PASSWORD,
  IS_DEV,
  IS_PROD,
  IS_PREV
};
