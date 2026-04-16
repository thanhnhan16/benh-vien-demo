import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type HospitalReadinessDocument = HydratedDocument<HospitalReadiness>;

@Schema({ timestamps: true })
export class HospitalReadiness {
  @Prop({ type: Types.ObjectId, required: true })
  hospitalId!: Types.ObjectId;

  
  @Prop()
  department?: string; 

  @Prop()
  leader?: string; 

  @Prop()
  expert?: string; 

  @Prop()
  it?: string; 

  @Prop()
  research?: string; 

  @Prop()
  relatedClinicalDepartments?: string;
 
  @Prop({ default: false })
  interdisciplinary?: boolean;


  @Prop({ default: false })
  hasOwner?: boolean;

  @Prop({ default: false })
  hasData?: boolean;

  @Prop({ default: false })
  hasAccess?: boolean;

  @Prop({ default: false })
  standardizable?: boolean;


  @Prop({ default: false })
  pilot?: boolean;

  @Prop({ default: false })
  readyDept?: boolean;

 @Prop({ default: false })
  canPilot6to12Months?: boolean;

 
  @Prop({ default: false })
  partner?: boolean;

  @Prop({ default: false })
  cityProposal?: boolean;
}

export const HospitalReadinessSchema =
  SchemaFactory.createForClass(HospitalReadiness);