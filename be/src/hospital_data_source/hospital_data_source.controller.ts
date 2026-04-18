import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HospitalDataSourceService } from './hospital_data_source.service';
import { CreateHospitalDataSourceDto } from './dto/create-hospital_data_source.dto';
import { UpdateHospitalDataSourceDto } from './dto/update-hospital_data_source.dto';

@Controller('hospital-data-source')
export class HospitalDataSourceController {
  constructor(private readonly hospitalDataSourceService: HospitalDataSourceService) {}

  @Post()
  create(@Body() createHospitalDataSourceDto: CreateHospitalDataSourceDto) {
    return this.hospitalDataSourceService.create(createHospitalDataSourceDto);
  }

  @Get()
  findAll() {
    return this.hospitalDataSourceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hospitalDataSourceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHospitalDataSourceDto: UpdateHospitalDataSourceDto) {
    return this.hospitalDataSourceService.update(id, updateHospitalDataSourceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hospitalDataSourceService.remove(+id);
  }
}
