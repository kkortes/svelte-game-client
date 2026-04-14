const IS_DEV = import.meta.env.VITE_VERCEL_ENV === 'development';

export default {
  WEBSOCKET_CONNECT: import.meta.env.VITE_WEBSOCKET_CONNECT ?? '',
  ENVIRONMENT: import.meta.env.VITE_VERCEL_ENV ?? 'production',
  IS_DEV,
  IS_PROD: !IS_DEV,
  AUTO_EMAIL: import.meta.env.VITE_AUTO_EMAIL ?? '',
  AUTO_PASSWORD: import.meta.env.VITE_AUTO_PASSWORD ?? ''
};
