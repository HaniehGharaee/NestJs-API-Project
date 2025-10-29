import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
export type UserDocument = User & Document;
export enum UserRole {
  SUPER_ADMIN = 'superAdmin',
  PHARMACY_ADMIN = 'pharmacyAdmin',
  PHARMACIST = 'pharmacist',
  ACCOUNTANT = 'accountant',
}

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.password;
      ret.id = doc._id.toString();
      return ret;
    },
  },
})
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

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  username: string;

  @Prop({ required: true })
  password: string;

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
    default: UserRole.SUPER_ADMIN,
  })
  role: UserRole;

  @Prop({ type: Types.ObjectId, ref: 'Pharmacy' })
  pharmacyId: Types.ObjectId; // for connect to a pharmacy

  @Prop()
  address: string;
}
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.plugin(mongoosePaginate);

//virtual fullName (not saved in DB) (show in Response or JSON)
UserSchema.virtual('fullName').get(function (this: UserDocument) {
  return `${this.firstName || ''} ${this.lastName || ''} `.trim();
});
