import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../../entities';
import { Repository } from 'typeorm';
import { IJwtPayload } from '../interfaces';
import { config } from '../../../config/app.config';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private jwtService: JwtService
  ) {}

  generateAccessToken(user: UserEntity, expiresIn = config.JWT_ACCESS_TIME): Promise<string> {
    return this.jwtService.signAsync(
      { id: user.id },
      { expiresIn },
    );
  }

  generateRefreshToken(user: UserEntity, expiresIn = config.JWT_REFRESH_TIME): Promise<string> {
    return this.jwtService.signAsync(
      { id: user.id },
      { expiresIn},
    );
  }

  async validateByToken(token: string): Promise<UserEntity | null> {
    const payload: IJwtPayload = await this.jwtService
      .verifyAsync(token)
      .catch(() => null);


    return payload ? await this.userRepo.findOne({id: payload.id}) : null;
  }
}