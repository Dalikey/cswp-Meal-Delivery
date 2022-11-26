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

  it('should return Kipburger met friet', (done: DoneFn) => {
    const meal = service.getMealById('12345-123-16');
    console.log(meal);
    expect(meal.name).toEqual('Kipburger met friet');
    done();
  });

  it('should add a meal', (done: DoneFn) => {
    const newMeal = {
      id: '69420-123-12',
      name: 'Kipburger met friet',
      price: 10.2,
      deliveryTime: new Date(),
      deliveryDate: new Date(),
      restaurant: 'Avans restaurant',
    };
    service.addMeal(newMeal);
    expect(service.getAllMeals().length).toEqual(9);
    done();
  });

  it('should update a meal', (done: DoneFn) => {
    const newMeal = {
      id: '12345-123-12',
      name: 'Pasta Bolognese met spekjes',
      price: 10.2,
      deliveryTime: new Date(),
      deliveryDate: new Date(),
      restaurant: 'Avans restaurant',
    };
    service.updateMeal(newMeal);
    expect(service.getMealById('12345-123-12').name).toEqual(
      'Pasta Bolognese met spekjes'
    );
    expect(service.getMealById('12345-123-12').name).not.toEqual(
      'Pasta Bolognese met tomaat, spekjes en kaas'
    );
    done();
  });

  it('should delete a meal', (done: DoneFn) => {
    service.deleteMeal('12345-123-13');
    expect(service.getMealById('12345-123-13')).toBeUndefined();
    done();
  });
});
