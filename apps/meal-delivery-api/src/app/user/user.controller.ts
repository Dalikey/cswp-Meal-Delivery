import { Controller, Delete, Get, Param } from '@nestjs/common';

import { UserService } from './user.service';

import { UserInfo, User } from '@md/data';
import { InjectToken, Token } from '../auth/token.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll(): Promise<UserInfo[]> {
    return this.userService.getAll();
  }

  @Get('self')
  async getSelf(@InjectToken() token: Token): Promise<User> {
    const result = await this.userService.getOne(token.id);
    return result;
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<User> {
    return this.userService.getOne(id);
  }

  @Delete('self')
  async deleteSelf(@InjectToken() token: Token) {
    await this.userService.deleteOne(token.id);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    await this.userService.deleteOne(id);
  }
}
