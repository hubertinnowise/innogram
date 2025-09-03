import { ApiProperty } from '@nestjs/swagger';

export class BlockUserResponse {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'User blocked.' })
  message: string;

  @ApiProperty({ example: 'blocker-uuid' })
  blockerId: string;

  @ApiProperty({ example: 'blocked-uuid' })
  blockedId: string;
}
