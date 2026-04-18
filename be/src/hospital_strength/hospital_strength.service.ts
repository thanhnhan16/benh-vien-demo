import { Injectable } from '@nestjs/common';
import { CreateHospitalStrengthDto } from './dto/create-hospital_strength.dto';
import { UpdateHospitalStrengthDto } from './dto/update-hospital_strength.dto';
import { HospitalStrength, HospitalStrengthDocument } from './schemas/hospital_strength.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';

@Injectable()
export class HospitalStrengthService {
   constructor(
    @InjectModel(HospitalStrength.name)
    private model: Model<HospitalStrengthDocument>,
  ) {}

  create(dto: CreateHospitalStrengthDto) {
    return this.model.create({
    ...dto,
    hospitalId: new Types.ObjectId(dto.hospitalId),
  });
  }

  findAll() {
    return this.model.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} hospitalStrength`;
  }

  update(id: String, updateHospitalStrengthDto: UpdateHospitalStrengthDto) {
       return this.model.findByIdAndUpdate(id, updateHospitalStrengthDto, { returnDocument: 'after' });
  }

  remove(id: number) {
    return `This action removes a #${id} hospitalStrength`;
  }
}
