import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type HospitalDataSourceDocument = HydratedDocument<HospitalDataSource>;

@Schema({ timestamps: true })
export class HospitalDataSource {
  @Prop({ type: Types.ObjectId, required: true })
  hospitalId!: Types.ObjectId;

  @Prop({ required: true })
  name!: string; 

  @Prop({ default: false })
  available?: boolean;

  @Prop()
  scale?: string; 

  @Prop()
  frequency?: string; 

  @Prop()
  type?: string; 

  @Prop()
  system?: string; 

  @Prop()
  owner?: string; 

  @Prop()
  duration?: string; 

  @Prop({ default: false })
  exportable?: boolean;

  @Prop()
  note?: string;
}

export const HospitalDataSourceSchema =
  SchemaFactory.createForClass(HospitalDataSource);