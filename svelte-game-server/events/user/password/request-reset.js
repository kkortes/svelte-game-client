import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import hashids from 'hashids';
import { validateEmail } from '../../../helpers.js';
dotenv.config();
const { SUPPORT_EMAIL_PASSWORD, PASSWORD_RESET_HASH } = process.env;

const hash = new hashids(PASSWORD_RESET_HASH);

export default async ({ email, url }, _io, _socket, { mongo }) => {
	return true;
	// const collection = mongo.db('world-seed').collection('users');

	// const LCemail = email.toLowerCase().trim();

	// if (!validateEmail(LCemail)) throw Error('Invalid email address format, please try again');

	// const user = await collection.findOne({
	// 	email: LCemail
	// });

	// // Check user exists
	// // Return is equal to a success, so that the user can't fish for valid emails
	// if (!user) return;

	// // Check if it's been more than 1 minute since last attempt
	// // Return is equal to a success, so that the user can't fish for valid emails
	// if (user.pwr > new Date().getTime()) return;

	// const pwr = new Date().getTime() + 60000;
	// // Set "password reset timestamp" to one minute into the future in a non-blocking way
	// collection.updateOne(
	// 	{ email: LCemail },
	// 	{
	// 		$set: {
	// 			pwr
	// 		}
	// 	}
	// );

	// const transporter = nodemailer.createTransport({
	// 	host: 'mailcluster.loopia.se',
	// 	port: 587,
	// 	auth: {
	// 		user: 'noreply@worldseed.eu',
	// 		pass: SUPPORT_EMAIL_PASSWORD
	// 	}
	// });

	// try {
	// 	const token = hash.encode(pwr);
	// 	await transporter.sendMail({
	// 		from: '"World Seed" <noreply@worldseed.eu>',
	// 		to: email,
	// 		subject: 'World Seed password reset request',
	// 		text: `Hello ${user.email}!\n\nHere is your link to reset your password:\n${url}/reset-password/${token}\nThe link expires in 10 minutes.\n\nYou can't reply to this email.`
	// 	});
	// } catch {
	// 	throw Error('Failed to send mail');
	// }
};