import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TodoEntity } from 'src/entities';
import { UserResponse } from 'src/modules/user/dto/user.dto';
import { TodoStatus } from '../../../shared/types';

export class CreateTodoDto {
  @ApiProperty({required: true, example: "Todo title"})
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({required: false, example: "Todo decription"})
  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateTodoDto {
  @ApiProperty({required: false, example: 'New todo title'})
  @IsString()
  @IsNotEmpty()
  title?: string;

  @ApiProperty({required: false, example: 'New todo description'})
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({required: false, example: 'IN_PROGRESS'})
  @IsEnum(TodoStatus, {message:  `The status value must be - ${TodoStatus.CREATED} | ${TodoStatus.IN_PROGRESS} | ${TodoStatus.DONE} | ${TodoStatus.REJECTED} `})
  status?: TodoStatus;
}

export class TodoWithUserResponse extends TodoEntity {
  @ApiProperty()
  user: UserResponse
}

export class TodoResponse extends TodoEntity {}

export class TodoExtendedResponse {
  @ApiProperty()
  todo: TodoResponse

  @ApiProperty({example: 'Todo successfully updated'})
  message: string
}

