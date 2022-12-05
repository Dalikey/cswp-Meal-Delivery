import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';

import { MealService } from './meal.service';

import { MealInfo, Meal, ResourceId } from '@md/data';

@Controller('meal')
export class MealController {
  constructor(private readonly mealService: MealService) {}

  @Post()
  async register(@Body() meal: MealInfo): Promise<ResourceId> {
    try {
      return {
        id: await this.mealService.createMeal(meal),
      };
    } catch (e) {
      let errorMessage = 'Failed to do something exceptional';
      if (e instanceof Error) {
        errorMessage = e.message;
      }
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async getAll(): Promise<MealInfo[]> {
    return this.mealService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Meal> {
    return this.mealService.getOne(id);
  }

  @Delete(':id')
  async deleteMeal(@Param('id') id: string) {
    await this.mealService.deleteOne(id);
  }
}
