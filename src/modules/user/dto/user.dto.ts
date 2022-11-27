import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserEntity } from 'src/entities';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email?: string;

  @IsNotEmpty()
  @IsString()
  password?: string;
}


export class UserResponse extends UserEntity {}

