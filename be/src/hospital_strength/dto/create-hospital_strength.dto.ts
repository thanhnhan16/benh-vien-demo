import {
  IsBoolean,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateHospitalStrengthDto {
  @IsMongoId()
  hospitalId: string;

  // ===== CHUYÊN KHOA CHÍNH =====
  @IsOptional()
  @IsString()
  mainSpecialty?: string;

  @IsOptional()
  @IsString()
  topDiseases?: string;

  @IsOptional()
  @IsString()
  strongDiseases?: string;

  // ===== KỸ THUẬT / CÔNG NGHỆ =====
  @IsOptional()
  @IsString()
  techniques?: string;

  @IsOptional()
  @IsString()
  highlightTechniques?: string;

  // ===== DỊCH VỤ / BỆNH NHÂN =====
  @IsOptional()
  @IsString()
  uniqueServices?: string;

  @IsOptional()
  @IsString()
  mainPatientGroup?: string;

  // ===== THỐNG KÊ =====
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  patientPerYear?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  specialCases?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  icuCases?: number;

  // ===== DỮ LIỆU THỜI GIAN =====
  @IsOptional()
  @IsString()
  dataDuration?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  techYears?: number;

  @IsOptional()
  @IsBoolean()
  longTermData?: boolean;

  @IsOptional()
  @IsString()
  trackingTime?: string;

  @IsOptional()
  @IsString()
  topTierSpecialty?: string;

  @IsOptional()
  @IsString()
  representativeDiseases?: string;

  @IsOptional()
  @IsString()
  highImpactProblem?: string;
}