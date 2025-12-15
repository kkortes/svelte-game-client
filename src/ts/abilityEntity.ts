import ABILITIES from '@/constants/ABILITIES';

const GET = (entities: any, id: string, uuid?: string, fullBody: boolean = false) => ({
  uuid: uuid || crypto.randomUUID(),
  id,
  ...(fullBody ? entities[id] : fullBody)
});

export default {
  ability: (id: string | any, fullBody: boolean = false) =>
    GET(
      ABILITIES,
      typeof id === 'string' ? id : id.id,
      typeof id === 'string' ? undefined : id.uuid,
      fullBody
    )
};
