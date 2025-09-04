import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { DatabaseService } from '@core/database/database.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    controllers: [AuthController],
    exports: [DatabaseService],
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'default_jwt_secret',
            signOptions: { expiresIn: '15m' },
        }),
        ClientsModule.register([
            {
                name: 'RABBITMQ_CLIENT',
                options: {
                    queue: process.env.RABBITMQ_QUEUE ?? 'default_queue',
                    queueOptions: { durable: false },
                    urls: [process.env.RABBITMQ_URL ?? 'amqp://guest:guest@rabbitmq:5672'],
                },
                transport: Transport.RMQ,
            },
        ]),
    ],
    providers: [AuthService, DatabaseService],
})
export class AuthModule {}
