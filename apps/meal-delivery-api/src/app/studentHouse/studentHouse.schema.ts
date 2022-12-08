import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { User } from '../user/user.schema';

export type StudentHouseDocument = HydratedDocument<StudentHouse>;

@Schema()
export class StudentHouse {
  @Prop({ default: uuid, index: true })
  id: string;

  @Prop({ required: true, unique: true })
  streetAndNmr: string;

  @Prop({ required: false, default: [] })
  allergies: string[];

  @Prop({ required: false, default: false })
  containsAlcohol: boolean;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User', unique: true }],
    default: [],
  })
  students: User[];
}

export const StudentHouseSchema = SchemaFactory.createForClass(StudentHouse);
