import { Module, Global } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../entities';
import { JWT_CONFIG } from '../../config/app.config';
import { TokenService } from './services/token.service';

@Global()
@Module({
  imports: [
    JwtModule.register(JWT_CONFIG),
    TypeOrmModule.forFeature([
      UserEntity
    ])
  ],
  providers: [TokenService],
  exports: [TokenService]
})
export class SharedModule{}