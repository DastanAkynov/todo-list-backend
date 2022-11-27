import { UserEntity } from './user.entity';
import { TodoStatus } from '../shared/types';
import { BeforeUpdate, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AppBaseEntity } from './app-base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('todo')
export class TodoEntity extends AppBaseEntity {
  @ApiProperty()
  @Column('varchar', { nullable: false })
  title: string;

  @ApiProperty()
  @Column('varchar', { nullable: true })
  description?: string;

  @ApiProperty()
  @Column('enum', { enum: TodoStatus, default: TodoStatus.CREATED })
  status: TodoStatus;

  @ApiProperty()
  @Column('varchar', { nullable: false, default: false })
  isCompleted?: boolean;

  @ManyToOne(() => UserEntity,
    { nullable: true, eager: false, onDelete: 'CASCADE' },
  )
  @JoinColumn()
  user?: UserEntity;


  @BeforeUpdate()
  insertIsCompleted() {
    if(this.status === TodoStatus.CREATED || this.status === TodoStatus.IN_PROGRESS) this.isCompleted = false
    if(this.status === TodoStatus.DONE || this.status === TodoStatus.REJECTED) this.isCompleted = true
  }

}