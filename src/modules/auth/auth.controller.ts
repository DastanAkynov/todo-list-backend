import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import { AuthorizationResponse, LoginDto, RefreshTokenDto, RegisterDto } from '../../modules/auth/dto/auth.dto';
import { IAuthResponse } from './interfaces';
import { AuthService } from './auth.service';
import { ApiBadRequestResponse, ApiBody, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

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
  @ApiResponse({status: 200, description: 'User login', type: AuthorizationResponse})
  @ApiUnauthorizedResponse({status: 400, description: 'Unauthorized! User not found'})
  @ApiBody({type: LoginDto})
  @Post('login')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  login(@Body() data: LoginDto): Promise<IAuthResponse> {
    return this.authService.login(data)
  }

  @ApiOperation({summary: 'Refresh token'})
  @ApiResponse({status: 200, description: 'Refresh user token', type: AuthorizationResponse})
  @ApiUnauthorizedResponse({status: 401, description: 'Unauthorized! Invalid token'})
  @ApiBody({type: RefreshTokenDto})
  @Post('refresh')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  refreshToken(@Body() data: RefreshTokenDto): Promise<IAuthResponse>  {
    return this.authService.refreshToken(data)
  }
  
}