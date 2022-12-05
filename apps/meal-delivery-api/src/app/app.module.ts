import { MiddlewareConsumer, Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { TokenMiddleware } from './auth/token.middleware';
import { UserModule } from './user/user.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MealModule } from './meal/meal.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_USR}:${process.env.MONGO_PWD}@${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`
    ),
    AuthModule,
    UserModule,
    MealModule,
    RouterModule.register([
      { path: 'api', module: AuthModule },
      { path: 'api', module: UserModule },
      { path: 'api', module: MealModule },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenMiddleware).forRoutes('api');
  }
}
