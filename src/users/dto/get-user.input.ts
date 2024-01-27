import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsUUID } from 'class-validator';
import { IsObjectId } from 'nestjs-object-id';
import { UserStatuses } from 'src/common';

@InputType()
export class GetUserInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsObjectId()
  _id?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field(() => UserStatuses, { nullable: true })
  status?: UserStatuses;
}
