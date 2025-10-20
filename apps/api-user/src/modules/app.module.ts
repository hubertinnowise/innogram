import { CoreModule } from '@core/core.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { UserModule } from './user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            expandVariables: true,
            isGlobal: true,
        }),

        ClientsModule.registerAsync([
            {
                imports: [ConfigModule],
                inject: [ConfigService],
                name: 'RABBITMQ_CLIENT',
                useFactory: async (config: ConfigService) => ({
                    options: {
                        queue: config.get<string>('RABBITMQ_QUEUE', 'default_queue'),
                        queueOptions: { durable: false },
                        urls: [config.get<string>('RABBITMQ_URL', 'amqp://guest:guest@rabbitmq:5672')],
                    },
                    transport: Transport.RMQ,
                }),
            },
        ]),
        CoreModule,
        UserModule,
    ],
})
export class AppModule {}
