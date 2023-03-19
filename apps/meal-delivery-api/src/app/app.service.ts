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
        'POST, /auth-api/auth/register',
        'POST, /auth-api/auth/login',
        '',
        'meal-delivery-api user:',
        'GET, /api/user',
        'GET, /api/user/self',
        'GET, /api/user/:id',
        'PUT, /api/user/:id',
        'DELETE, /api/user/self',
        'DELETE, /api/user/:id',
        '',
        'meal-delivery-api orderlist:',
        'POST, /api/orderlist/:id',
        'DELETE, /api/orderlist/:id',
        '',
        'meal-delivery-api meal:',
        'POST, /api/meal',
        'GET, /api/meal',
        'GET, /api/meal/:id',
        'PUT, /api/meal/:id',
        'DELETE, /api/meal/:id',
        '',
        'meal-delivery-api product:',
        'POST, /api/product',
        'GET, /api/product',
        'GET, /api/product/:id',
        'PUT, /api/product/:id',
        'DELETE, /api/product/:id',
        '',
        'meal-delivery-api studentHouse:',
        'POST, /api/studentHouse',
        'GET, /api/studentHouse',
        'GET, /api/studentHouse/:id',
        'PUT, /api/studentHouse/:id',
        'DELETE, /api/studentHouse/:id',
      ],
    };
  }
}
