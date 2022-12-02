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
        'api/auth:',
        'POST, /api/auth/register',
        'POST, /api/auth/login',
        '',
        'meal-delivery-api user:',
        'GET, /api/user',
        'GET, /api/user/self',
        'GET, /api/user/:id',
      ],
    };
  }
}
