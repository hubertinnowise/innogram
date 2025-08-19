import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import { ConfigService } from './config.service';
import { EnvSchema } from './config.validation';

@Global()
@Module({
  exports: [ConfigService],
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true, 
      validate: (env) => EnvSchema.parse(env),
    }),
  ],
  providers: [ConfigService],
})
export class ConfigModule {}
