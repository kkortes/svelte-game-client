import mongodb from 'mongodb';
const { ObjectId } = mongodb;

export default async (data, { ws, mongo }) => {
  const gameStates = mongo.collection('game-states');
  const updated = new Date();

  const users = mongo.collection('users');

  const user = await users.findOne({
    token: data.token
  });

  if (!user) throw Error('User not logged in');

  await gameStates.updateOne(
    {
      _id: ObjectId(user._id)
    },
    { $set: { ...data, updated } },
    {
      upsert: true
    }
  );

  return Date.now() - 2 * 60 * 60 * 1000;
};
