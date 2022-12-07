import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { v4 as uuid } from 'uuid';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ default: uuid, index: true })
  id: string;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: false, default: [] })
  allergies: string[];

  @Prop({ required: false, default: false })
  containsAlcohol: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
