import sha1 from 'sha1';
import dotenv from 'dotenv';
import hashids from 'hashids';
dotenv.config();

const { PASSWORD_RESET_HASH } = process.env;
const hash = new hashids(PASSWORD_RESET_HASH);

export default async ({ password, secret }, { mongo }) => {
  const collection = mongo.collection('users');

  const [pwr] = hash.decode(secret);

  if (password.length < 3) throw Error('Your password needs to be at least 3 characters long');

  const { matchedCount } = await collection.updateOne(
    { pwr },
    { $set: { password: sha1(password), pwr: null } }
  );

  if (matchedCount) return;

  throw Error('Reset link is either invalid or expired');
};
