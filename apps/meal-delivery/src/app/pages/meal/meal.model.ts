import { IEntity } from '../entity/i.entity';
import { User } from '../user/user.model';

export class Meal implements IEntity {
  id: string | undefined;
  name: string | undefined;
  price: number | undefined;
  deliveryTime: Date | undefined;
  deliveryDate: Date | undefined;
  restaurant: string | undefined;
  user?: User | undefined;
}
