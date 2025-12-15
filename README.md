## My personal repo

This repo is a work in progress and is currently my personal thing. Feel free to fork or ask questions about it, but expect things to change drastically.

## Information

This is a highly opinionated monorepo for game dev using web tech.

The stack is:

- `Svelte` for frontend (https://svelte.dev)
- `Bun` for backend (https://bun.sh)
- `MongoDB` for database (https://www.mongodb.com)

## Run the client locally

```
nvm use
npm install
npm run dev
```

## Run the server locally

`touch .env` and add:

```
PORT=1337
CORS_ORIGIN=*
NODE_ENV=development
MONGO_CONNECT=mongodb://wsadmin:qwe123@localhost:27017
SUPPORT_EMAIL_PASSWORD=<password>
PASSWORD_RESET_HASH=<custom_hash>
```

```
cd svelte-game-server
npm install
npm run dev
```

## Features

- ✅ Socket server to handle any request (https://github.com/kkortes/async-await-websockets)
- ✅ Account log in
- ✅ Account creation
- ✅ Account password recovery
- ✅ Notification center
- ✅ Render backend hosting setup (https://render.com)
- ✅ Vercel frontend hosting setup (https://vercel.com)
- ✅ Tailwind CSS for styling (https://tailwindcss.com)

## Code base quirks

- `.env (development) & .env.production (production)` are injected into `src/constants/ENV_VARS.ts`. Trying to parse `import.meta.X` won't work in Svelte files, due to vite crashing when there is CSS in the files that they parse.

- This repo utilizes `sveltekit-autoimport` (https://github.com/yuanchuan/sveltekit-autoimport) hence some `.svelte` and `.js` imports seem to magically appear out of nowhere. See `vite.config.js` to see what's going on.
