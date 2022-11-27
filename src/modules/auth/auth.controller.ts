import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import { AuthorizationResponse, LoginDto, RefreshTokenDto, RegisterDto } from '../../modules/auth/dto/auth.dto';
import { IAuthResponse } from './interfaces';
import { AuthService } from './auth.service';
import { ApiBadRequestResponse, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ){}

  @ApiOperation({summary: 'Registration'})
  @ApiResponse({status: 201, description: 'User registration', type: AuthorizationResponse})
  @ApiBadRequestResponse({status: 409, description: 'User is already exist'})
  @ApiBody({type: RegisterDto})
  @Post('register')
  @UsePipes(ValidationPipe)
  register(@Body() data: RegisterDto): Promise<IAuthResponse> {
    return this.authService.register(data)
  }
  
  @ApiOperation({summary: 'Login'})
  @ApiResponse({status: 201, description: 'User registration', type: AuthorizationResponse})
  @ApiBadRequestResponse({status: 401, description: 'Unauthorized! User not found'})
  @ApiBody({type: LoginDto})
  @Post('login')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  login(@Body() data: LoginDto): Promise<IAuthResponse> {
    return this.authService.login(data)
  }

  @ApiOperation({summary: 'Refresh token'})
  @ApiBadRequestResponse({status: 401, description: 'Unauthorized! Invalid token', type: AuthorizationResponse})
  @ApiBody({type: RefreshTokenDto})
  @Post('refresh')
  @UsePipes(ValidationPipe)
  refreshToken(@Body() data: RefreshTokenDto): Promise<IAuthResponse>  {
    return this.authService.refreshToken(data)
  }
  
}