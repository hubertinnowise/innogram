import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { DatabaseService } from '../../core/database/database.service';
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
    ],
    providers: [AuthService, DatabaseService],
})
export class AuthModule {}
