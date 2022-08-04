import json from '../../package.json' assert { type: 'json' };
import lodashFp from 'lodash/fp.js';
import { filledSlot, isNewerVersion } from '../../helpers.js';
// import checkAppOwnership from '../iap/steam/checkAppOwnership.js';
const { version: serverVersion } = json;
const { mergeWith } = lodashFp;

export default async (
	{ token, clientVersion, isDev }, // , platform: { steamid }
	_io,
	socket,
	{ mongo }
) => {
	return token;
	// if (isNewerVersion(clientVersion, serverVersion) && !isDev)
	//   throw Error(
	//     `Your client is outdated, please try again soon (${clientVersion} < ${serverVersion})`,
	//   );

	// const users = mongo.db('world-seed').collection('users');
	// const gameStates = mongo.db('world-seed').collection('gameStates');

	// const gameState = await gameStates.findOne({ token });

	// if (!gameState)
	//   throw Error(
	//     "Couldn't fetch gameState, if the problem persists please contact admin on discord",
	//   );

	// const setObj = { $set: { token, ...(steamid && { 'meta.steamid': steamid }) } };

	// if (steamid) {
	//   const timestamp = await checkAppOwnership(steamid);
	//   const releaseDate = new Date('2022-05-17T00:00:00Z').valueOf(); // old 2022-05-17T14:30:00Z

	//   setObj['$addToSet'] = { 'meta.icons': { $each: [{ icon: 'steam' }] } };

	//   if (timestamp < releaseDate) {
	//     setObj['$addToSet']['meta.icons']['$each'][1] = { icon: 'plant' };
	//     setObj['$addToSet']['iap.unlockedStoreItems'] = {
	//       id: 'game_license',
	//       paid: 0,
	//       repurchasable: false,
	//       timestamp: releaseDate,
	//     };
	//   }
	// }

	// const { value: user } = await users.findOneAndUpdate({ token }, setObj, {
	//   returnOriginal: false,
	// });

	// if (!user)
	//   throw Error("Couldn't fetch user, if the problem persists please contact admin on discord");

	// await gameStates.updateOne(
	//   { _id: `${user._id}` },
	//   { $set: { socketID: socket.id } },
	//   { upsert: true },
	// );

	// const { _id, ...GS } = gameState;
	// const { meta, iap } = user;
	// const { sap = 0, unlockedStoreItems = [] } = iap || {};

	// return {
	//   ...GS,
	//   iap: {
	//     sap,
	//     unlockedStoreItems,
	//   },
	//   // This merges any array nodes missing from user.meta.ARRAY_X onto gameState.meta.ARRAY_X
	//   meta: mergeWith(
	//     (a, b) => {
	//       if (Array.isArray(a)) {
	//         b.forEach((v) => {
	//           if (a.find(filledSlot)) {
	//             if (!a.map(({ name }) => name).includes(v.name)) {
	//               a = [...a, v];
	//             }
	//           } else if (!a.includes(v)) {
	//             a = [...a, v];
	//           }
	//         });
	//         return a;
	//       }
	//     },
	//     meta,
	//     GS.meta,
	//   ),
	// };
};
