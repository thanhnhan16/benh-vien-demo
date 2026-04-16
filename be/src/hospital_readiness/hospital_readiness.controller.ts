import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HospitalReadinessService } from './hospital_readiness.service';
import { CreateHospitalReadinessDto } from './dto/create-hospital_readiness.dto';
import { UpdateHospitalReadinessDto } from './dto/update-hospital_readiness.dto';

@Controller('hospital-readiness')
export class HospitalReadinessController {
  constructor(private readonly hospitalReadinessService: HospitalReadinessService) {}

  @Post()
  create(@Body() createHospitalReadinessDto: CreateHospitalReadinessDto) {
    return this.hospitalReadinessService.create(createHospitalReadinessDto);
  }

  @Get()
  findAll() {
    return this.hospitalReadinessService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hospitalReadinessService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHospitalReadinessDto: UpdateHospitalReadinessDto) {
    return this.hospitalReadinessService.update(+id, updateHospitalReadinessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hospitalReadinessService.remove(+id);
  }
}
