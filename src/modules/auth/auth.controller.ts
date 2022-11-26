import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import { LoginDto, RefreshTokenDto, RegisterDto } from '../../modules/auth/dto/auth.dto';
import { IAuthResponse } from './interfaces';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ){}

  @Post('register')
  @UsePipes(ValidationPipe)
  register(@Body() data: RegisterDto): Promise<IAuthResponse> {
    return this.authService.register(data)
  }

  
  @Post('login')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  login(@Body() data: LoginDto): Promise<IAuthResponse> {
    return this.authService.login(data)
  }

  @Post('refresh')
  @UsePipes(ValidationPipe)
  refreshToken(@Body() data: RefreshTokenDto): Promise<IAuthResponse>  {
    return this.authService.refreshToken(data)
  }
  
}