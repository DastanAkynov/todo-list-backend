import { CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

export abstract class AppBaseEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp',  default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', select: false, default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
