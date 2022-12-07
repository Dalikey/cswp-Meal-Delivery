import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { Meal } from '../meal/meal.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ default: uuid, index: true })
  id: string;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, default: [] })
  roles: string[];

  @Prop({ required: true, default: true })
  isActive: boolean;

  @Prop({ required: true })
  emailAddress: string;

  @Prop({
    default: [],
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Meal',
  })
  meals: Meal[];

  @Prop({ default: [] })
  friends: User[];
}

export const UserSchema = SchemaFactory.createForClass(User);
