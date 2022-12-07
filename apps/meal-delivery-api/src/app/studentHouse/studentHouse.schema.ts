import { UserIdentity } from '@md/data';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { User } from '../user/user.schema';

export type StudentHouseDocument = StudentHouse & Document;

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
}

export const StudentHouseSchema = SchemaFactory.createForClass(StudentHouse);
