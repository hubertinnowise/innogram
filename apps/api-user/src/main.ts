/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './modules/app.module';

// start this as a microservice, not http ?
// const app = await NestFactory.createMicroservice<MicroserviceOptions>(
// rejestrujesz rabbita tutaj?

//moze byc both, i http server i microservice
//tak ze jakby, ale chyba tak, ze ten serwis
//samemu w sobie ma byc api jednoczesnie i
//uzywac rmq do komunikacji z innymi serwisami

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const globalPrefix = 'api-user';
    app.setGlobalPrefix(globalPrefix);
    const port = process.env.PORT || 3001;
    await app.listen(port);
    Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
