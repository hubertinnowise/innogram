import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { CoreModule } from '../core/core.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({
			expandVariables: true,
			isGlobal: true,
		}),
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
        CoreModule
    ],
})
export class AppModule {}
