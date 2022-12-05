import { Id } from './id.type';
import { User } from './user.interface';

export interface MealIdentity {
  id: Id;
  name: string;
}

export interface MealInfo extends MealIdentity {
  price: number | undefined;
  deliveryTime: Date | undefined;
  deliveryDate: Date | undefined;
  restaurant: string | undefined;
  user?: User | undefined;
}

export interface Meal extends MealInfo {}
