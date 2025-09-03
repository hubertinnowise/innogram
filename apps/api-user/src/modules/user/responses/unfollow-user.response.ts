import { ApiProperty } from '@nestjs/swagger';

export class UnfollowUserResponse {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Unfollowed successfully.' })
  message: string;

  @ApiProperty({ example: '7f7e2b7a-1234-4a0b-9b8d-4b0f5e4f3a12' })
  followerId: string;

  @ApiProperty({ example: '2a2f4f4f-4321-40a9-8a8c-0b4ddf1cd001' })
  targetUserId: string;
}
