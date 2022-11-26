import { TodoEntity } from '../../../entities';
import { IAppResponse } from '../../../shared/types';

export interface ITodoResponse extends IAppResponse {
  todo: TodoEntity;
}