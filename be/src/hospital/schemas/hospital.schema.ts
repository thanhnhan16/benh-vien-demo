import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HospitalDocument = Hospital & Document;

@Schema({
  timestamps: true,
})
export class Hospital {
  @Prop({ required: true })
  hospitalName?: string;

  @Prop()
  hospitalType?: string;

  @Prop()
  managingOrg?: string;

  @Prop()
  mainSpecialty?: string;

  @Prop()
  keySpecialty?: string;

  @Prop()
  bedCount?: number;

  @Prop()
  outpatientPerYear?: number;

  @Prop()
  inpatientPerYear?: number;

  @Prop()
  surgeryPerYear?: number;

  @Prop()
  address?: string;

  @Prop()
  website?: string;
}

export const HospitalSchema = SchemaFactory.createForClass(Hospital);