import loadLocalStorage from '$src/store/loadLocalStorage';
import mediaQuery from '$src/store/mediaQuery';

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
