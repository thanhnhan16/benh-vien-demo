import { IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateHospitalDto {
  @IsString()
  hospitalName: string;

  @IsOptional()
  @IsString()
  hospitalType?: string;

  @IsOptional()
  @IsString()
  managingOrg?: string;

  @IsOptional()
  @IsString()
  mainSpecialty?: string;

  @IsOptional()
  @IsString()
  keySpecialty?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  bedCount?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  outpatientPerYear?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  inpatientPerYear?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  surgeryPerYear?: number;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  website?: string;

  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;
}