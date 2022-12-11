import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { Meal } from '../meal/meal.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({ type: String, default: uuid, index: true }) id: string;
  @Prop({ type: String, required: true, unique: true }) name: string;
  @Prop({ type: Array, required: false, default: [] }) allergies: string[];
  @Prop({ type: Boolean, required: false, default: false })
  containsAlcohol: boolean;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Meal' }] })
  meals: Meal[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
