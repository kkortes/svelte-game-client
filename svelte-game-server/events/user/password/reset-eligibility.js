import hashids from 'hashids';

const { PASSWORD_RESET_HASH } = process.env;
const { decode } = new hashids(PASSWORD_RESET_HASH);

export default async ({ secret }, { mongo }) => {
  const collection = mongo.collection('users');

  const [pwr] = decode(secret);

  if (!pwr) throw Error('Reset link is either invalid or expired');

  const user = await collection.findOne({
    pwr
  });

  if (!user) throw Error('Reset link is either invalid or expired');

  // 20 minutes
  if (user.pwr + 1200000 < new Date().getTime())
    throw Error('Reset link is either invalid or expired');

  return user;
};
