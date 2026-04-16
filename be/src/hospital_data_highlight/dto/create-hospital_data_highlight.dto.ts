import { IsBoolean, IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateHospitalDataHighlightDto {

  @IsMongoId()
  hospitalId!: string;

  @IsString()
  @IsOptional()
  uniqueData?: string;

  @IsString()
  @IsOptional()
  largestScaleData?: string;

  @IsString()
  @IsOptional()
  deepestData?: string;

  @IsString()
  @IsOptional()
  longestFollowUpData?: string;

  @IsString()
  @IsOptional()
  bestDigitalizedData?: string;

  @IsString()
  @IsOptional()
  bestForDashboard?: string;

  @IsString()
  @IsOptional()
  caseStudyExample?: string;

  @IsBoolean()
  @IsOptional()
  canLinkSources?: boolean;

  @IsBoolean()
  @IsOptional()
  hasUnifiedID?: boolean;

  @IsBoolean()
  @IsOptional()
  canTrackTime?: boolean;

  @IsBoolean()
  @IsOptional()
  hasOutcomes?: boolean;

  @IsBoolean()
  @IsOptional()
  hasFollowUp?: boolean;

  @IsBoolean()
  @IsOptional()
  isMultimodal?: boolean;
}