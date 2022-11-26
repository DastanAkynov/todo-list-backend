import { Body, Controller, Post} from '@nestjs/common';
import { UserDto } from 'src/modules/user/dto/user.dto';
import { UserService } from 'src/modules/user/user.service';

@Controller()
export class UserController {
  constructor(
    private userService: UserService
  ){}

  @Post('user')
  async create(@Body() data: UserDto)  {
    return await this.userService.create(data)
  }

}