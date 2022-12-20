import { UserIdentity } from '@md/data';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { Product } from '../product/product.schema';
import { User } from '../user/user.schema';

export type MealDocument = HydratedDocument<Meal>;

@Schema()
export class Meal {
  @Prop({ type: String, default: uuid, index: true }) id: string;
  @Prop({ type: String, required: true, unique: true }) name: string;
  @Prop({ type: Number, required: true, default: 0 }) price: number;
  @Prop({ type: Date, required: true, default: new Date() }) deliveryTime: Date;
  @Prop({ type: Date, required: true, default: new Date() }) deliveryDate: Date;

  @Prop({ required: true, type: { id: String, name: String } })
  restaurant: UserIdentity;
  // user: UserIdentity;

  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' }) deliverer: User;
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' }) user: User;

  @Prop({ type: [], default: [] }) products: Product[];

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User', unique: true }],
    default: [],
  })
  students: User[];
}

export const MealSchema = SchemaFactory.createForClass(Meal);
