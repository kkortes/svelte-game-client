import { browser } from '$app/environment';

export default (props) =>
  Object.entries(props).reduce(
    (a, [key, value]) => ({
      ...a,
      [key]:
        browser && window.localStorage.getItem(key)
          ? JSON.parse(window.localStorage.getItem(key))
          : value
    }),
    {}
  );
