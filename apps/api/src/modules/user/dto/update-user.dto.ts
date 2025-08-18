import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail, IsPhoneNumber } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'me@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: 'mmajew' })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional({ example: '+48 600 700 800' })
  @IsOptional()
  @IsPhoneNumber('PL')
  phoneNumber?: string;

  //ze no role change
}
