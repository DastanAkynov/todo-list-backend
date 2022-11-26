import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto  {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class RegisterDto extends LoginDto  {
  @IsNotEmpty()
  @IsString()
  name: string;
}


export class RefreshTokenDto {
  @IsNotEmpty()
  @IsString()
  token: string;
}