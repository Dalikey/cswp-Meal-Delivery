import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { User } from '../user/user.schema';

export type StudentHouseDocument = HydratedDocument<StudentHouse>;

@Schema()
export class StudentHouse {
  @Prop({ default: uuid, index: true }) id: string;
  @Prop({ required: true, unique: true }) streetAndNmr: string;
  @Prop({ required: false }) city: string;
  @Prop({ required: false }) postcode: string;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }],
    default: [],
  })
  students: User[];
}

export const StudentHouseSchema = SchemaFactory.createForClass(StudentHouse);
