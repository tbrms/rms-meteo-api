import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MeteoService } from './meteo.service';

@Injectable()
export class CronService {
  constructor(private readonly meteoService: MeteoService) {}

  /* L'extrait de code définit une méthode appelée `handleHour()` qui est décorée avec
  `@Cron(CronExpression.EVERY_HOUR)`. */
  @Cron(CronExpression.EVERY_HOUR)
  async handleHour() {
    const data = await this.meteoService.findNow();
    if (data) {
      await this.meteoService.saveData(data);
    }
  }
}
