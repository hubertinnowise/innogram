import { ApiProperty } from '@nestjs/swagger';

export class UnblockUserResponse {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'User unblocked.' })
  message: string;

  @ApiProperty({ example: 'blocker-uuid' })
  blockerId: string;

  @ApiProperty({ example: 'blocked-uuid' })
  blockedId: string;
}