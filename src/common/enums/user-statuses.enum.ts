import { registerEnumType } from '@nestjs/graphql';

export enum UserStatuses {
  ACTIVE = 'active',
  PENDING = 'pending',
  BLOCKED = 'blocked',
}

registerEnumType(UserStatuses, {
  name: 'UserStatuses',
});
