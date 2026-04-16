import { PartialType } from '@nestjs/mapped-types';
import { CreateHospitalDataHighlightDto } from './create-hospital_data_highlight.dto';

export class UpdateHospitalDataHighlightDto extends PartialType(CreateHospitalDataHighlightDto) {}
