import { Injectable } from '@nestjs/common';
import { CreateHospitalProblemDto } from './dto/create-hospital_problem.dto';
import { UpdateHospitalProblemDto } from './dto/update-hospital_problem.dto';
import { HospitalProblem, HospitalProblemDocument } from './schemas/hospital_problem.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';

@Injectable()
export class HospitalProblemService {
    constructor(
    @InjectModel(HospitalProblem.name)
    private model: Model<HospitalProblemDocument>,
  ) {}
  create(dto: CreateHospitalProblemDto) {
    return this.model.create({
    ...dto,
    hospitalId: new Types.ObjectId(dto.hospitalId),
  });
  }

  findAll() {
    return this.model.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} hospitalProblem`;
  }

  update(id: String, updateHospitalProblemDto: UpdateHospitalProblemDto) {
       return this.model.findByIdAndUpdate(id, updateHospitalProblemDto, { returnDocument: 'after' });
  }

  remove(id: number) {
    return `This action removes a #${id} hospitalProblem`;
  }
}
