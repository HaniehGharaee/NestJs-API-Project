import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RefreshTokenDocument = RefreshToken & Document;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
      delete ret._id;
      ret.id = doc._id.toString();
      return ret;
    },
  },
})
export class RefreshToken extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ required: true })
  token: string;

  @Prop({ required: true })
  expireAt: Date; //Token expiration time

  @Prop({ default: false })
  revoked: boolean; //Whether the token has been canceled or not

  @Prop({ default: null })
  replacedByToken?: string; // If a new Refresh Token replaces this one

  @Prop({ default: null })
  userAgent?: string; // For example, to detect the device (optional)

  @Prop({ default: null })
  ipAddress?: string; // For more security, register IP (optional)
}
export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
