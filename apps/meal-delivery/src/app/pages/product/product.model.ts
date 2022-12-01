import {User} from '../user/user.model';

export class Product {
  id: string | undefined;
  name: string | undefined;
  allergies: string[] | undefined;
  containsAlcohol: boolean | undefined;
}
