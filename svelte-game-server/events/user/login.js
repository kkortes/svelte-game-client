import sha1 from 'sha1';
import shortUuid from 'short-uuid';

export default async ({ email, password }, _io, _socket, {}) => {
	const token = shortUuid.generate();

	if (!email || !password) throw Error('Invalid login credentials');

	return token;
	// const users = mongo.db('world-seed').collection('users');
	// const gameStates = mongo.db('world-seed').collection('gameStates');
	// const correctEmailFormat = email.toLowerCase().trim();

	// const date = new Date();

	// const { value } = await users.findOneAndUpdate(
	// 	{
	// 		email: correctEmailFormat,
	// 		password: sha1(password)
	// 	},
	// 	{ $set: { token, updated: date } }
	// );

	// const { _id, frozen, created } = value || {};

	// if (!created) throw Error('Invalid login credentials');

	// if (frozen)
	// 	throw Error(
	// 		'Your account is frozen. If you are unsure why, please contact an admin on discord'
	// 	);

	// await gameStates.updateOne(
	// 	{ _id: `${_id}` },
	// 	{ $set: { token, updated: date } },
	// 	{ upsert: true }
	// );

	// return token;
};
