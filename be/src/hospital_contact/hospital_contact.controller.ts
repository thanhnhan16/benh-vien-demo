import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HospitalContactService } from './hospital_contact.service';
import { CreateHospitalContactDto } from './dto/create-hospital_contact.dto';
import { UpdateHospitalContactDto } from './dto/update-hospital_contact.dto';

@Controller('hospital-contact')
export class HospitalContactController {
  constructor(private readonly hospitalContactService: HospitalContactService) {}

  @Post()
  create(@Body() createHospitalContactDto: CreateHospitalContactDto) {
    return this.hospitalContactService.create(createHospitalContactDto);
  }

  @Get()
  findAll() {
    return this.hospitalContactService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hospitalContactService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHospitalContactDto: UpdateHospitalContactDto) {
    return this.hospitalContactService.update(+id, updateHospitalContactDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hospitalContactService.remove(+id);
  }
}
