import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HospitalProblemService } from './hospital_problem.service';
import { CreateHospitalProblemDto } from './dto/create-hospital_problem.dto';
import { UpdateHospitalProblemDto } from './dto/update-hospital_problem.dto';

@Controller('hospital-problem')
export class HospitalProblemController {
  constructor(private readonly hospitalProblemService: HospitalProblemService) {}

  @Post()
  create(@Body() createHospitalProblemDto: CreateHospitalProblemDto) {
    return this.hospitalProblemService.create(createHospitalProblemDto);
  }

  @Get()
  findAll() {
    return this.hospitalProblemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hospitalProblemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHospitalProblemDto: UpdateHospitalProblemDto) {
    return this.hospitalProblemService.update(+id, updateHospitalProblemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hospitalProblemService.remove(+id);
  }
}
