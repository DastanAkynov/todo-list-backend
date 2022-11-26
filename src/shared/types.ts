import { UserEntity } from '../entities'

export enum TodoStatus {
  CREATED = 'CREATED',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  REJECTED = 'REJECTED',
}

export interface IAppResponse {
  status?: number
  total?: number
  message?: string
}


export interface JwtAuthRequest extends Request {
  user: UserEntity
}