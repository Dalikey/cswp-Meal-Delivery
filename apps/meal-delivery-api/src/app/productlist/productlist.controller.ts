import { AddProductIds, RemoveProductIds } from '@md/data';
import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
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
    @Body() productIds: RemoveProductIds,
    @Param('id') mealId: string
  ) {
    await this.productListService.removeProductFromMeal(productIds, mealId);
  }
}
