import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document; //Defines a composite type that is a combination of Category (class/schema) and Document (Mongoose type for documents).
@Schema({
  // This is a class decorator that says the Category class is a schema.
  timestamps: true,
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
      //Remove internal or sensitive fields
      delete ret.password;
      delete ret._id;
      ret.id = doc._id.toString();
      return ret;
    },
  },
  toObject: {
    virtuals: true,
  },
}) //JSON outputs are cleaner and safer,
// system fields like __v are removed,
// if you add a Virtual Field later, it will be automatically included in the output,
// and you can control the behavior of JSON output in a central place.
export class Category {
  //Class definition where fields are specified with @Prop() and finally SchemaFactory creates the actual Schema from this class.
  @Prop({ required: true, trim: true })
  categoryName: string;

  @Prop()
  type?: string;

  @Prop({ required: true })
  code?: number;

  @Prop({ required: true, enum: ['active', 'inactive'], default: 'active' })
  status: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
