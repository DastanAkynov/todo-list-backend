import { Body, Controller, Delete, Get, Param, Post, Put, Req, UsePipes, ValidationPipe} from '@nestjs/common';
import { IAppResponse, JwtAuthRequest } from '../../shared/types';
import { TodoEntity } from '../../entities';
import { CreateTodoDto, UpdateTodoDto } from './dto/todo.dto';
import { TodoService } from './todo.service';
import { ITodoResponse } from './interfaces';

@Controller()
export class TodoController {
  constructor(
    private todoService: TodoService
  ){}

  @Post('todo')
  @UsePipes(ValidationPipe)
  create(
    @Req() req: JwtAuthRequest,
    @Body() data: CreateTodoDto
  ): Promise<TodoEntity>  {
    return this.todoService.create(req, data)
  }
  
  @Get('todos')
  getAll(): Promise<TodoEntity[]>  {
    return this.todoService.getAll()
  }

  @Get('todos/me')
  getUserTodos(
    @Req() req: JwtAuthRequest
  ): Promise<TodoEntity[]>  {
    return this.todoService.getUserTodos(req)
  }


  @Put('todo/:id')
  updateOne(
    @Req() req: JwtAuthRequest,
    @Param('id') id: string,
    @Body() data: UpdateTodoDto
  ): Promise<ITodoResponse> {
    return this.todoService.udpateById(req, id, data)
  }

  @Delete('todo/:id')
  deleteOne(
    @Req() req: JwtAuthRequest,
    @Param('id') id: string,
  ): Promise<IAppResponse> {
    return this.todoService.deleteById(req, id)
  }
}