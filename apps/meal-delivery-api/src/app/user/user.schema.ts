import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { Meal } from '../meal/meal.schema';
import { StudentHouse } from '../studentHouse/studentHouse.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ type: String, default: uuid, index: true }) id: string;
  @Prop({ type: String, required: true, unique: true }) username: string;
  @Prop({ type: String, required: true }) emailAddress: string;
  @Prop({ type: Boolean, required: true, default: false }) isGraduated: boolean;
  @Prop({ type: String, required: false }) phoneNumber: string;
  @Prop({ type: Array, required: true, default: [] }) roles: string[];

  @Prop({ type: StudentHouse, required: false })
  studentHouse: StudentHouse;

  @Prop({ type: [], default: [], unique: true })
  meals: Meal[];

  @Prop({ type: [], default: [], unique: true })
  friends: User[];
}

export const UserSchema = SchemaFactory.createForClass(User);
