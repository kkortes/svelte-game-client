import hashids from 'hashids';

const {
  password: { hash, verify }
} = Bun;

const { PASSWORD_RESET_HASH } = process.env;
const { decode } = new hashids(PASSWORD_RESET_HASH);

export default async ({ password, secret }, { mongo }) => {
  const collection = mongo.collection('users');

  const [pwr] = decode(secret);

  if (password.length < 3) throw Error('Your password needs to be at least 3 characters long');

  const { matchedCount } = await collection.updateOne(
    { pwr },
    {
      $set: {
        password: await hash(password),
        pwr: null
      }
    }
  );

  if (matchedCount) return;

  throw Error('Reset link is either invalid or expired');
};
