import aaw from 'async-await-websockets';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { sizeOf } from './helpers.js';
dotenv.config();

const { PORT, CORS_ORIGIN, MONGO_CONNECT } = process.env;

const client = new MongoClient(MONGO_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

client.connect((error, mongo) => {
  if (error) throw error;

  aaw(
    'events',
    { mongo: mongo.db('svelte-game') },
    PORT,
    {
      cors: {
        origin: CORS_ORIGIN
      },
      transports: ['websocket'],
      haxHttpBufferSize: 1e7
    },
    ({ event, socketID, _async, error, body, _response }, log) => {
      const { version, accountName, latency } = body || {};
      const toLog = [];

      toLog.push(`${error ? '🔴' : '🟢'} ${event}`);
      toLog.push(version || 'n/a');
      toLog.push(accountName || 'unknown');
      toLog.push(socketID);
      toLog.push(sizeOf(body));
      toLog.push(latency ? `${latency}ms` : 'n/a');
      if (error) toLog.push(error);

      log(toLog.join(' | '));
    }
  );
});
