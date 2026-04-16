import { Module } from '@nestjs/common';
import { HospitalReadinessService } from './hospital_readiness.service';
import { HospitalReadinessController } from './hospital_readiness.controller';
import { HospitalReadiness, HospitalReadinessSchema } from './schemas/hospital_readiness.schema';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';

@Module({
  controllers: [HospitalReadinessController],
  providers: [HospitalReadinessService],
  imports: [
      MongooseModule.forFeature([
        {
          name: HospitalReadiness.name,
          schema: HospitalReadinessSchema,
           collection: 'hospital_readiness',
        },
      ])
    ],
})
export class HospitalReadinessModule {}
