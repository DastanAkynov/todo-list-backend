import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserEntity } from '../../entities';
import { UserModule } from '../../modules/user/user.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([
      UserEntity
    ],
  )],
  controllers: [AuthController],
  providers: [AuthService],
  exports: []
})
export class AuthModule{}