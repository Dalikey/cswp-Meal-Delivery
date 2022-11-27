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
          'auth-api:',
          'POST, /auth-api/register',
          'POST, /auth-api/login',
          '',
          'meal-delivery-api user:',
          'GET, /meal-delivery-api/user',
          'GET, /meal-delivery-api/user/self',
          'GET, /meal-delivery-api/user/:id',
        ],
      });
    });
  });
});
