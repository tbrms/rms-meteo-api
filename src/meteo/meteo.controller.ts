import { Controller, Get, Param } from '@nestjs/common';
import { MeteoService } from './meteo.service';
import { Meteo } from './models/meteo.model';
import { MeteoEntity } from './entities/meteo.entity';

@Controller('meteo')
export class MeteoController {
  constructor(private readonly meteoService: MeteoService) {}

  @Get('/now')
  findNow(): Promise<Meteo> {
    return this.meteoService.findNow();
  }

  @Get('history/:duration')
  findHistory(@Param('duration') duration: number): Promise<MeteoEntity[]> {
    return this.meteoService.findHistory(duration);
  }
}
