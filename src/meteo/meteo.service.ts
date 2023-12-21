import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { MeteoEntity } from './entities/meteo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MeteoService {
  constructor(
    @InjectRepository(MeteoEntity)
    private readonly meteoRepository: Repository<MeteoEntity>,
    private readonly httpService: HttpService,
  ) {}

  /**
   * La fonction "findNow" effectue une requête HTTP GET vers une URL spécifiée et renvoie les données
   * de réponse avec une date ajoutée.
   * @returns La fonction `findNow()` renvoie une promesse qui se résout en un objet
   * Partial<MeteoEntity>.
   */
  async findNow(): Promise<Partial<MeteoEntity>> {
    const response = await this.httpService.axiosRef.get(
      'http://nas.thsrms.ovh:3535',
    );
    return this.addDate(response.data);
  }

  /**
   * La fonction `findHistory` renvoie une promesse qui se résout en un tableau d'objets `MeteoEntity`,
   * représentant l'historique météo, avec une durée spécifiée.
   * @param {number} duration - Le paramètre `duration` dans la fonction `findHistory` représente le
   * nombre d'enregistrements ou d'entrées que vous souhaitez récupérer du `meteoRepository`. Il
   * spécifie le nombre maximum d'enregistrements à renvoyer dans le jeu de résultats.
   * @returns une promesse qui se résout en un tableau d'objets MeteoEntity.
   */
  async findHistory(duration: number): Promise<MeteoEntity[]> {
    return await this.meteoRepository.find({
      order: {
        createdAt: 'DESC',
      },
      take: duration,
    });
  }

  /**
   * La fonction `saveData` enregistre un objet `MeteoEntity` partiel dans la base de données avec la
   * date actuelle comme horodatage de création et de mise à jour.
   * @param data - Le paramètre `data` est un objet de type `Partial<MeteoEntity>`. Il représente les
   * données qui doivent être enregistrées dans la table `MeteoEntity`. Le type `Partial` permet des
   * mises à jour partielles, ce qui signifie que toutes les propriétés de `MeteoEntity` n'ont pas
   * besoin d'être mises à jour.
   */
  async saveData(data: Partial<MeteoEntity>) {
    const dataToCreate: MeteoEntity = this.meteoRepository.create({
      ...data,
    });
    const date: Date = new Date();
    dataToCreate.createdAt = dataToCreate.updatedAt = date;
    await this.meteoRepository.save(dataToCreate);
  }

  /**
   * La fonction ajoute la date et l'heure actuelles aux propriétés "createdAt" et "updatedAt" d'un
   * objet MeteoEntity.
   * @param meteo - Le paramètre `meteo` est un objet de type `Partial<MeteoEntity>`. Cela signifie
   * qu'il s'agit d'un objet qui peut ou non avoir toutes les propriétés définies dans le type
   * `MeteoEntity`.
   * @returns un objet MeteoEntity partiel avec les propriétés CreateAt et UpdatedAt définies sur la
   * date actuelle.
   */
  addDate(meteo: Partial<MeteoEntity>): Partial<MeteoEntity> {
    const date: Date = new Date();
    meteo.createdAt = meteo.updatedAt = date;
    return meteo;
  }
}
