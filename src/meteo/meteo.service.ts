import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { MeteoEntity } from './entities/meteo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meteo } from './models/meteo.model';

@Injectable()
export class MeteoService {
  constructor(
    @InjectRepository(MeteoEntity)
    private readonly meteoRepository: Repository<MeteoEntity>,
    private readonly httpService: HttpService,
  ) {}

  async findNow(): Promise<any> {
    const response = await this.httpService.axiosRef.get(
      'http://nas.thsrms.ovh:3535',
    );
    return await response.data;
  }

  async findHistory(duration: number): Promise<MeteoEntity[]> {
    return await this.meteoRepository.find({
      order: {
        createdAt: 'DESC',
      },
      take: duration,
    });
  }

  async saveData(data: Meteo) {
    const dataToCreate: MeteoEntity = this.meteoRepository.create({
      ...data,
    });
    const date: Date = new Date();
    dataToCreate.createdAt = dataToCreate.updatedAt = date;
    await this.meteoRepository.save(dataToCreate);
  }
}
