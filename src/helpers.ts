import { IS_DEV } from '@/constants/ENV_VARS';
import type { DynamicObject } from '@/types/common';

const wrapBasedOnType = (value: any) => (typeof value !== 'string' ? `{${value}}` : `"${value}"`);

const generateStyles = (styles: any) =>
  Object.entries(styles)
    .reduce((a: any, [property, value]) => [...a, `${property}: ${value};`], [])
    .join(' ');

const formatProps = (props: any) =>
  props.reduce(
    (a: string, { name, defaultValue }: any) => `${a} ${name}=${wrapBasedOnType(defaultValue)}\n`,
    ''
  );

const deepMerge = (target: DynamicObject, source: DynamicObject) => {
  for (const key in source) {
    if (target[key] === null) {
      continue;
    }

    if (
      Array.isArray(source[key]) // check if it's an array
    ) {
      target[key] = [...source[key]]; // replace entirely with a shallow copy
    } else if (source[key] instanceof Object && key in target && target[key] instanceof Object) {
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
};

const deepSubtract = (target: any, source: any): any => {
  for (const key in source) {
    if (
      source[key] instanceof Object &&
      key in target &&
      target[key] instanceof Object &&
      !Array.isArray(source[key]) &&
      !Array.isArray(target[key])
    ) {
      // If both are objects, recurse
      deepSubtract(target[key], source[key]);
    } else if (typeof source[key] === 'number' && typeof target[key] === 'number') {
      // If both are numbers, subtract
      target[key] -= source[key];
    } else {
      // Otherwise, just set/overwrite
      target[key] = source[key];
    }
  }
  return target;
};

const deepAdd = (target: any, source: any): any => {
  for (const key in source) {
    if (
      source[key] instanceof Object &&
      key in target &&
      target[key] instanceof Object &&
      !Array.isArray(source[key]) &&
      !Array.isArray(target[key])
    ) {
      // If both are objects, recurse
      deepAdd(target[key], source[key]);
    } else if (typeof source[key] === 'number' && typeof target[key] === 'number') {
      // If both are numbers, add
      target[key] += source[key];
    } else {
      // Otherwise, just set/overwrite
      target[key] = source[key];
    }
  }
  return target;
};

const range = (end = 0, start = 0) =>
  Array(Math.abs(end - start))
    .fill(0)
    .map((_, i) => start + i * (end > 0 ? 1 : -1));

const emptySlot = (obj: any) => typeof obj !== 'object' || !Object.keys(obj).length;

const filledSlot = (obj: DynamicObject) => !emptySlot(obj);

const compare = (a: any, b: any) => {
  if (a > b) return +1;
  if (a < b) return -1;
  return 0;
};

// const generateID = () =>
//   `_${
//     Number(String(Math.random()).slice(2)) + Date.now() + Math.round(performance.now()).toString(36)
//   }`;

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

const getCookie = (): DynamicObject =>
  document.cookie
    .replaceAll(' ', '')
    .split(';')
    .reduce((a, b) => ({ ...a, [b.split('=')[0]]: b.split('=')[1] }), {});

const recursiveLookup = (target: HTMLElement, searches: string[] = []) => {
  if (!target) return false;

  if (searches.find((search) => target.classList.contains(search))) {
    return true;
  }
  if (target.parentElement) {
    return recursiveLookup(target.parentElement, searches);
  }
  return false;
};

const capitalizeFirstLetter = (string: string) =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

const colorStrength = (col: any, amt: any) => {
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

const debounce = (fn: any, wait: any, maxWait: any) => {
  let timer: any, maxTimer: any;

  return function (...args: any) {
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

const lerp = (min: number, max: number, value: number) => {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
};

const smoothLerp = (animStart: number, animEnd: number, animCurrent: number, reverse: boolean) => {
  const lerped = lerp(animStart, animEnd, animCurrent);
  return reverse ? 1 - lerped : lerped;
};

const randomNumber = (min: number, max: number, factor = Math.random()) =>
  Math.floor(factor * (max - min + 1) + min);

const stringListToArray = (string: string) =>
  string
    .split(',')
    .map((segment) => segment.trim())
    .filter((segment) => segment);

const pad = (v: number) => (v < 10 ? `0${v}` : v);

const intToArray = (int: number, fill: any = undefined) =>
  Array(int)
    .fill(0)
    .map((_, i) => (fill !== undefined ? fill : i));

const filterSplit = (array: any[], condition: any) =>
  array.reduce(
    ([hits, misses], item) =>
      condition(item) ? [[...hits, item], misses] : [hits, [...misses, item]],
    [[], []]
  );

const findNIndex = (array: any, condition: any, n = 1, searched = []) => {
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

const readableTimestamp = (timestamp: any) => new Date(timestamp).toLocaleString();

const msToTime = (ms: number) => ({
  milliseconds: ms % 1000,
  seconds: Math.floor((ms / 1000) % 60),
  minutes: Math.floor((ms / (1000 * 60)) % 60),
  hours: Math.floor((ms / (1000 * 60 * 60)) % 24),
  days: Math.floor((ms / (1000 * 60 * 60 * 24)) % 365)
});

const upsertArray = (players: any[], nearby: any[]) =>
  nearby.reduce((a: any[], player: any) => {
    const index = a.findIndex(({ _id }) => _id === player._id);
    if (index === -1) {
      return [...a, player];
    } else {
      return [...a.slice(0, index), player, ...a.slice(index + 1)];
    }
  }, players);

const fillOut = (array: any[], amount: number, fillWith = false, repeat = false) =>
  amount > array.length || repeat
    ? [...array, ...intToArray(amount - (repeat ? array.length % amount : array.length), fillWith)]
    : array;

const prettyNumber = (value: number) => value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');

const parseVersion = (versionString: string) => {
  const [major, minor, patch] = versionString.split('.').map(Number);

  return {
    major,
    minor,
    patch
  };
};

const dayAfter = (time: any) => {
  const tomorrow = new Date(time || null);

  tomorrow.setHours(IS_DEV ? tomorrow.getHours() : 0);
  // tomorrow.setMinutes(tomorrow.getMinutes() + +IS_DEV);
  tomorrow.setMinutes(IS_DEV ? tomorrow.getMinutes() : 0);
  tomorrow.setSeconds(IS_DEV ? tomorrow.getSeconds() + 10 : 0);
  tomorrow.setDate(tomorrow.getDate() + +!IS_DEV);

  return tomorrow;
};

const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

const isNewerVersion = (oldVer = '0.0.0', newVer: any) => {
  const oldParts = oldVer.split('.');
  const newParts = newVer.split('.');
  for (let i = 0; i < newParts.length; i++) {
    const a = ~~newParts[i]; // parse int
    const b = ~~oldParts[i]; // parse int
    if (a > b) return true;
    if (a < b) return false;
  }
  return false;
};

const traverse = ([step, ...steps]: any, tree: any, pointer: any = undefined) => {
  if (!pointer) pointer = tree;
  if (steps.length - 1) {
    if (!pointer[step]) pointer[step] = {};
    return traverse(steps, tree, pointer[step]);
  }

  pointer[step] = steps[0] === undefined ? '$unset' : steps[0];

  return tree;
};

const byKeys = (keys: any[]) => (checkAgainst: any[]) =>
  Object.entries(keys).every(([key, value]: any) => checkAgainst?.[key] === value);

const notByKeys = (keys: any[]) => (checkAgainst: any[]) => !byKeys(keys)(checkAgainst);

const reorder = (array: any[], index: number) => array.slice(index).concat(array.slice(0, index));

const onlyUnique = (value: number, index: number, self: any) => self.indexOf(value) === index;

function once(fn: any) {
  return function (this: any, event: any) {
    if (fn) fn.call(this, event);
    fn = null;
  };
}

function preventDefault(fn: any) {
  return function (this: any, event: any) {
    event.preventDefault();
    fn.call(this, event);
  };
}

export {
  generateStyles,
  formatProps,
  range,
  emptySlot,
  filledSlot,
  compare,
  // generateID,
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
  byKeys,
  notByKeys,
  reorder,
  onlyUnique,
  once,
  preventDefault,
  deepMerge,
  deepAdd,
  deepSubtract
};
