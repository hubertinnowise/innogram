import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class VerifyEmailDto {
  @ApiProperty({
    description: 'Token sent to the user\'s email for verification',
    example: 'verify-email-token-xyz789',
  })
  @IsString()
  token!: string;
}
