import sha1 from 'sha1';
import { validateEmail } from '../../helpers.js';

export default async ({ email, password }, io, _socket, { mongo }) => {
	return true;
	// const collection = mongo.db('world-seed').collection('users');
	// const correctEmailFormat = email.toLowerCase().trim();

	// if (!password) throw Error('You need to provide a password');
	// if (password.length < 3) throw Error('Your password needs to be at least 3 characters long');
	// if (!validateEmail(correctEmailFormat))
	// 	throw Error('Invalid email address format, please try again');

	// const exists = await collection.findOne({
	// 	email: correctEmailFormat
	// });

	// if (exists) throw Error('A user with that email address already exists');

	// await collection.insertOne({
	// 	email: correctEmailFormat,
	// 	password: sha1(password),
	// 	token: null,
	// 	pwr: null,
	// 	created: new Date(),
	// 	meta: {
	// 		icons: [
	// 			{
	// 				name: 'none',
	// 				icon: 'cross'
	// 			}
	// 		],
	// 		iconColors: [
	// 			{
	// 				name: 'white',
	// 				color: '#ffffff'
	// 			}
	// 		]
	// 	}
	// });
};
