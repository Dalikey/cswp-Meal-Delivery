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
      `mongodb+srv://${process.env.MONGO_USR}:${process.env.MONGO_PWD}@${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`
      // 'mongodb://127.0.0.1:27017/mealdelivery' // LocalDb the /mealdelivery is the name of the database
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
    consumer.apply(TokenMiddleware).forRoutes('api');
  }
}
