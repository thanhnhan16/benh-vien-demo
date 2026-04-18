import { Injectable } from '@nestjs/common';
import { CreateHospitalDataHighlightDto } from './dto/create-hospital_data_highlight.dto';
import { UpdateHospitalDataHighlightDto } from './dto/update-hospital_data_highlight.dto';
import { HospitalDataHighlight, HospitalDataHighlightDocument } from './schemas/hospital_data_highlight.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';

@Injectable()
export class HospitalDataHighlightService {
    constructor(
    @InjectModel(HospitalDataHighlight.name)
    private model: Model<HospitalDataHighlightDocument>,
  ) {}

  create(dto: CreateHospitalDataHighlightDto) {
      return this.model.create({
      ...dto,
      hospitalId: new Types.ObjectId(dto.hospitalId),
    });
    }

  findAll() {
    return `This action returns all hospitalDataHighlight`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hospitalDataHighlight`;
  }

  update(id: String, updateHospitalDataHighlightDto: UpdateHospitalDataHighlightDto) {
       return this.model.findByIdAndUpdate(id, updateHospitalDataHighlightDto, { returnDocument: 'after' });
  }

  remove(id: number) {
    return `This action removes a #${id} hospitalDataHighlight`;
  }
}
