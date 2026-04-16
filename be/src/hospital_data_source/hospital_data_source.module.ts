import { Module } from '@nestjs/common';
import { HospitalDataSourceService } from './hospital_data_source.service';
import { HospitalDataSourceController } from './hospital_data_source.controller';
import { HospitalDataSource, HospitalDataSourceSchema } from './schemas/hospital_data_source.schema';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';

@Module({
  controllers: [HospitalDataSourceController],
  providers: [HospitalDataSourceService],
  imports: [
      MongooseModule.forFeature([
        {
          name: HospitalDataSource.name,
          schema: HospitalDataSourceSchema,
           collection: 'hospital_data_sources',
        },
      ])
    ],
})
export class HospitalDataSourceModule {}
