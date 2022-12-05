import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Meal as MealModel, MealDocument } from './meal.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Meal, MealInfo } from '@md/data';
import { Model } from 'mongoose';

@Injectable()
export class MealService {
  constructor(
    @InjectModel(MealModel.name) private mealModel: Model<MealDocument>
  ) {}

  async createMeal(mealInfo: MealInfo): Promise<string> {
    const meal = new this.mealModel({ mealInfo });
    await meal.save();
    return meal.id;
  }

  async getAll(): Promise<MealInfo[]> {
    return this.mealModel.find({}, { _id: 0, __v: 0 });
  }

  async getOne(mealId: string): Promise<Meal> {
    const meals = await this.mealModel.aggregate([
      {
        $match: {
          id: mealId,
        },
      },
    ]);

    return meals[0];
  }

  async deleteOne(mealId: string) {
    const meal = await this.getOne(mealId);
    if (meal) {
      await this.mealModel
        .deleteOne({ id: mealId })
        .then(() => {
          console.log('Data deleted');
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      throw new HttpException('Meal not exist', HttpStatus.BAD_REQUEST);
    }
  }
}
