import { BeforeInsert, Column, Entity } from 'typeorm';
import { AppBaseEntity } from './app-base.entity';
import { hash, compare } from 'bcrypt'
import { ApiProperty } from '@nestjs/swagger';

@Entity('user')
export class UserEntity extends AppBaseEntity {
  @ApiProperty()
  @Column('varchar', { nullable: false })
  name: string;

  @ApiProperty()
  @Column('varchar', { nullable: false, unique: true })
  email: string;

  @Column('varchar', { nullable: false, select: false })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 8)
  }

  validatePassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }
}