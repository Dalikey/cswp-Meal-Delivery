import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ApiResponseInterceptor } from './app/api-response.interceptor';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ApiResponseInterceptor());

  const port = process.env.PORT || 3333;
  await app.listen(port);

  Logger.log(`🚀 Application is running on: ${await app.getUrl()}`);
}

bootstrap();
