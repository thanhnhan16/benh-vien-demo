import { Module } from '@nestjs/common';
import { HospitalService } from './hospital.service';
import { HospitalController } from './hospital.controller';
import { Hospital, HospitalSchema } from './schemas/hospital.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [HospitalController],
  providers: [HospitalService],
  imports: [
    MongooseModule.forFeature([
      { name: Hospital.name, schema: HospitalSchema, collection: 'hospitals' },
    ]),
  ],
})
export class HospitalModule {}
