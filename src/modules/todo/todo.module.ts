import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TodoEntity, UserEntity } from '../../entities';
import { AuthMiddleware } from 'src/shared/middlewares/auth.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TodoEntity,
      UserEntity
    ],
  )],
  controllers: [TodoController],
  providers: [TodoService],
  exports: []
})
export class TodoModule{
    configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/todo*', method: RequestMethod.ALL }
      );
  }
}