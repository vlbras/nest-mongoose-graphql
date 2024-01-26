import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
@ObjectType({ isAbstract: true })
export abstract class AbstractDocument {
  @Field(() => ID)
  _id: Types.ObjectId;

  @Prop()
  @Field()
  createdAt?: Date;

  @Prop()
  @Field()
  updatedAt?: Date;
}
