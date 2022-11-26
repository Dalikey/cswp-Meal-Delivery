import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { User } from '../user/user.model';
import { Meal } from './meal.model';
import { MealService } from './meal.service';

// Global mock objects
const expectedUserData: User = {
  id: 'mongo_id',
  firstName: 'Firstname',
  lastName: 'Lastname',
  emailAddress: 'user@host.com',
  birthDate: new Date(),
  isGraduated: false,
  phoneNumber: '0647442517',
  token: 'some.dummy.token',
};

const expectedMeals: Meal[] = [
  {
    id: '12345-123-12',
    name: 'mealname',
    price: 10.2,
    deliveryTime: new Date(),
    deliveryDate: new Date(),
    restaurant: 'Avans restaurant',
    user: expectedUserData,
  },
];

describe('MealService', () => {
  let service: MealService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient }],
    });
    service = TestBed.inject(MealService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of meals', (done: DoneFn) => {
    const meals = service.getAllMeals();
    console.log(meals);
    expect(meals.length).toBe(8);
    expect(meals[0].id).toEqual(expectedMeals[0].id);
    done();
  });
});
