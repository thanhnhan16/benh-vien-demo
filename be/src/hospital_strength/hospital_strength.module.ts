import { Module } from '@nestjs/common';
import { HospitalStrengthService } from './hospital_strength.service';
import { HospitalStrengthController } from './hospital_strength.controller';
import { HospitalStrength, HospitalStrengthSchema } from './schemas/hospital_strength.schema';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';

@Module({
  controllers: [HospitalStrengthController],
  providers: [HospitalStrengthService],
  imports: [
      MongooseModule.forFeature([
        {
          name: HospitalStrength.name,
          schema: HospitalStrengthSchema,
           collection: 'hospital_strengths',
        },
      ])
    ],
})
export class HospitalStrengthModule {}
