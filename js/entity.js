import { deepMerge } from '/js/helpers.js';

export default (entities, id, uuid, fullBody = false, overrides = {}) => ({
  ...deepMerge(
    {
      uuid: uuid || crypto.randomUUID(),
      id,
      ...(fullBody ? structuredClone(entities[id]) : undefined),
    },
    fullBody ? overrides : {},
  ),
  ...(JSON.stringify(overrides) !== '{}' ? { overrides } : {}),
});
