import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserRole } from './roles.enum';
import * as mongoosePaginate from 'mongoose-paginate-v2';
export type UserDocument = User & Document;
//@Schema({})
export class User extends Document {
  @Prop({
    default: null,
    MaxLength: 20,
  })
  firstName: string;

  @Prop({
    default: null,
    maxLength: 100,
  })
  lastName: string;

  @Prop()
  fullName: string;

  @Prop()
  email: string;

  @Prop({
    unique: true,
    length: 10,
  })
  nationalId: string;

  @Prop({
    unique: true,
    required: true,
  })
  phone: string;

  @Prop({
    type: String,
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Prop({ type: Types.ObjectId, ref: 'Pharmacy' })
  pharmacyId: Types.ObjectId;

  @Prop()
  address: string;
}
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.plugin(mongoosePaginate);
