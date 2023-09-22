const {
  password: { hash, verify }
} = Bun;

export default async ({ email, password }, { ws, mongo }) => {
  if (!email || !password) throw Error('Invalid login credentials');

  const token = ws.sid;
  const users = mongo.collection('users');
  const updated = new Date();

  email = email.toLowerCase().trim();

  const user = await users.findOne({
    email
  });

  if (!user) throw Error('Invalid login credentials');

  const correctPassword = await verify(password, user.password);

  if (!correctPassword) throw Error('Invalid login credentials');

  await users.updateOne(
    {
      email
    },
    { $set: { token, updated } }
  );

  return token;
};
