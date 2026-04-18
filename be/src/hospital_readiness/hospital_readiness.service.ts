import { Injectable } from '@nestjs/common';
import { CreateHospitalReadinessDto } from './dto/create-hospital_readiness.dto';
import { UpdateHospitalReadinessDto } from './dto/update-hospital_readiness.dto';
import { HospitalReadiness, HospitalReadinessDocument } from './schemas/hospital_readiness.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class HospitalReadinessService {
  constructor(
    @InjectModel(HospitalReadiness.name)
    private model: Model<HospitalReadinessDocument>,
  ) {}
  create(dto: CreateHospitalReadinessDto) {
    return this.model.create({
    ...dto,
    hospitalId: new Types.ObjectId(dto.hospitalId),
  });
  }

  findAll() {
    return this.model.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} hospitalReadiness`;
  }

  update(id: String, updateHospitalReadinessDto: UpdateHospitalReadinessDto) {
       return this.model.findByIdAndUpdate(id, updateHospitalReadinessDto, { returnDocument: 'after' });
  }

  remove(id: number) {
    return `This action removes a #${id} hospitalReadiness`;
  }
}
