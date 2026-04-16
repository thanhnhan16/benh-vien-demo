import { Module } from '@nestjs/common';
import { HospitalProblemService } from './hospital_problem.service';
import { HospitalProblemController } from './hospital_problem.controller';
import { HospitalProblem, HospitalProblemSchema } from './schemas/hospital_problem.schema';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';

@Module({
  controllers: [HospitalProblemController],
  providers: [HospitalProblemService],
  imports: [
      MongooseModule.forFeature([
        {
          name: HospitalProblem.name,
          schema: HospitalProblemSchema,
           collection: 'hospital_problems',
        },
      ])
    ],
})
export class HospitalProblemModule {}
