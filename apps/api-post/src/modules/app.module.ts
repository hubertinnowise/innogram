import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PostModule } from './post/post.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            expandVariables: true,
        }),

        ClientsModule.registerAsync([
            {
                name: 'RABBITMQ_CLIENT',
                imports: [ConfigModule],        
                inject: [ConfigService],
                useFactory: async (config: ConfigService) => ({
                    transport: Transport.RMQ,
                    options: {
                        urls: [
                            config.get<string>(
                                'RABBITMQ_URL',
                                'amqp://guest:guest@rabbitmq:5672',
                            ),
                        ],
                        queue: config.get<string>('RABBITMQ_QUEUE', 'default_queue'),
                        queueOptions: { durable: false },
                    },
                }),
            },
        ]),
        PostModule,
    ],
})
export class AppModule {}
