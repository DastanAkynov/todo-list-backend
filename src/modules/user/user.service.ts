import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../entities';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>
  ) {}
  
  async create(data: UserDto): Promise<UserEntity>  {
    const user = await this.userRepo.create({
      name: data.name,
      email: data.email,
      password: data.password,
    })
    await user.save()
    delete user.password

    return user
  }
}