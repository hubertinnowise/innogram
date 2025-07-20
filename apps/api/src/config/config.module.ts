import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import { ConfigService } from './config.service';
import { envSchema } from './config.validation';

@Global()
@Module({
    exports: [ConfigService],
    imports: [
        NestConfigModule.forRoot({
            validate: (env) => envSchema.parse(env),
        }),
    ],
    providers: [ConfigService],
})
export class ConfigModule {}
