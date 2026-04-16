import { PartialType } from '@nestjs/mapped-types';
import { CreateHospitalStrengthDto } from './create-hospital_strength.dto';

export class UpdateHospitalStrengthDto extends PartialType(CreateHospitalStrengthDto) {}
