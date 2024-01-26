import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument, UserRoles, UserStatuses } from 'src/common';

@Schema({ timestamps: true })
@ObjectType()
export class User extends AbstractDocument {
  @Prop({ required: true, unique: true })
  @Field()
  email: string;

  @Prop({ required: true })
  @HideField()
  password: string;

  @Prop({ required: true, enum: UserRoles })
  @Field(() => UserRoles)
  role: UserRoles;

  @Prop({ required: true, enum: UserStatuses })
  @Field(() => UserStatuses)
  status: UserStatuses;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ _id: 1, status: 1 });
