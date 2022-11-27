import { ApiProperty } from '@nestjs/swagger';
import { IAppResponse } from 'src/shared/types';

export class ApiBaseResponse implements IAppResponse {
  @ApiProperty({required: false})
  status?: number

  @ApiProperty({required: false})
  total?: number

  @ApiProperty({required: false})
  message?: string
}