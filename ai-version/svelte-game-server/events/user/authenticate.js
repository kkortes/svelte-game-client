import json from '../../package.json' assert { type: 'json' };
import { isNewerVersion } from '../../helpers';
import mongodb from 'mongodb';
const { ObjectId } = mongodb;

const { version: serverVersion } = json;

export default async ({ token, clientVersion, isDev }, { mongo }) => {
  if (isNewerVersion(clientVersion, serverVersion) && !isDev)
    throw Error(
      `Your client is outdated, please try again soon (${clientVersion} < ${serverVersion})`
    );

  const user = await mongo.collection('users').findOne({ token });

  if (!user)
    throw Error(
      "Couldn't fetch gameState, if the problem persists please contact admin on discord"
    );

  const gameState = await mongo.collection('game-states').findOne({ _id: ObjectId(user._id) });

  const data = {
    serverTimestampSnapshot: Date.now() - 2 * 60 * 60 * 1000
  };

  if (gameState) data.gameState = gameState;

  return data;
};
