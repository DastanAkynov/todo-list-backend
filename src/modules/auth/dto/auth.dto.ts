import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto  {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
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