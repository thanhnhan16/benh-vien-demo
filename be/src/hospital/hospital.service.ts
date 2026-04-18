import { Injectable } from '@nestjs/common';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';
import { Hospital, HospitalDocument } from './schemas/hospital.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class HospitalService {


  constructor(
    @InjectModel(Hospital.name)
    private hospitalModel: Model<HospitalDocument>,
  ) {}
  
 create(data: any) {
  return this.hospitalModel.create(data);
}


getHospitalFull(id: string) {
  return this.hospitalModel.aggregate([
    { $match: { _id: new Types.ObjectId(id) } },

    {
      $lookup: {
        from: 'hospital_contacts',
        localField: '_id',
        foreignField: 'hospitalId',
        as: 'contacts',
      },
    },

    {
      $lookup: {
        from: 'hospital_strengths',
        localField: '_id',
        foreignField: 'hospitalId',
        as: 'strengths',
      },
    },

    {
      $lookup: {
        from: 'hospital_problems',
        localField: '_id',
        foreignField: 'hospitalId',
        as: 'problems',
      },
    },

    {
      $lookup: {
        from: 'hospital_data_sources',
        localField: '_id',
        foreignField: 'hospitalId',
        as: 'dataSources',
      },
    },

    {
      $lookup: {
        from: 'hospital_readiness',
        localField: '_id',
        foreignField: 'hospitalId',
        as: 'readiness',
      },
    },
    {
      $lookup: {
        from: 'hospital_data_highlights',
        localField: '_id',
        foreignField: 'hospitalId',
        as: 'dataHighlights',
      },
    },

    {
      $addFields: {
        strengths: { $arrayElemAt: ['$strengths', 0] },
        readiness: { $arrayElemAt: ['$readiness', 0] },
        dataHighlights: { $arrayElemAt: ['$dataHighlights', 0]},
      },
    },
    

    {
      $project: {
        hospital: {
          _id: "$_id",
          hospitalName: "$hospitalName",
          hospitalType: "$hospitalType",
          managingOrg: "$managingOrg",
          mainSpecialty: "$mainSpecialty",
          keySpecialty: "$keySpecialty",
          bedCount: "$bedCount",
          outpatientPerYear: "$outpatientPerYear",
          inpatientPerYear: "$inpatientPerYear",
          surgeryPerYear: "$surgeryPerYear",
          address: "$address",
          website: "$website",
        },
        strengths: 1,
        readiness: 1,
        contacts: 1,
        problems: 1,
        dataSources: 1,
        dataHighlights: 1,
      },
    },
  ]).then((res) => res[0]); 
}

  findAll() {
    return this.hospitalModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} hospital`;
  }

  update(id: string, updateHospitalDto: UpdateHospitalDto) {
    return this.hospitalModel.findByIdAndUpdate(id, updateHospitalDto, { returnDocument: 'after' });
  }

  remove(id: number) {
    return `This action removes a #${id} hospital`;
  }
}
