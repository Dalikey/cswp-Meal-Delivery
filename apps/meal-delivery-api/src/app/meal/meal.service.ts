import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Meal as MealModel, MealDocument } from './meal.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Meal, MealInfo, ResourceId } from '@md/data';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user/user.schema';

@Injectable()
export class MealService {
  constructor(
    @InjectModel(MealModel.name) private mealModel: Model<MealDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async createMeal(
    mealInfo: MealInfo,
    restaurantId: string
  ): Promise<ResourceId> {
    const restaurant = await this.userModel.findOne({ id: restaurantId });

    if (!restaurant) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    const meal = new this.mealModel({
      id: mealInfo.id,
      name: mealInfo.name,
      price: mealInfo.price,
      deliveryTime: mealInfo.deliveryTime,
      deliveryDate: mealInfo.deliveryDate,
      restaurantRef: restaurant._id,
      restaurant: { id: restaurant.id, name: mealInfo.restaurant },
    });
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

  async updateMeal(
    mealId: string,
    mealInfo: MealInfo,
    restaurantId: string
  ): Promise<string> {
    const meal = await this.mealModel.findOne({ id: mealId });
    const restaurant = await this.userModel.findOne({ id: restaurantId });
    if (!restaurant) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    if (restaurant.name == mealInfo.restaurant) {
      throw new HttpException(
        'You are not the owner of this meal.',
        HttpStatus.BAD_REQUEST
      );
    }

    if (meal) {
      try {
        await this.mealModel.updateOne({ id: mealId }, [
          {
            $set: {
              id: mealId,
              name: mealInfo.name,
              price: mealInfo.price,
              deliveryTime: mealInfo.deliveryTime,
              deliveryDate: mealInfo.deliveryDate,
              restaurantRef: restaurant._id,
              restaurant: { id: restaurant.id, name: mealInfo.restaurant },
            },
          },
        ]);
      } catch (e) {
        let errorMessage = 'Failed to do something exceptional';
        if (e instanceof Error) {
          errorMessage = e.message;
        }
        throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
      }
    } else {
      throw new HttpException('Meal does not exist', HttpStatus.BAD_REQUEST);
    }

    return 'Updated: ' + mealId;
  }

  async deleteOne(mealId: string) {
    const meal = await this.getOne(mealId);
    if (meal) {
      await this.mealModel.deleteOne({ id: mealId });
    } else {
      throw new HttpException('Meal does not exist', HttpStatus.BAD_REQUEST);
    }
  }
}
