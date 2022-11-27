import { Body, Controller, Delete, Get, Param, Post, Put, Req, UsePipes, ValidationPipe} from '@nestjs/common';
import { IAppResponse, JwtAuthRequest } from '../../shared/types';
import { TodoEntity } from '../../entities';
import { CreateTodoDto, TodoExtendedResponse, TodoResponse, TodoWithUserResponse, UpdateTodoDto } from './dto/todo.dto';
import { TodoService } from './todo.service';
import { ITodoResponse } from './interfaces';
import { ApiBadRequestResponse, ApiBasicAuth, ApiBearerAuth, ApiBody, ApiHeader, ApiHeaders, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Todo')
@ApiBearerAuth('JWT-Auth')
@Controller()
export class TodoController {
  constructor(
    private todoService: TodoService
  ){}
  
  @ApiOperation({summary: 'Create todo'})
  @ApiResponse({status: 201, description: 'Create todo', type: TodoResponse})
  @ApiBody({type: CreateTodoDto})
  @Post('todo')
  @UsePipes(ValidationPipe)
  create(
    @Req() req: JwtAuthRequest,
    @Body() data: CreateTodoDto
  ): Promise<TodoEntity>  {
    return this.todoService.create(req, data)
  }
  
  @ApiOperation({summary: 'Get all todos'})
  @ApiResponse({status: 200, description: 'Get all todos', type: [TodoWithUserResponse]})
  @ApiBadRequestResponse({status: 404, description: 'Todo not found'})
  @Get('todos')
  getAll(): Promise<TodoEntity[]>  {
    return this.todoService.getAll()
  }

  @ApiOperation({summary: 'Get my todos'})
  @ApiResponse({status: 200, description: 'Get my todos', type: [TodoResponse]})
  @ApiBadRequestResponse({status: 404, description: 'Todo not found'})
  @Get('todos/my')
  getUserTodos(
    @Req() req: JwtAuthRequest
  ): Promise<TodoEntity[]>  {
    return this.todoService.getUserTodos(req)
  }

  @ApiOperation({summary: 'Update todo by id'})
  @ApiResponse({status: 200, description: 'Update todo', type: TodoExtendedResponse})
  @ApiBadRequestResponse({status: 404, description: 'Todo not found'})
  @ApiBody({type: UpdateTodoDto})
  @Put('todo/:id')
  @UsePipes(ValidationPipe)
  updateOne(
    @Req() req: JwtAuthRequest,
    @Param('id') id: string,
    @Body() data: UpdateTodoDto
  ): Promise<ITodoResponse> {
    return this.todoService.udpateById(req, id, data)
  }

  @ApiOperation({summary: 'Delete todo by id'})
  @ApiResponse({status: 200, description: 'Delete todo', 
    schema: {type: 'object', properties: {message: {type: 'string', example: 'message'}}}
  })
  @ApiBadRequestResponse({status: 404, description: 'Todo not found'})
  @Delete('todo/:id')
  deleteOne(
    @Req() req: JwtAuthRequest,
    @Param('id') id: string,
  ): Promise<IAppResponse> {
    return this.todoService.deleteById(req, id)
  }
}