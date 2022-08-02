# Game stack

## Information

This is an opinionated mono repo for game dev using web tech.

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

```
cd svelte-game-server
npm install
npm run dev
```

## Features

✅ Socket server to handle any request (https://github.com/kkortes/async-await-websockets)
✅ Heroku backend hosting setup (https://www.heroku.com)
✅ Vercel frontend hosting setup (https://vercel.com)
❌

## Todo

- Account log in
- Account creation
- Account password recovery
- Notification center
