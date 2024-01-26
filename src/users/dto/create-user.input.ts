import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsStrongPassword } from 'class-validator';
import { UserRoles, UserStatuses } from 'src/common';

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @Field()
  @IsStrongPassword()
  password: string;

  @Field(() => UserRoles, { nullable: true })
  role?: UserRoles;

  @Field(() => UserStatuses, { nullable: true })
  status?: UserStatuses;
}
