import { ApiProperty } from '@nestjs/swagger';

export class UnblockUserResponse {
    @ApiProperty({ example: 'blocked-uuid' })
    blockedId: string;

    @ApiProperty({ example: 'blocker-uuid' })
    blockerId: string;

    @ApiProperty({ example: 'User unblocked.' })
    message: string;

    @ApiProperty({ example: true })
    success: boolean;
}
