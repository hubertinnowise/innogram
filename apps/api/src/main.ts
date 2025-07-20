import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { ConfigService } from './config/config.service';
import { AppModule } from './modules/app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: { credentials: true, origin: '*' } });

    const configService = app.get(ConfigService);

    const port = configService.get('PORT');
    const globalPrefix = 'api';

    app.setGlobalPrefix(globalPrefix);
    app.use(cookieParser());

    await app.listen(port, () => Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`));
}

bootstrap();
