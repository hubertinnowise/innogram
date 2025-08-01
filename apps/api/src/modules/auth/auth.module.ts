import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from './prisma/prisma.service';

@Module({
    controllers: [AuthController],
    exports: [PrismaService],
    providers: [AuthService, PrismaService]
})
export class AuthModule {}
