import {
  IsBoolean,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateHospitalReadinessDto {
  @IsMongoId()
  hospitalId: string;

  // ===== NHÂN SỰ =====
  @IsOptional()
  @IsString()
  department?: string;

  @IsOptional()
  @IsString()
  leader?: string;

  @IsOptional()
  @IsString()
  expert?: string;

  @IsOptional()
  @IsString()
  it?: string;

  @IsOptional()
  @IsString()
  research?: string;

  @IsOptional()
  @IsString()
  relatedClinicalDepartments?: string;

  // ===== LIÊN NGÀNH =====
  @IsOptional()
  @IsBoolean()
  interdisciplinary?: boolean;

  // ===== DỮ LIỆU =====
  @IsOptional()
  @IsBoolean()
  hasOwner?: boolean;

  @IsOptional()
  @IsBoolean()
  hasData?: boolean;

  @IsOptional()
  @IsBoolean()
  hasAccess?: boolean;

  @IsOptional()
  @IsBoolean()
  standardizable?: boolean;

  // ===== TRIỂN KHAI =====
  @IsOptional()
  @IsBoolean()
  pilot?: boolean;

  @IsOptional()
  @IsBoolean()
  readyDept?: boolean;

  @IsOptional()
  @IsBoolean()
  canPilot6to12Months?: boolean;

  // ===== HỢP TÁC =====
  @IsOptional()
  @IsBoolean()
  partner?: boolean;

  @IsOptional()
  @IsBoolean()
  cityProposal?: boolean;
}