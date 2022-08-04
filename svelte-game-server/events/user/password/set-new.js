import sha1 from 'sha1';
import dotenv from 'dotenv';
import hashids from 'hashids';

dotenv.config();
const { PASSWORD_RESET_HASH } = process.env;
const hash = new hashids(PASSWORD_RESET_HASH);

export default async ({ password, secret }, _io, _socket, { mongo }) => {
	return true;
	// const collection = mongo.db('world-seed').collection('users');

	// const [pwr] = hash.decode(secret);

	// if (password.length < 3) throw Error('Your password needs to be at least 3 characters long');

	// const update = await collection.updateOne(
	// 	{ pwr },
	// 	{ $set: { password: sha1(password), pwr: null } }
	// );

	// if (update.result.ok) return;

	// throw Error('Reset link is either invalid or expired');
};
