import {  ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../entities';
import { Repository } from 'typeorm';
import { IAuthResponse } from '../../modules/auth/interfaces';
import { LoginDto, RefreshTokenDto, RegisterDto } from './dto/auth.dto';
import { UserService } from '../user/user.service';
import { TokenService } from '../shared/services/token.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private userService: UserService,
    private tokenService: TokenService
  ) {}
  
  async register(data: RegisterDto): Promise<IAuthResponse> {
    const existedUser = await this.userRepo.findOne({email: data.email})
    if(existedUser) throw new ConflictException('Email already exist.')
    const user = await this.userService.create(data)
    delete user.updatedAt

    const response = await this.buildResponse(user)
    return response
  }

  async login(data: LoginDto): Promise<IAuthResponse>  {
    const { email, password } = data
    const user = await this.userRepo.createQueryBuilder('user')
    .addSelect('user.password')
    .where('user.email = :email', {email})
    .getOne()
    
    if(!user) throw new NotFoundException('Invalid email')
    const validPassword = await user.validatePassword(password)
    if(!validPassword)  throw new NotFoundException('Invalid password')
    delete user.password

    const response = await this.buildResponse(user)
    return response
  }


  async refreshToken({token}: RefreshTokenDto): Promise<IAuthResponse>  {
    const user = await this.tokenService.validateByToken(token)
    if(!user) throw new UnauthorizedException('Invalid or expired token')
    const response = await this.buildResponse(user)
    return response
  }


  async buildResponse(user: UserEntity): Promise<IAuthResponse> {
    const accessToken = await this.tokenService.generateAccessToken(user)
    const refreshToken = await this.tokenService.generateRefreshToken(user)
    return {user, accessToken, refreshToken}
  }

}