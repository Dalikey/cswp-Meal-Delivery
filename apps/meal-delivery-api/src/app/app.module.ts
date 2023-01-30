import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { TokenMiddleware } from './auth/token.middleware';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataModule } from './data.module';
import { Neo4jModule } from './neo4j/neo4j.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_USR}:${process.env.MONGO_PWD}@${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`
      // 'mongodb://127.0.0.1:27017/api' // LocalDb
    ),
    Neo4jModule.forRoot({
      scheme: 'neo4j+s',
      host: `${process.env.NEO4J_HOST}`,
      username: `${process.env.NEO4J_USR}`,
      password: `${process.env.NEO4J_PWD}`,
      database: `${process.env.NEO4J_DATABASE}`,
    }),
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
      .exclude({ path: 'api/(.*)', method: RequestMethod.GET })
      .forRoutes('api');
  }
}
