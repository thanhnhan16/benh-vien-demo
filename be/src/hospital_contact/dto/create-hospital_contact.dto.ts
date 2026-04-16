import { IsOptional, IsString, IsDateString, IsMongoId } from 'class-validator';

export class CreateHospitalContactDto {
  @IsMongoId()
  hospitalId!: string;

  @IsOptional()
  @IsString()
  leader?: string;

  @IsOptional()
  @IsString()
  department?: string;

  @IsOptional()
  @IsString()
  doctor?: string;

  @IsOptional()
  @IsString()
  pharmacist?: string;

  @IsOptional()
  @IsString()
  it?: string;

  @IsOptional()
  @IsString()
  owner?: string;

}