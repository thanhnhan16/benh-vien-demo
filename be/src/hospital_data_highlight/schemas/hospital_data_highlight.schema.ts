import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type HospitalDataHighlightDocument = HospitalDataHighlight & Document;

@Schema({ timestamps: true })
export class HospitalDataHighlight {

  @Prop({ type: Types.ObjectId, ref: 'Hospital', required: true })
  hospitalId!: Types.ObjectId;

  @Prop()
  uniqueData?: string;

  @Prop()
  largestScaleData?: string;

  @Prop()
  deepestData?: string;

  @Prop()
  longestFollowUpData?: string;

  @Prop()
  bestDigitalizedData?: string;

  @Prop()
  bestForDashboard?: string;

  @Prop()
  caseStudyExample?: string;

  @Prop({ default: false })
  canLinkSources?: boolean;

  @Prop({ default: false })
  hasUnifiedID?: boolean;

  @Prop({ default: false })
  canTrackTime?: boolean;

  @Prop({ default: false })
  hasOutcomes?: boolean;

  @Prop({ default: false })
  hasFollowUp?: boolean;

  @Prop({ default: false })
  isMultimodal?: boolean;
}

export const HospitalDataHighlightSchema =
  SchemaFactory.createForClass(HospitalDataHighlight);