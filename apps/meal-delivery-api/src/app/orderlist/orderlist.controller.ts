import { Controller, Delete, Param, Post } from '@nestjs/common';
import { OrderListService } from './orderlist.service';
import { InjectToken, Token } from '../auth/token.decorator';

@Controller('orderlist')
export class OrderListController {
  constructor(private readonly userListService: OrderListService) {}

  @Post(':id')
  async addMealToUser(@InjectToken() token: Token, @Param('id') id: string) {
    await this.userListService.addMealToUser(id, token.id);
  }

  @Delete(':id')
  async removeMealFromUser(
    @InjectToken() token: Token,
    @Param('id') id: string
  ) {
    await this.userListService.removeMealFromUser(id, token.id);
  }
}
