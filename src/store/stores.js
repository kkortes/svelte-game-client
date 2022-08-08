import loadLocalStorage from '$src/store/abs/loadLocalStorage';
import mediaQuery from '$src/store/abs/mediaQuery';

export default {
  token: undefined,
  socket: undefined,
  notifications: new Set(),
  tooltip: {
    tip: '',
    direction: 'up',
    props: {},
    visible: false
  },
  keys: [],
  keyLock: false,
  overlay: '',
  settings: loadLocalStorage({
    loginPageMode: 0
  }),
  mqs: mediaQuery({
    desktop: '(min-width: 1200px)',
    tablet: '(min-width: 768px) and (max-width: 1199px)',
    smartphone: '(max-width: 767px)',
    landscape: '(orientation: landscape)',
    portrait: '(orientation: portrait)',
    hoverable: '(hover: hover)'
  })
};
