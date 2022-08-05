import lodash from 'lodash';
import ENV from '$src/constants/ENV_VARS';

const { isEqual, merge } = lodash;
const { isDev } = ENV;

const wrapBasedOnType = (value) => (typeof value !== 'string' ? `{${value}}` : `"${value}"`);

const generateStyles = (styles) =>
  Object.entries(styles)
    .reduce((a, [property, value]) => [...a, `${property}: ${value};`], [])
    .join(' ');

const formatProps = (props) =>
  props.reduce(
    (a, { name, defaultValue }) => `${a} ${name}=${wrapBasedOnType(defaultValue)}\n`,
    ''
  );

const range = (end = 0, start = 0) =>
  Array(Math.abs(end - start))
    .fill(0)
    .map((_, i) => start + i * (end > 0 ? 1 : -1));

const emptySlot = (obj) => typeof obj !== 'object' || !Object.keys(obj).length;

const filledSlot = (obj) => !emptySlot(obj);

const compare = (a, b) => {
  if (a > b) return +1;
  if (a < b) return -1;
  return 0;
};

const generateID = () =>
  `_${
    Number(String(Math.random()).slice(2)) + Date.now() + Math.round(performance.now()).toString(36)
  }`;

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const getCookie = () =>
  document.cookie
    .replaceAll(' ', '')
    .split(';')
    .reduce((a, b) => ({ ...a, [b.split('=')[0]]: b.split('=')[1] }), {});

const recursiveLookup = (target, searches = []) => {
  if (!target) return false;

  if (searches.find((search) => target.classList.contains(search))) {
    return true;
  }
  if (target.parentElement) {
    return recursiveLookup(target.parentElement, searches);
  }
  return false;
};

