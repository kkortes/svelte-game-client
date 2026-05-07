import { Resend } from 'resend';
import hashids from 'hashids';
import { validateEmail } from '../../../helpers';

const { RESEND_API_KEY, PASSWORD_RESET_HASH } = process.env;

const Hashids = new hashids(PASSWORD_RESET_HASH);

export default async ({ email, url }, { mongo }) => {
  const collection = mongo.collection('users');

  const LCemail = email.toLowerCase().trim();

  if (!validateEmail(LCemail)) throw Error('Invalid email address format, please try again');

  const user = await collection.findOne({
    email: LCemail,
  });

  if (!user) return;

  if (user.pwr > new Date().getTime()) return;

  const pwr = new Date().getTime() + 60000;
  collection.updateOne(
    { email: LCemail },
    {
      $set: {
        pwr,
      },
    },
  );

  try {
    const token = Hashids.encode(pwr);
    await new Resend(RESEND_API_KEY).emails.send({
      from: '"Battle Brawlers" <noreply@worldseed.eu>',
      to: email,
      subject: 'Battle-brawlers password reset request',
      html: `<p>Hello ${user.email}!</p><p>Here is your link to reset your password:<br><a href="${url}/reset-password/${token}">${url}/reset-password/${token}</a><br>The link expires in 10 minutes.</p><p>You can't reply to this email.</p>`,
    });
  } catch (e) {
    console.error(e);
    throw Error('Failed to send mail');
  }
};
