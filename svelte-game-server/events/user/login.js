import sha1 from 'sha1';
import shortUuid from 'short-uuid';

export default async ({ email, password }, _io, _socket, { mongo }) => {
  if (!email || !password) throw Error('Invalid login credentials');

  const token = shortUuid.generate();
  const users = mongo.collection('users');
  const correctEmailFormat = email.toLowerCase().trim();

  const date = new Date();

  const { value: user } = await users.findOneAndUpdate(
    {
      email: correctEmailFormat,
      password: sha1(password)
    },
    { $set: { token, updated: date } }
  );

  if (!user) throw Error('Invalid login credentials');

  return token;
};
