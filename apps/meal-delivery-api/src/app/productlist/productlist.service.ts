import { MealInfo, RemoveProductIds } from '@md/data';
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

  async getMultiple(productIds: string[]): Promise<MealInfo[]> {
    const meals = await this.productModel.aggregate([
      { $match: { id: { $in: productIds } } },
    ]);
    return meals;
  }

  async addProductToMeal(productIds: string[], mealId: string) {
    const products = await this.getMultiple(productIds);
    if (products.length > 0) {
      await this.mealModel.updateOne(
        { id: mealId },
        { $addToSet: { products: { $each: products } } }
      );
    } else {
      throw new HttpException('Product does not exist', HttpStatus.BAD_REQUEST);
    }
  }

  async removeProductFromMeal(p: RemoveProductIds, mealId: string) {
    if (!Array.isArray(p.productIds)) {
      throw new HttpException(
        'Invalid product IDs, fill in body with [productId]',
        HttpStatus.BAD_REQUEST
      );
    }

    const products = await this.getMultiple(p.productIds);
    if (products) {
      const productIdsToRemove = products.map((p) => p.id);
      await this.mealModel.updateOne(
        { id: mealId },
        { $pull: { products: { id: { $in: productIdsToRemove } } } }
      );
    } else {
      throw new HttpException('Product does not exist', HttpStatus.BAD_REQUEST);
    }
  }
}
