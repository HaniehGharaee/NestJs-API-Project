import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import * as bcrypt from 'bcrypt';
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

  //In Mongoose, when you want to define an array of ObjectIds (which point to another model),
  //Each user may log in on multiple devices (or browsers)
  @Prop({ type: [{ type: Types.ObjectId, ref: 'RefreshToken' }] })
  refreshToken?: Types.ObjectId[];

  //If you only want to store one RefreshToken per user (not multiple ones)
  //   @Prop({ type: Types.ObjectId, ref: 'RefreshToken' })
  // refreshToken?: Types.ObjectId;
}
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.plugin(mongoosePaginate);

//virtual fullName (not saved in DB) (show in Response or JSON)
UserSchema.virtual('fullName').get(function (this: UserDocument) {
  return `${this.firstName || ''} ${this.lastName || ''} `.trim();
});

//Password hashing middleware
//UserSchema.pre('save', ...)
//This is a Mongoose middleware pre-save hook. That is, a function that is executed before the save() operation is performed on a document.
UserSchema.pre<UserDocument>('save', async function (next) {
  //Only if the password has been changed.
  //this.isModified('password')
  //A Mongoose method that tells whether the password field in this document has been modified at this time (for example, during an update, if you haven't changed it, its value is the same as before).
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(12); //Generates a salt. The number 12 represents the number of rounds (a measure of complexity/computational cost).
  this.password = await bcrypt.hash(this.password, salt); //It hashes the password value entered (or set) by the user along with the salt and returns the resulting hashed string.
  //This hashed value is then replaced with this.password — meaning nothing but the hash is stored in the database.

  next();
});
