import { IsBoolean, IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateHospitalProblemDto {
  @IsMongoId()
  hospitalId: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  context?: string;

  @IsOptional()
  @IsString()
  frequency?: string;

  @IsOptional()
  @IsString()
  severity?: string;

  @IsOptional()
  @IsString()
  impact?: string;

  @IsOptional()
  @IsString()
  affected?: string;

  @IsOptional()
  @IsString()
  decision?: string;

  @IsOptional()
  @IsString()
  solution?: string;

  @IsOptional()
  @IsString()
  limitation?: string;

  @IsOptional()
  @IsString()
  value?: string;

  @IsOptional()
  @IsString()
  metric?: string;

  @IsOptional()
  @IsString()
  department?: string;

  @IsOptional()
  @IsBoolean()
  hasRealData?: boolean;

  @IsOptional()
  @IsBoolean()
  isFrequent?: boolean;

  @IsOptional()
  @IsBoolean()
  techImprovable?: boolean;
  
  @IsOptional()
  @IsBoolean()
  isPilotReady?: boolean;

  @IsOptional()
  @IsBoolean()
  isCityLevel?: boolean;
}