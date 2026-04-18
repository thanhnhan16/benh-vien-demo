import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HospitalStrengthService } from './hospital_strength.service';
import { CreateHospitalStrengthDto } from './dto/create-hospital_strength.dto';
import { UpdateHospitalStrengthDto } from './dto/update-hospital_strength.dto';

@Controller('hospital-strength')
export class HospitalStrengthController {
  constructor(private readonly hospitalStrengthService: HospitalStrengthService) {}

  @Post()
  create(@Body() createHospitalStrengthDto: CreateHospitalStrengthDto) {
    return this.hospitalStrengthService.create(createHospitalStrengthDto);
  }

  @Get()
  findAll() {
    return this.hospitalStrengthService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hospitalStrengthService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHospitalStrengthDto: UpdateHospitalStrengthDto) {
    return this.hospitalStrengthService.update(id, updateHospitalStrengthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hospitalStrengthService.remove(+id);
  }
}
