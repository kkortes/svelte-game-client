import aaw from 'async-await-websockets';
import { MongoClient } from 'mongodb';
import { sizeOf } from './helpers.js';

const { PORT, MONGO_CONNECT } = process.env;

const client = new MongoClient(MONGO_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

client.connect((error, mongo) => {
  if (error) throw error;

  aaw(
    'events',
    { mongo: mongo.db('svelte-game') },
    undefined,
    ({ event, websocketKey, _async, error, body, _response }, log) => {
      const { version } = body || {};
      const toLog = [];

      toLog.push(`${error ? '🔴' : '🟢'} ${event}`);
      toLog.push(version || 'n/a');
      toLog.push(websocketKey);
      toLog.push(sizeOf(body));
      if (error) toLog.push(error);

      log(toLog.join(' | '));
    }
  );
});
