import { PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntity } from './timestamp.entity';

export class BaseEntity extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
