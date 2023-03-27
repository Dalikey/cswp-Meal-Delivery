import { AddProductIds } from '@md/data';
import { Body, Controller, Delete, Post } from '@nestjs/common';
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

  @Delete('')
  async removeProductFromMeal(@Body() addId: AddProductIds) {
    await this.productListService.removeProductFromMeal(
      addId.productId,
      addId.mealId
    );
  }
}
