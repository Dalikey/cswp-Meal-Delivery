import { Test, TestingModule } from '@nestjs/testing';
import { MealService } from './meal.service';
import { InjectToken } from '../auth/token.decorator';

describe('MealService', () => {
  let app: TestingModule;
  let mealService: MealService;

  const mockInjectToken = { id: 'mockTokenId' };
  const mockUser = {
    id: '1',
    username: 'mario',
    emailAddress: 'mario@mario.nl',
    isGraduated: false,
    token: '123',
    role: 'student',
  };

  const mockUser2 = {
    id: '2',
    username: 'mario2',
    emailAddress: 'mario2@mario.nl',
    isGraduated: false,
    token: '1234',
    role: 'student',
  };

  const mockMeal = {
    id: '1',
    name: 'Test Meal',
    price: 10,
    deliveryTime: new Date(),
    deliveryDate: new Date(),
    owner: mockUser,
    studentHouseId: '123',
  };

  const mockMeal2 = {
    id: '2',
    name: 'Test Meal2',
    price: 10,
    deliveryTime: new Date(),
    deliveryDate: new Date(),
    owner: mockUser2,
    studentHouseId: '123',
  };

  const mockCreateMeal = jest.fn();
  const mockGetAll = jest.fn();

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [
        MealService,
        {
          provide: InjectToken,
          useValue: mockInjectToken,
        },
      ],
    })
      .overrideProvider(MealService)
      .useValue({
        createMeal: mockCreateMeal,
        getAll: mockGetAll,
      })
      .compile();

    mealService = app.get<MealService>(MealService);
  });

  describe('createMeal', () => {
    it('should call createMeal with correct parameters', async () => {
      await mealService.createMeal(mockMeal, mockInjectToken.id);

      expect(mockCreateMeal).toHaveBeenCalledWith(mockMeal, mockInjectToken.id);
    });
  });

  describe('getAll', () => {
    it('should return an array of MealInfo objects', async () => {
      const mockMeals = [mockMeal, mockMeal2];

      jest.spyOn(mealService, 'getAll').mockReturnValue(mockMeals as any);

      const result = await mealService.getAll();

      expect(result).toEqual(mockMeals);
    });
  });
});
