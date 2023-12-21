import { Module } from '@nestjs/common';
import { MeteoService } from './meteo.service';
import { MeteoController } from './meteo.controller';
import { HttpModule } from '@nestjs/axios';
import { MeteoEntity } from './entities/meteo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron.service';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([MeteoEntity]),
    ScheduleModule.forRoot(),
  ],
  controllers: [MeteoController],
  providers: [MeteoService, CronService],
})
export class MeteoModule {}
