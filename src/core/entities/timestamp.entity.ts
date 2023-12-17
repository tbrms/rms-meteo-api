import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class TimestampEntity {
  @CreateDateColumn({
    update: false,
    comment: 'Entity created date',
    default: new Date(),
  })
  createdAt: Date;

  @UpdateDateColumn({
    comment: 'Entity updated date',
    default: new Date(),
  })
  updatedAt: Date;

  @DeleteDateColumn({
    comment: 'Entity deleted date',
    default: null,
  })
  deletedAt: Date;
}
