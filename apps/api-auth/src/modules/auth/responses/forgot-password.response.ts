import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordResponse {
  @ApiProperty({ example: 'Password reset token generated' })
  message: string;

  @ApiProperty({ example: '9b4d5f5e-2a88-4f6d-9f5e-1c2a3b4d5e6f' })
  token: string;
}
