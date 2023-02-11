import { Controller, Param, Post } from '@nestjs/common';
import { UserListService } from './userlist.service';
import { InjectToken, Token } from '../auth/token.decorator';

@Controller('userlist')
export class UserListController {
  constructor(private readonly userListService: UserListService) {}

  @Post(':id')
  async addMealToUser(@InjectToken() token: Token, @Param('id') id: string) {
    await this.userListService.addMealToUser(id, token.id);
  }
}
