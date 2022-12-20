import { Id } from './id.type';
import { User } from './user.interface';

export interface MealInfo {
  id: Id;
  name: string;
  price: number | undefined;
  deliveryTime: Date | undefined;
  deliveryDate: Date | undefined;
  restaurant: string | undefined;
  user?: User | undefined;
}

export interface Meal extends MealInfo {}
