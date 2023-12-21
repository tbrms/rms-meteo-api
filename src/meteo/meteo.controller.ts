import { Controller, Get, Param } from '@nestjs/common';
import { MeteoService } from './meteo.service';
import { MeteoEntity } from './entities/meteo.entity';

@Controller('meteo')
export class MeteoController {
  constructor(private readonly meteoService: MeteoService) {}

  /* L'extrait de code définit un point de terminaison GET `/meteo/now` dans la classe
  `MeteoController`. Lors de l'accès à ce point de terminaison, la méthode `findNow()` est appelée.
  Cette méthode renvoie une promesse qui se résout en un objet Partial<MeteoEntity>. */
  @Get('/now')
  findNow(): Promise<Partial<MeteoEntity>> {
    return this.meteoService.findNow();
  }

  /* L'extrait de code définit un point de terminaison GET `/meteo/history/:duration` dans la classe
  `MeteoController`. Lors de l'accès à ce point de terminaison, la méthode `findHistory()` est
  appelée. Cette méthode prend un paramètre « durée » du chemin de l'URL à l'aide du décorateur «
  @Param() » et s'attend à ce qu'il s'agisse d'un nombre. Il appelle ensuite la méthode
  `findHistory()` de `meteoService` pour récupérer une liste d'objets `MeteoEntity` pour la durée
  spécifiée. La méthode renvoie une promesse qui se résout en un tableau d'objets « MeteoEntity ». */
  @Get('history/:duration')
  findHistory(@Param('duration') duration: number): Promise<MeteoEntity[]> {
    return this.meteoService.findHistory(duration);
  }
}
