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
  role: 'owner',
  token: 'some.dummy.token',
};

const expectedMeals: Meal[] = [
  {
    id: '12345-123-12',
    name: 'Maaltijd naam',
    price: 10.2,
    deliveryTime: new Date(),
    deliveryDate: new Date(),
    owner: 'Avans eigenaar',
    studentHouseId: '960c415d-2895-4d41-ae4b-53c44248f105',

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

  it('should return a list of meals', () => {
    service.getAllMeals().subscribe((meals) => {
      expect(meals).toBeInstanceOf(Array);
      expect(meals).toBeGreaterThan(0);
    });
  });

  it('should return Kipburger met friet', (done: DoneFn) => {
    service
      .getMealById('c311ac5b-21fb-46bf-ab6d-7ed503a260d2')
      .subscribe((meal) => {
        expect(meal!.name).toEqual('Kipburger met friet');
        expect(meal!.price).toBeGreaterThan(0);
      });
    done();
  });

  it('should return Pasta Bolognese met spekjes', (done: DoneFn) => {
    service
      .getMealById('c311ac5b-21fb-46bf-ab6d-7ed503a260d2')
      .subscribe((meal) => {
        expect(meal!.name).toEqual('Pasta Bolognese met spekjes');
        expect(meal!.price).toBeGreaterThan(0);
      });
    done();
  });

  it('should add a meal', () => {
    const newMeal = {
      id: 'c311ac5b-21fb-46bf-ab6d-7ed503a260d2',
      name: 'Kipburger met friet',
      price: 10.2,
      deliveryTime: new Date(),
      deliveryDate: new Date(),
      owner: '7beb2b23-1709-42e7-8bfa-3b2417036470',
      studentHouseId: '960c415d-2895-4d41-ae4b-53c44248f105',
    };
    service.addMeal(newMeal);
    service
      .getMealById('c311ac5b-21fb-46bf-ab6d-7ed503a260d2')
      .subscribe((meal) => {
        expect(meal).toEqual(newMeal);
      });
  });

  it('should update a meal', (done: DoneFn) => {
    const updatedMeal = {
      id: 'c311ac5b-21fb-46bf-ab6d-7ed503a260d2',
      name: 'Pasta Bolognese met spekjes',
      price: 10.2,
      deliveryTime: new Date(),
      deliveryDate: new Date(),
      owner: '7beb2b23-1709-42e7-8bfa-3b2417036470',
      studentHouseId: '960c415d-2895-4d41-ae4b-53c44248f105',
    };
    service.updateMeal(updatedMeal);
    done();
  });

  it('should delete a meal', (done: DoneFn) => {
    service.deleteMeal('c311ac5b-21fb-46bf-ab6d-7ed503a260d2');
    service
      .getMealById('c311ac5b-21fb-46bf-ab6d-7ed503a260d2')
      .subscribe((meal) => {
        expect(meal).toBeNull();
      });
    done();
  });
});
