import dotenv from 'dotenv';
import hashids from 'hashids';

dotenv.config();
const { PASSWORD_RESET_HASH } = process.env;
const hash = new hashids(PASSWORD_RESET_HASH);

export default async ({ secret }, _io, _socket, { mongo }) => {
  const collection = mongo.collection('users');

  const [pwr] = hash.decode(secret);

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
