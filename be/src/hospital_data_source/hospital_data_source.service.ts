import { Injectable } from '@nestjs/common';
import { CreateHospitalDataSourceDto } from './dto/create-hospital_data_source.dto';
import { UpdateHospitalDataSourceDto } from './dto/update-hospital_data_source.dto';
import { HospitalDataSource, HospitalDataSourceDocument } from './schemas/hospital_data_source.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';

@Injectable()
export class HospitalDataSourceService {
  constructor(
  @InjectModel(HospitalDataSource.name)
  private model: Model<HospitalDataSourceDocument>,
) {}

  create(dto: CreateHospitalDataSourceDto) {
    return this.model.create({
    ...dto,
    hospitalId: new Types.ObjectId(dto.hospitalId),
  });
  }

  findAll() {
    return this.model.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} hospitalDataSource`;
  }

  update(id: number, updateHospitalDataSourceDto: UpdateHospitalDataSourceDto) {
    return `This action updates a #${id} hospitalDataSource`;
  }

  remove(id: number) {
    return `This action removes a #${id} hospitalDataSource`;
  }
}
