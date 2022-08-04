import loadLocalStorage from '$src/store/abs/loadLocalStorage';

export default {
	token: undefined,
	socket: undefined,
	notifications: new Set(),
	keys: [],
	keyLock: '',
	overlay: '',
	settings: loadLocalStorage({
		loginPageMode: 0
	})
};
