import { PartialType } from '@nestjs/mapped-types';
import { CreateHospitalDataSourceDto } from './create-hospital_data_source.dto';

export class UpdateHospitalDataSourceDto extends PartialType(CreateHospitalDataSourceDto) {}
