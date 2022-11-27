import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { v4 as uuid } from 'uuid';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ default: uuid, index: true })
  id: string;

  @Prop({
    required: true,
    unique: true,
  })
  name: string;

  @Prop({
    required: true,
    default: [],
  })
  roles: string[];

  @Prop({
    required: true,
    default: true,
  })
  isActive: boolean;

  @Prop({
    required: true,
  })
  emailAddress: string;

  // we don't use hooks to ensure the topics exist, as nestjs does not play nice
  // https://github.com/nestjs/mongoose/issues/7
  @Prop({ default: [] })
  meals: string[];

  @Prop({ default: [] })
  friends: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
