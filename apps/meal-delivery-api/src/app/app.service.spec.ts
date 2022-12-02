import { Test } from '@nestjs/testing';

import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getData', () => {
    it('should return "Welcome to meal-delivery-api! with endpoints"', () => {
      expect(service.getData()).toEqual({
        message: 'Welcome to meal-delivery-api!',
        endpoints: [
          'Current:',
          'GET, /',
          '',
          'api/auth:',
          'POST, /api/auth/register',
          'POST, /api/auth/login',
          '',
          'meal-delivery-api user:',
          'GET, /api/user',
          'GET, /api/user/self',
          'GET, /api/user/:id',
          '',
          'meal-delivery-api meal:',
          'GET, /api/meal',
          'GET, /api/meal/:id',
          'DELETE, /api/meal/:id',
        ],
      });
    });
  });
});
