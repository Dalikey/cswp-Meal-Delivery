import { MealInfo } from '@md/data';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Meal as MealModel, MealDocument } from '../meal/meal.schema';
import { User, UserDocument } from '../user/user.schema';

@Injectable()
export class OrderListService {
  constructor(
    @InjectModel(MealModel.name) private mealModel: Model<MealDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async getOne(mealId: string): Promise<MealInfo> {
    const meals = await this.mealModel.aggregate([{ $match: { id: mealId } }]);
    return meals[0];
  }

  async addMealToUser(mealId: string, userId: string) {
    const meal = await this.getOne(mealId);
    if (meal) {
      await this.userModel.updateOne(
        { id: userId },
        { $addToSet: { meals: meal } }
      );
    } else {
      throw new HttpException('Meal does not exist', HttpStatus.BAD_REQUEST);
    }
  }

  async removeMealFromUser(mealId: string, userId: string) {
    const meal = await this.getOne(mealId);
    if (meal) {
      await this.userModel.updateOne(
        { id: userId },
        { $pull: { meals: meal } }
      );
    } else {
      throw new HttpException('Meal does not exist', HttpStatus.BAD_REQUEST);
    }
  }
}
