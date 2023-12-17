import { BaseEntity } from '../../core/entities/base';
import { Column, Entity } from 'typeorm';

@Entity('meteo')
export class MeteoEntity extends BaseEntity {
  @Column({
    name: 'temperature',
    type: 'float',
  })
  temperature: number;

  @Column({
    name: 'pression',
    type: 'float',
  })
  pression: number;

  @Column({
    name: 'humidite',
    type: 'float',
  })
  humidite: number;
}
