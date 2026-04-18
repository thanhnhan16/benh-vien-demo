import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HospitalDataHighlightService } from './hospital_data_highlight.service';
import { CreateHospitalDataHighlightDto } from './dto/create-hospital_data_highlight.dto';
import { UpdateHospitalDataHighlightDto } from './dto/update-hospital_data_highlight.dto';

@Controller('hospital-data-highlight')
export class HospitalDataHighlightController {
  constructor(private readonly hospitalDataHighlightService: HospitalDataHighlightService) {}

  @Post()
  create(@Body() createHospitalDataHighlightDto: CreateHospitalDataHighlightDto) {
    return this.hospitalDataHighlightService.create(createHospitalDataHighlightDto);
  }

  @Get()
  findAll() {
    return this.hospitalDataHighlightService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hospitalDataHighlightService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHospitalDataHighlightDto: UpdateHospitalDataHighlightDto) {
    return this.hospitalDataHighlightService.update(id, updateHospitalDataHighlightDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hospitalDataHighlightService.remove(+id);
  }
}
