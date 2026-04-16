import { PartialType } from '@nestjs/mapped-types';
import { CreateHospitalContactDto } from './create-hospital_contact.dto';

export class UpdateHospitalContactDto extends PartialType(CreateHospitalContactDto) {}
