import { PartialType } from '@nestjs/mapped-types';
import { CreateHospitalProblemDto } from './create-hospital_problem.dto';

export class UpdateHospitalProblemDto extends PartialType(CreateHospitalProblemDto) {}
