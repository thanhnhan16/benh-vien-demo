import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type HospitalProblemDocument = HydratedDocument<HospitalProblem>;

@Schema({ timestamps: true })
export class HospitalProblem {
  @Prop({ type: Types.ObjectId, required: true })
  hospitalId!: Types.ObjectId;

  @Prop({ required: true })
  name!: string;

  @Prop()
  description?: string;

  @Prop()
  category?: string;

  @Prop()
  context?: string;

  @Prop()
  frequency?: string; 

  @Prop()
  severity?: string;

  @Prop()
  impact?: string;

  @Prop()
  affected?: string;

  @Prop()
  decision?: string;

  @Prop()
  solution?: string;

  @Prop()
  limitation?: string;

  @Prop()
  value?: string;

  @Prop()
  metric?: string;

  @Prop()
  department?: string;

  @Prop({ default: false })
  hasRealData?: boolean;

  @Prop({ default: false })
  isFrequent?: boolean;

  @Prop({ default: false })
  techImprovable?: boolean;

  @Prop({ default: false })
  isPilotReady?: boolean;

  @Prop({ default: false })
  isCityLevel?: boolean;



}

export const HospitalProblemSchema =
  SchemaFactory.createForClass(HospitalProblem);