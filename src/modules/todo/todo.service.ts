import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity, UserEntity } from '../../entities';
import { Repository } from 'typeorm';
import { CreateTodoDto, UpdateTodoDto } from 'src/modules/todo/dto/todo.dto';
import { IAppResponse, JwtAuthRequest } from '../../shared/types';
import { ITodoResponse } from './interfaces';


@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity) private todoRepo: Repository<TodoEntity>,
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  async create({user}: JwtAuthRequest, data: CreateTodoDto): Promise<TodoEntity> {
    console.log(user)
    const {title, description} = data
    const todo = await this.todoRepo.create()
    todo.title = title
    todo.description = description
    todo.user = await this.userRepo.findOne(user.id)
    await todo.save()

    return todo
  }

  async getAll(): Promise<TodoEntity[]> {
    const todos = await this.todoRepo.find()
    return todos
  }

  async getUserTodos({user}: JwtAuthRequest): Promise<TodoEntity[]> {
    const todos = await this.todoRepo.find({where: {user: {id: user.id}}})
    return todos
  }

  async udpateById(
    req: JwtAuthRequest,
    id: string,
    data: UpdateTodoDto
  ): Promise<ITodoResponse> {
    const todo = await this.todoRepo.findOne(id)
    if(!todo) throw new NotFoundException('Todo not found')

    todo.title = data.title
    todo.description = data.description
    todo.status = data.status

    await todo.save()

    return {todo: todo, message: 'Todo successfully updated'}
  }

  async deleteById( 
    req: JwtAuthRequest, 
    id: string 
  ): Promise<IAppResponse> {
    const todo = await this.todoRepo.findOne(id)
    if(!todo) throw new NotFoundException('Todo not found')
    await todo.remove();

    return { message: 'Todo successfully removed' }
  }

}