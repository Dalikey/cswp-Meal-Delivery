import { MealInfo } from '@md/data';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Neo4jService } from '../neo4j/neo4j.service';
import { Meal as MealModel, MealDocument } from '../schema/meal.schema';
import { User, UserDocument } from '../schema/user.schema';

@Injectable()
export class OrderListService {
  constructor(
    @InjectModel(MealModel.name) private mealModel: Model<MealDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private neo4j: Neo4jService
  ) {}

  async getOne(mealId: string): Promise<MealInfo> {
    const meals = await this.mealModel.aggregate([{ $match: { id: mealId } }]);
    return meals[0];
  }

  async addMealToUser(mealId: string, userId: string) {
    const meal = await this.getOne(mealId);
    if (!meal) {
      throw new HttpException('Meal does not exist', HttpStatus.BAD_REQUEST);
    }

    await this.neo4j.singleWrite(
      'MATCH (m:Meal), (u:User) WHERE m.id = $mealId AND u.id = $userId CREATE (u)-[:ORDERED]->(m) RETURN m, u',
      { mealId, userId }
    );

    await this.userModel.updateOne(
      { id: userId },
      { $addToSet: { meals: meal } }
    );
  }

  async removeMealFromUser(mealId: string, userId: string) {
    try {
      await this.userModel.updateOne(
        { id: userId },
        { $pull: { meals: { id: mealId } } }
      );
    } catch (error) {
      throw new HttpException(
        'Failed to remove meal from user',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
