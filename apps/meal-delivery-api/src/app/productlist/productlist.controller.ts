import { AddProductIds } from '@md/data';
import { Body, Controller, Delete, Param, Post, Query } from '@nestjs/common';
import { ProductListService } from './productlist.service';

@Controller('productlist')
export class ProductListController {
  constructor(private readonly productListService: ProductListService) {}

  @Post('')
  async addProductToMeal(@Body() addId: AddProductIds) {
    await this.productListService.addProductToMeal(
      addId.productId,
      addId.mealId
    );
  }

  @Delete(':id')
  async removeProductFromMeal(
    @Query('productIds') productIds: string,
    @Param('id') mealId: string
  ) {
    await this.productListService.removeProductFromMeal(
      productIds.split(','),
      mealId
    );
  }
}
