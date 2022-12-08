import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { TokenMiddleware } from './auth/token.middleware';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataModule } from './data.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      // I tried in environments but railway doesnt pick it up. MongoAPIError: URI must include hostname, domain name, and tld so only for railway its hard coded.
      `mongodb+srv://dalikey:9ySbfQ9gM@mealdelivery.1obte5s.mongodb.net/meal-delivery?retryWrites=true&w=majority`
      // `mongodb+srv://${process.env.MONGO_USR}:${process.env.MONGO_PWD}@${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`
      // 'mongodb://127.0.0.1:27017/api' // LocalDb
    ),
    AuthModule,
    DataModule,
    RouterModule.register([
      { path: 'auth-api', module: AuthModule },
      { path: 'api', module: DataModule },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenMiddleware)
      .exclude({ path: 'api', method: RequestMethod.GET })
      .forRoutes('*');
  }
}
