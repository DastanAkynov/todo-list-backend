import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { IAuthResponse } from 'src/modules/auth/interfaces';
import { UserResponse } from 'src/modules/user/dto/user.dto';
import { UserEntity } from '../../../entities';


export class LoginDto  {
  @ApiProperty({example: 'alex@gmail.com'})
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({example: 'pwd12345'})
  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  password: string;
}

export class RegisterDto extends LoginDto  {
  @ApiProperty({example: 'Alex'})
  @IsNotEmpty()
  @IsString()
  name: string;
}


export class RefreshTokenDto {
  @ApiProperty({example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZjNGI5MWU2LTR'})
  @IsNotEmpty()
  @IsString()
  token: string;
}


export class AuthorizationResponse implements IAuthResponse {
  @ApiProperty({type: UserResponse})
  user: UserResponse;

  @ApiProperty({required: true})
  accessToken: string;

  @ApiProperty({required: true})
  refreshToken: string
}