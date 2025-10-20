import { CoreModule } from '@core/core.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            expandVariables: true,
            isGlobal: true,
        }),
        AuthModule,
        CoreModule,
    ],
})
export class AppModule {}
