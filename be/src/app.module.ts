import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HospitalModule } from './hospital/hospital.module';
import { HospitalContactModule } from './hospital_contact/hospital_contact.module';
import { HospitalStrengthModule } from './hospital_strength/hospital_strength.module';
import { HospitalProblemModule } from './hospital_problem/hospital_problem.module';
import { HospitalDataSourceModule } from './hospital_data_source/hospital_data_source.module';
import { HospitalReadinessModule } from './hospital_readiness/hospital_readiness.module';
import { HospitalDataHighlightModule } from './hospital_data_highlight/hospital_data_highlight.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    HospitalModule,
    HospitalContactModule,
    HospitalStrengthModule,
    HospitalProblemModule,
    HospitalDataSourceModule,
    HospitalReadinessModule,
    HospitalDataHighlightModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
