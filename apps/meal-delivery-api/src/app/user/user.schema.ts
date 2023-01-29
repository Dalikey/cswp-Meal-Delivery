import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
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
  @Prop({ type: String, required: true }) role: string;

  // To prevent studentHouse.streetAndNmr: null for the thousands of times. I tried everything but nothing works.
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'StudentHouse' })
  studentHouse: StudentHouse;

  @Prop({ type: [], default: [], unique: true })
  meals: Meal[];

  @Prop({ type: [], default: [], unique: true })
  friends: User[];
}

export const UserSchema = SchemaFactory.createForClass(User);
