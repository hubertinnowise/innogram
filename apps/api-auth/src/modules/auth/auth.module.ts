import { DatabaseService } from '@core/database/database.service';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    controllers: [AuthController],
    exports: [DatabaseService],
    imports: [
        // Omit if ConfigModule is global in your root AppModule
        ConfigModule,

        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => ({
                secret: config.get<string>('JWT_SECRET', 'default_jwt_secret'),
                signOptions: {
                    expiresIn: config.get<string>('JWT_EXPIRES_IN', '15m'),
                },
            }),
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
    ],
    providers: [AuthService, DatabaseService],
})
export class AuthModule {}
