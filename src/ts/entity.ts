import { deepMerge } from '@/helpers';
import type { DynamicObject } from '@/types/common';

export default (
  entities: any,
  id: string,
  uuid?: string,
  fullBody: boolean = false,
  overrides: DynamicObject = {}
) => {
  return {
    ...deepMerge(
      {
        uuid: uuid || crypto.randomUUID(),
        id,
        ...(fullBody ? structuredClone(entities[id]) : undefined)
      },
      fullBody ? overrides : {}
    ),
    ...(JSON.stringify(overrides) !== '{}' ? { overrides } : {})
  };
};
