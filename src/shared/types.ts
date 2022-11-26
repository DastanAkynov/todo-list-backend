import { UserEntity } from '../entities'

export interface JwtAuthRequest extends Request {
  user: UserEntity
}