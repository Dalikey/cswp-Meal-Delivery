import { User } from '../user/user.model';

export class Meal {
  id: string | undefined;
  name: string | undefined;
  price: number | undefined;
  deliveryTime: Date | undefined;
  deliveryDate: Date | undefined;
  restaurant: string | undefined;
  user?: User | undefined;
}
