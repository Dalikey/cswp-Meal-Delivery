import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Meal as MealModel, MealDocument } from '../schema/meal.schema';
import { InjectModel } from '@nestjs/mongoose';
import { MealInfo, ResourceId } from '@md/data';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schema/user.schema';
import {
  StudentHouse,
  StudentHouseDocument,
} from '../schema/studentHouse.schema';

@Injectable()
export class MealService {
  constructor(
    @InjectModel(MealModel.name) private mealModel: Model<MealDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(StudentHouse.name)
    private studentHouseModel: Model<StudentHouseDocument>
  ) {}

  async createMeal(mealInfo: MealInfo, ownerId: string): Promise<ResourceId> {
    const owner = await this.userModel.findOne({ id: ownerId });
    if (!owner) {
      throw new HttpException('Owner not found', HttpStatus.BAD_REQUEST);
    }
    const studentHouse = await this.studentHouseModel.findOne({
      id: mealInfo.studentHouseId,
    });
    const meal = new this.mealModel({
      id: mealInfo.id,
      name: mealInfo.name,
      price: mealInfo.price,
      deliveryTime: mealInfo.deliveryTime,
      deliveryDate: mealInfo.deliveryDate,
      owner: owner,
      studentHouse: studentHouse,
    });
    await meal.save();
    return meal.id;
  }

  async getAll(): Promise<MealInfo[]> {
    return this.mealModel.find({}, { _id: 0, __v: 0 });
  }

  async getOne(mealId: string): Promise<MealInfo> {
    const meals = await this.mealModel.aggregate([{ $match: { id: mealId } }]);
    return meals[0];
  }

  async updateMeal(
    mealId: string,
    mealInfo: MealInfo,
    ownerId: string
  ): Promise<MealInfo> {
    const meal = await this.mealModel.findOne({ id: mealId });
    const owner = await this.userModel.findOne({ id: ownerId });

    if (!owner) {
      throw new HttpException('Owner not found', HttpStatus.BAD_REQUEST);
    }

    if (owner.role !== 'admin') {
      if (ownerId !== meal?.owner?.id) {
        throw new HttpException(
          'You are not the owner of this meal.',
          HttpStatus.BAD_REQUEST
        );
      }
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
              owner: mealInfo.owner,
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

    return mealInfo;
  }

  async deleteOne(mealId: string, ownerId: string) {
    const meal = await this.getOne(mealId);
    const owner = await this.userModel.findOne({ id: ownerId });

    if (meal) {
      if (!owner) {
        throw new HttpException('Owner not found', HttpStatus.BAD_REQUEST);
      }
      if (ownerId !== meal?.owner?.id) {
        throw new HttpException(
          'You are not the owner of this meal.',
          HttpStatus.BAD_REQUEST
        );
      }

      await this.mealModel.deleteOne({ id: mealId });
    } else {
      throw new HttpException('Meal does not exist', HttpStatus.BAD_REQUEST);
    }
  }
}
