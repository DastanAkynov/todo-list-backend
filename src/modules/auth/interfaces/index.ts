import { UserEntity } from '../../../entities';

export interface IAuthResponse {
  user: UserEntity;
  accessToken: string;
  refreshToken: string
}