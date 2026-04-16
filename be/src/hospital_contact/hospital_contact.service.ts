import { Injectable } from '@nestjs/common';
import { CreateHospitalContactDto } from './dto/create-hospital_contact.dto';
import { UpdateHospitalContactDto } from './dto/update-hospital_contact.dto';
import { HospitalContact, HospitalContactDocument } from './schemas/hospital_contact.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';

@Injectable()
export class HospitalContactService {
  constructor(
  @InjectModel(HospitalContact.name)
  private model: Model<HospitalContactDocument>,
) {}

  create(dto: CreateHospitalContactDto) {
    return this.model.create({
    ...dto,
    hospitalId: new Types.ObjectId(dto.hospitalId),
  });
  }

  findAll() {
    return this.model.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} hospitalContact`;
  }

  update(id: number, updateHospitalContactDto: UpdateHospitalContactDto) {
    return `This action updates a #${id} hospitalContact`;
  }

  remove(id: number) {
    return `This action removes a #${id} hospitalContact`;
  }
}
