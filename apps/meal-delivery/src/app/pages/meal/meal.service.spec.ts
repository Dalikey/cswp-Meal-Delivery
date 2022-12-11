import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { ConfigModule } from '../../shared/moduleconfig/config.module';
import { User } from '../user/user.model';
import { Meal } from './meal.model';
import { MealService } from './meal.service';

// Global mock objects
const expectedUserData: User = {
  id: 'mongo_id',
  username: 'Gebruikersnaam',
  emailAddress: 'user@host.com',
  isGraduated: false,
  phoneNumber: '0647442517',
  token: 'some.dummy.token',
};

const expectedMeals: Meal[] = [
  {
    id: '12345-123-12',
    name: 'Maaltijd naam',
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
      imports: [
        HttpClientModule,
        ConfigModule.forRoot({ apiEndpoint: environment.SERVER_API_URL }),
      ],
      providers: [{ provide: HttpClient }],
    });
    service = TestBed.inject(MealService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of meals', (done: DoneFn) => {
    const meals = service.getAllMeals();
    done();
  });

  it('should return Kipburger met friet', (done: DoneFn) => {
    const meal = service.getMealById('12345-123-16');
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
    done();
  });

  it('should delete a meal', (done: DoneFn) => {
    service.deleteMeal('12345-123-13');
    done();
  });
});
