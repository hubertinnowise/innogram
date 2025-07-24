import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
dotenv.config();

import { ConfigService } from './config/config.service';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { credentials: true, origin: '*' },
  });

  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
      whitelist: true,
    }),
  );

  app.use(cookieParser());

  const port = configService.get('PORT') || 3000;
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  await app.listen(port, () =>
    Logger.log(`Application is running on: http://localhost:${port}/${globalPrefix}`),
  );
}

bootstrap();
