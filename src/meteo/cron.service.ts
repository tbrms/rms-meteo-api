import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MeteoService } from './meteo.service';

@Injectable()
export class CronService {
  constructor(private readonly meteoService: MeteoService) {}
  @Cron(CronExpression.EVERY_HOUR)
  async handleHour() {
    const data = await this.meteoService.findNow();
    if (data) {
      await this.meteoService.saveData(data);
    }
  }
}
