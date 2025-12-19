import entity from '@/ts/entity';
import type { DynamicObject } from '@/types/common';
import type { Card, CardRef } from '@/types/card';
import { deepMerge } from '@/helpers';

const DEFAULT_COST = 0;

export const ALL_CARDS = {
  sword: {
    name: 'Sword',
    cost: DEFAULT_COST
  }
};

const applyScaling = (card: Card) => {
  // Do stuff
  return card;
};

export default (id: string | CardRef, fullBody: boolean = false, meta?: DynamicObject) =>
  applyScaling(
    entity(
      ALL_CARDS,
      typeof id === 'string' ? id : id.id,
      typeof id === 'string' ? undefined : id.uuid,
      fullBody,
      typeof id === 'string'
        ? meta?.overrides
        : meta?.overrides
          ? deepMerge(id.overrides || {}, meta.overrides || {})
          : id.overrides
    ) as Card
  ) as Required<Card>;
