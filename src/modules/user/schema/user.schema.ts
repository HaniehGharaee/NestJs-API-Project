import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document  } from 'mongoose';
import { UserRole } from './roles.enum'
export type UserDocument = User & Document;
//@Schema({})
export class User extends Document{
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
}
export const UserSchema = SchemaFactory.createForClass(User);
