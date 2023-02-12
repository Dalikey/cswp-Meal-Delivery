import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { Product } from '../product/product.schema';
import {
  StudentHouse,
  StudentHouseSchema,
} from '../studentHouse/studentHouse.schema';
import { User, UserSchema } from '../user/user.schema';

export type MealDocument = HydratedDocument<Meal>;

@Schema()
export class Meal {
  @Prop({ type: String, default: uuid, index: true }) id: string;
  @Prop({ type: String, required: true }) name: string;
  @Prop({ type: Number, required: true, default: 0.01 }) price: number;
  @Prop({ type: Date, default: new Date() }) deliveryTime: Date;
  @Prop({ type: Date, default: new Date() }) deliveryDate: Date;

  @Prop({ type: UserSchema, required: true })
  owner: User;

  @Prop({ type: StudentHouseSchema })
  studentHouse: StudentHouse;

  @Prop({ type: [], default: [] })
  products: Product[];

  @Prop({ type: [], default: [] })
  students: User[];
}

export const MealSchema = SchemaFactory.createForClass(Meal);
