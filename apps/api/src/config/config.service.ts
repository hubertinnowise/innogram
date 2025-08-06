import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

import { EnvSchema } from './config.validation';

@Injectable()
export class ConfigService {
    constructor(private configService: NestConfigService<EnvSchema, true>) {}

    get<T extends keyof EnvSchema>(key: T) {
        return this.configService.get(key, { infer: true });
    }
}
