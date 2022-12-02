import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { v4 as uuid } from 'uuid';

export type MealDocument = Meal & Document;

@Schema()
export class Meal {
  @Prop({ default: uuid, index: true })
  id: string;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, default: 0 })
  price: number;

  @Prop({ required: true, default: new Date() }) deliveryTime: Date;

  @Prop({ required: true, default: new Date() })
  deliveryDate: Date;

  @Prop({ required: true })
  restaurant: string;

  @Prop({ default: [] })
  users: string[];
}

export const MealSchema = SchemaFactory.createForClass(Meal);