const capitalizeFirstLetter = (string) => `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

const colorStrength = (col, amt) => {
  let usePound = false;

  if (col[0] === '#') {
    col = col.slice(1);
    usePound = true;
  }

  const num = parseInt(col, 16);

  let r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  let b = ((num >> 8) & 0x00ff) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  let g = (num & 0x0000ff) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
};

const debounce = (fn, wait, maxWait) => {
  let timer, maxTimer;

  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      clearTimeout(maxTimer);
      maxTimer = null;
      fn(...args);
    }, wait);
    if (maxWait && !maxTimer) {
      maxTimer = setTimeout(() => {
        clearTimeout(timer);
        maxTimer = null;
        fn(...args);
      }, maxWait);
    }
  };
};

const lerp = (min, max, value) => {
  var x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
};

const smoothLerp = (animStart, animEnd, animCurrent, reverse) => {
  const lerped = lerp(animStart, animEnd, animCurrent);
  return reverse ? 1 - lerped : lerped;
};

const randomNumber = (min, max, factor = Math.random()) =>
  Math.floor(factor * (max - min + 1) + min);

const stringListToArray = (string) =>
  string
    .split(',')
    .map((segment) => segment.trim())
    .filter((segment) => segment);

const pad = (v) => (v < 10 ? `0${v}` : v);

const intToArray = (int, fill = undefined) =>
  Array(int)
    .fill(0)
    .map((_, i) => (fill !== undefined ? fill : i));

const filterSplit = (array, condition) =>
  array.reduce(
    ([hits, misses], item) =>
      condition(item) ? [[...hits, item], misses] : [hits, [...misses, item]],
    [[], []]
  );

const findNIndex = (array, condition, n = 1, searched = []) => {
  const index = array.findIndex(condition);

  if (index === -1) {
    return index;
  } else if (n - 1 > 0) {
    return findNIndex(
      array.slice(index + 1, array.length),
      condition,
      n - 1,
      array.slice(0, index + 1)
    );
  }

  return searched.length + index;
};

const readableTimestamp = (timestamp) => new Date(timestamp).toLocaleString();

const msToTime = (ms) => ({
  milliseconds: parseInt(ms % 1000, 10),
  seconds: Math.floor((ms / 1000) % 60),
  minutes: Math.floor((ms / (1000 * 60)) % 60),
  hours: Math.floor((ms / (1000 * 60 * 60)) % 24),
  days: Math.floor((ms / (1000 * 60 * 60 * 24)) % 365)
});

const upsertArray = (players, nearby) =>
  nearby.reduce((a, player) => {
    const index = a.findIndex(({ _id }) => _id === player._id);
    if (index === -1) {
      return [...a, player];
    } else {
      return [...a.slice(0, index), player, ...a.slice(index + 1)];
    }
  }, players);

const fillOut = (array, amount, fillWith = false, repeat = false) =>
  amount > array.length || repeat
    ? [...array, ...intToArray(amount - (repeat ? array.length % amount : array.length), fillWith)]
    : array;

const prettyNumber = (value) => value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');

const parseVersion = (versionString) => {
  const [major, minor, patch] = versionString.split('.').map(Number);

  return {
    major,
    minor,
    patch
  };
};

const dayAfter = (time) => {
  const tomorrow = new Date(time || null);

  tomorrow.setHours(isDev ? tomorrow.getHours() : 0);
  // tomorrow.setMinutes(tomorrow.getMinutes() + +isDev);
  tomorrow.setMinutes(isDev ? tomorrow.getMinutes() : 0);
  tomorrow.setSeconds(isDev ? tomorrow.getSeconds() + 10 : 0);
  tomorrow.setDate(tomorrow.getDate() + +!isDev);

  return tomorrow;
};

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

const isNewerVersion = (oldVer = '0.0.0', newVer) => {
  const oldParts = oldVer.split('.');
  const newParts = newVer.split('.');
  for (var i = 0; i < newParts.length; i++) {
    const a = ~~newParts[i]; // parse int
    const b = ~~oldParts[i]; // parse int
    if (a > b) return true;
    if (a < b) return false;
  }
  return false;
};

const traverse = ([step, ...steps], tree, pointer = undefined) => {
  if (!pointer) pointer = tree;
  if (steps.length - 1) {
    if (!pointer[step]) pointer[step] = {};
    return traverse(steps, tree, pointer[step]);
  }

  pointer[step] = steps[0] === undefined ? '$unset' : steps[0];

  return tree;
};

const dirty = (oldData = {}, newData, chain = '') =>
  Object.entries(newData).reduce((a, [key, value]) => {
    const keyChain = [...(chain ? [chain] : []), key].join('.');

    if (typeof value === 'object' && Object.keys(value)?.length && value?.length === undefined) {
      return merge(a, dirty(oldData[key], value, keyChain));
    }

    if (!isEqual(oldData[key], value)) {
      return traverse([...keyChain.split('.'), value], a);
    }

    return a;
  }, {});

const byKeys = (keys) => (checkAgainst) =>
  Object.entries(keys).every(([key, value]) => checkAgainst?.[key] === value);

const notByKeys = (keys) => (checkAgainst) => !byKeys(keys)(checkAgainst);

const reorder = (array, index) => array.slice(index).concat(array.slice(0, index));

const onlyUnique = (value, index, self) => self.indexOf(value) === index;

const camelCaseToDashed = (string) =>
  string
    .split(/\.?(?=[A-Z])/)
    .join('-')
    .toLowerCase();

export {
  generateStyles,
  formatProps,
  range,
  emptySlot,
  filledSlot,
  compare,
  generateID,
  sleep,
  getCookie,
  recursiveLookup,
  capitalizeFirstLetter,
  colorStrength,
  debounce,
  smoothLerp,
  randomNumber,
  stringListToArray,
  pad,
  intToArray,
  filterSplit,
  findNIndex,
  readableTimestamp,
  msToTime,
  upsertArray,
  fillOut,
  prettyNumber,
  parseVersion,
  dayAfter,
  clamp,
  isNewerVersion,
  dirty,
  byKeys,
  notByKeys,
  reorder,
  onlyUnique,
  camelCaseToDashed
};
