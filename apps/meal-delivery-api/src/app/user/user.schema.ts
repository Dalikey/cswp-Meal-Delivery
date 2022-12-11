import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { Meal } from '../meal/meal.schema';
import { StudentHouse } from '../studentHouse/studentHouse.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ default: uuid, index: true }) id: string;
  @Prop({ required: true, unique: true }) username: string;
  @Prop({ required: true }) emailAddress: string;
  @Prop({ required: true }) phoneNumber: string;
  @Prop({ required: true, default: false }) isGraduated: boolean;
  @Prop({ required: true, default: [] }) roles: string[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'StudentHouse' })
  studentHouse: StudentHouse;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Meal', unique: true }],
    default: [],
  })
  meals: Meal[];

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User', unique: true }],
    default: [],
  })
  friends: User[];
}

export const UserSchema = SchemaFactory.createForClass(User);
