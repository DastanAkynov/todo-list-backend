import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './config/typeorm.config';
import { 
  AuthModule,
  UserModule,
  SharedModule,
  TodoModule
} from './modules';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    AuthModule,
    TodoModule,
    SharedModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
