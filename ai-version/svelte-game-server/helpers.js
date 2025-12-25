var validateEmail = (email) =>
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    String(email)
  );

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const filterSplit = (array, condition) =>
  array.reduce(
    ([hits, misses], item) =>
      condition(item) ? [[...hits, item], misses] : [hits, [...misses, item]],
    [[], []]
  );

const emptySlot = (obj) => typeof obj !== 'object' || !Object.keys(obj).length;

const filledSlot = (obj) => !emptySlot(obj);

const intToArray = (int, fill = undefined) =>
  Array(int)
    .fill(0)
    .map((_, i) => (fill !== undefined ? fill : i));

const parseVersion = (versionString) => {
  const [major, minor, patch] = versionString.split('.').map(Number);

  return {
    major,
    minor,
    patch
  };
};

const isNewerVersion = (oldVer, newVer) => {
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

const capitalizeFirstLetter = (string) => `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

const transform = (data) =>
  Object.entries(data).reduce(
    (a, [key, value]) =>
      typeof value === 'object' && value?.length === undefined && Object.keys(value).length
        ? {
            ...a,
            ...Object.entries(transform(value)).reduce(
              (ac, [k, v]) => ({
                ...ac,
                [`${key}.${k}`]: v
              }),
              {}
            )
          }
        : {
            ...a,
            [key]: value
          },
    {}
  );

const mongoReady = (data) =>
  Object.entries(transform(data)).reduce((a, [key, value]) => {
    const unset = value === '$unset' && value;
    const mainKey = (unset || '$set').replace('$', '');
    return {
      ...a,
      [mainKey]: {
        ...a[mainKey],
        [key]: !!unset || value
      }
    };
  }, {});

const typeSizes = {
  undefined: () => 0,
  boolean: () => 4,
  number: () => 8,
  string: (item) => 2 * item.length,
  object: (item) =>
    !item ? 0 : Object.keys(item).reduce((total, key) => sizeOf(key) + sizeOf(item[key]) + total, 0)
};

const sizeOf = (value) => typeSizes[typeof value](value);

const readableTimestamp = (timestamp) => new Date(timestamp).toLocaleString();

const onlyUnique = (value, index, self) => self.indexOf(value) === index;

export {
  validateEmail,
  sleep,
  filterSplit,
  emptySlot,
  filledSlot,
  intToArray,
  parseVersion,
  isNewerVersion,
  capitalizeFirstLetter,
  mongoReady,
  sizeOf,
  readableTimestamp,
  onlyUnique
};
