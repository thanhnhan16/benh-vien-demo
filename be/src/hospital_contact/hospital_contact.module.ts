import { Module } from '@nestjs/common';
import { HospitalContactService } from './hospital_contact.service';
import { HospitalContactController } from './hospital_contact.controller';
import { HospitalContact, HospitalContactSchema } from './schemas/hospital_contact.schema';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';

@Module({
  controllers: [HospitalContactController],
  providers: [HospitalContactService],
  imports: [
    MongooseModule.forFeature([
      {
        name: HospitalContact.name,
        schema: HospitalContactSchema,
         collection: 'hospital_contacts',
      },
    ])
  ],
})
export class HospitalContactModule {}
