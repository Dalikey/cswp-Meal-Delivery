import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Identity, IdentitySchema } from './auth/identity.schema';
import { MealController } from './meal/meal.controller';
import { Meal, MealSchema } from './meal/meal.schema';
import { MealService } from './meal/meal.service';
import { UserController } from './user/user.controller';
import { User, UserSchema } from './user/user.schema';
import { UserService } from './user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Identity.name, schema: IdentitySchema },
      { name: User.name, schema: UserSchema },
      { name: Meal.name, schema: MealSchema },
    ]),
  ],
  controllers: [UserController, MealController],
  providers: [UserService, MealService],
})
export class DataModule {}
