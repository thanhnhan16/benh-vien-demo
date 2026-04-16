import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type HospitalContactDocument = HospitalContact & Document;

@Schema({
  timestamps: true,
})
export class HospitalContact {
  @Prop({ type: Types.ObjectId, ref: 'Hospital', required: true })
  hospitalId!: Types.ObjectId;

  @Prop()
  leader?: string;

  @Prop()
  department?: string;

  @Prop()
  doctor?: string;

  @Prop()
  pharmacist?: string;

  @Prop()
  it?: string;

  @Prop()
  owner?: string;

  @Prop()
  date?: Date;
}

export const HospitalContactSchema =
  SchemaFactory.createForClass(HospitalContact);