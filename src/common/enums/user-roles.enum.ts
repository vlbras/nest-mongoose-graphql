import { registerEnumType } from '@nestjs/graphql';

export enum UserRoles {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

registerEnumType(UserRoles, {
  name: 'UserRoles',
});
