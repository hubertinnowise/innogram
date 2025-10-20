import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
dotenv.config();

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
    const globalPrefix = 'api-auth';
    app.setGlobalPrefix(globalPrefix);

    const swaggerConfig = new DocumentBuilder()
        .setTitle('Innogram Auth microservice API')
        .setDescription('API documentation for the Innogram backend')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup(`${globalPrefix}/docs`, app, document);

    await app.listen(port, () => Logger.log(`Application is running on: http://localhost:${port}/${globalPrefix}`));

    Logger.log(`Swagger docs available at: http://localhost:${port}/${globalPrefix}/docs`);
}

bootstrap();
