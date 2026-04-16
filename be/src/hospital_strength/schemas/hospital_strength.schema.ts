import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type HospitalStrengthDocument = HydratedDocument<HospitalStrength>;

@Schema({ timestamps: true })
export class HospitalStrength {
  @Prop({ type: Types.ObjectId, required: true })
  hospitalId!: Types.ObjectId;

  @Prop()
  mainSpecialty?: string;

  @Prop()
  topDiseases?: string;

  @Prop()
  strongDiseases?: string;

  @Prop()
  techniques?: string;

  @Prop()
  highlightTechniques?: string;

  @Prop()
  uniqueServices?: string;

  @Prop()
  mainPatientGroup?: string;

  @Prop()
  patientPerYear?: number;

  @Prop()
  specialCases?: number;

  @Prop()
  icuCases?: number;

  @Prop()
  dataDuration?: string;

  @Prop()
  techYears?: number;

  @Prop()
  longTermData?: boolean;

  @Prop()
  trackingTime?: string;

  @Prop()
  topTierSpecialty?: string;

  @Prop()
  representativeDiseases?: string;

  @Prop()
  highImpactProblem?: string;
}

export const HospitalStrengthSchema =
  SchemaFactory.createForClass(HospitalStrength);