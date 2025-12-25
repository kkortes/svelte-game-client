import { browser } from '$app/environment';
import type { DynamicObject } from '@/types/common';

export default (props: DynamicObject) =>
  Object.entries(props).reduce(
    (a, [key, value]) => ({
      ...a,
      [key]:
        browser && window.localStorage.getItem(key)
          ? JSON.parse(window.localStorage.getItem(key) as string)
          : value
    }),
    {}
  );
