import { Module } from '@nestjs/common';
import { HospitalDataHighlightService } from './hospital_data_highlight.service';
import { HospitalDataHighlightController } from './hospital_data_highlight.controller';
import { HospitalDataHighlight, HospitalDataHighlightSchema } from './schemas/hospital_data_highlight.schema';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';

@Module({
  controllers: [HospitalDataHighlightController],
  providers: [HospitalDataHighlightService],
  imports: [
      MongooseModule.forFeature([
        {
          name: HospitalDataHighlight.name,
          schema: HospitalDataHighlightSchema,
           collection: 'hospital_data_highlights',
        },
      ])
    ],
})
export class HospitalDataHighlightModule {}
