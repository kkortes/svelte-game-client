## My personal repo

This repo is a work in progress and is currently my personal thing. Feel free to fork or ask questions about it, but expect things to change drastically.

## Information

This is a highly opinionated mono repo for game dev using web tech.

The stack is:

- `Svelte` for frontend (https://svelte.dev)
- `Node` for backend (https://nodejs.org)
- `MongoDB` for database (https://www.mongodb.com)

## Run the client locally

```
vercel env pull (creates .env)
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
- ✅ Heroku backend hosting setup (https://www.heroku.com)
- ✅ Vercel frontend hosting setup (https://vercel.com)

## Code base quirks

- Global styling is done like so: `:global(.anElement .anotherElement.anotherElement)`. It has to do with how Svelte is applying their automatic classes for scoping. It might be possible to skip the extra `.anotherElement` in the future. Skipping it now makes `development` and `production` run differentiating CSS.

- `.env (development) & .env.production (production)` are injected into `src/constants/ENV_VARS.js`. Trying to parse `import.meta.X` won't work in Svelte files, due to vite crashing when there is CSS in the files that they parse.

- This repo utilizes `sveltekit-autoimport` (https://github.com/yuanchuan/sveltekit-autoimport) hence some `.svelte` and `.js` imports seem to magically appear out of nowhere. See `vite.config.js` to see what's going on. Furthermore for `const { someStoreProperty } = STORES` to work properly, a bunch of code has been abstracted into `/src/store` for ease of use.
