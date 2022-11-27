import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): { message: string; endpoints: string[] } {
    return {
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
    };
  }
}
