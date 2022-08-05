import sha1 from 'sha1';
import { validateEmail } from '../../helpers.js';

export default async ({ email, password }, _io, _socket, { mongo }) => {
	const collection = mongo.collection('users');
	const correctEmailFormat = email.toLowerCase().trim();

	if (!password) throw Error('You need to provide a password');
	if (password.length < 3) throw Error('Your password needs to be at least 3 characters long');
	if (!validateEmail(correctEmailFormat))
		throw Error('Invalid email address format, please try again');

	const exists = await collection.findOne({
		email: correctEmailFormat
	});

	if (exists) throw Error('A user with that email address already exists');

	const date = new Date();

	await collection.insertOne({
		email: correctEmailFormat,
		password: sha1(password),
		token: null,
		pwr: null,
		created: date,
		updated: date
	});
};
