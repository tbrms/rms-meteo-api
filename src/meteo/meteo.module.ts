import { Module } from '@nestjs/common';
import { MeteoService } from './meteo.service';
import { MeteoController } from './meteo.controller';
import { HttpModule } from '@nestjs/axios';
import { MeteoEntity } from './entities/meteo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([MeteoEntity])],
  controllers: [MeteoController],
  providers: [MeteoService],
})
export class MeteoModule {}
