import type { DynamicObject } from '@/types/common';

export type CardRef = {
  uuid?: string;
  id: string;
  overrides?: DynamicObject;
};

export type Card = CardRef & {
  name: string;
  cost: number;
  description: string;
};
