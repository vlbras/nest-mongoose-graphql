import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsUUID } from 'class-validator';
import { UserStatuses } from 'src/common';

@InputType()
export class GetUserInput {
  @Field(() => String, { nullable: true })
  _id?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field(() => UserStatuses, { nullable: true })
  status?: UserStatuses;
}
