import { ApiProperty } from '@nestjs/swagger';

export class UnfollowUserResponse {
    @ApiProperty({ example: 'follower-uuid' })
    followerId: string;

    @ApiProperty({ example: 'Unfollowed successfully.' })
    message: string;

    @ApiProperty({ example: true })
    success: boolean;

    @ApiProperty({ example: 'target-user-uuid' })
    targetUserId: string;
}
