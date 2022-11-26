import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { TokenService } from 'src/modules/shared/services/token.service';
import { JwtAuthRequest } from '../types';


@Injectable()
export class AuthMiddleware implements NestMiddleware {

  constructor(private readonly tokenService: TokenService){}
  
  async use(req: JwtAuthRequest, res: Response, next: NextFunction) {
    const token = req.headers['authorization']
    const user = await this.tokenService.validateByToken(token)
    if(!token || !user) throw new UnauthorizedException('You are unauthorized')
    req.user = user
    
    next();
  }
}