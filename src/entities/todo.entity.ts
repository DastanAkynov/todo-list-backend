import { UserEntity } from './user.entity';
import { TodoStatus } from '../shared/types';
import {  BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AppBaseEntity } from './app-base.entity';


@Entity('todo')
export class TodoEntity extends AppBaseEntity {
  @Column('varchar', { nullable: false })
  title: string;

  @Column('varchar', { nullable: true })
  description?: string;

  @Column('enum', { enum: TodoStatus, default: TodoStatus.CREATED })
  status: TodoStatus;

  @Column('varchar', { nullable: false, default: false })
  isCompleted?: boolean;

  @ManyToOne(() => UserEntity,
    { nullable: true, eager: true, onDelete: 'CASCADE' },
  )
  @JoinColumn()
  user?: UserEntity;


  @BeforeUpdate()
  insertIsCompleted() {
    if(this.status === TodoStatus.CREATED || this.status === TodoStatus.IN_PROGRESS) this.isCompleted = false
    if(this.status === TodoStatus.DONE || this.status === TodoStatus.REJECTED) this.isCompleted = true
  }

}