import { PartialType } from '@nestjs/mapped-types';
import { CreateHospitalReadinessDto } from './create-hospital_readiness.dto';

export class UpdateHospitalReadinessDto extends PartialType(CreateHospitalReadinessDto) {}
