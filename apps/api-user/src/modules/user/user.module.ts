import { Module } from '@nestjs/common';

import { DatabaseService } from '../../core/database/database.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  exports: [UserService],
  providers: [UserService, DatabaseService],
})
export class UserModule {}