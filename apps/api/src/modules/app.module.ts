import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { ConfigModule } from '../config/config.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigModule,
        AuthModule,
        ClientsModule.register([
            {
                name: 'RABBITMQ_CLIENT',
                options: {
                    queue: 'default_queue',
                    queueOptions: {
                        durable: false,
                    },
                    urls: ['amqp://guest:guest@rabbitmq:5672'],
                },
                transport: Transport.RMQ,
            },
        ]),
    ],
})
export class AppModule {}
