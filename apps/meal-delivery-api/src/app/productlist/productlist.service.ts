import { MealInfo } from '@md/data';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Meal as MealModel, MealDocument } from '../schema/meal.schema';
import {
  Product as ProductModel,
  ProductDocument,
} from '../schema/product.schema';

@Injectable()
export class ProductListService {
  constructor(
    @InjectModel(ProductModel.name)
    private productModel: Model<ProductDocument>,
    @InjectModel(MealModel.name) private mealModel: Model<MealDocument>
  ) {}

  async getOne(productId: string): Promise<MealInfo> {
    const meals = await this.productModel.aggregate([
      { $match: { id: productId } },
    ]);
    return meals[0];
  }

  async addProductToMeal(productId: string, mealId: string) {
    const product = await this.getOne(productId);
    if (product) {
      await this.mealModel.updateOne(
        { id: mealId },
        { $addToSet: { products: product } }
      );
    } else {
      throw new HttpException('Product does not exist', HttpStatus.BAD_REQUEST);
    }
  }

  async removeProductFromMeal(productId: string, mealId: string) {
    const product = await this.getOne(productId);
    if (product) {
      await this.mealModel.updateOne(
        { id: mealId },
        { $pull: { products: product } }
      );
    } else {
      throw new HttpException('Product does not exist', HttpStatus.BAD_REQUEST);
    }
  }
}
