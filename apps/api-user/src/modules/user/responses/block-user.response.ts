import { ApiProperty } from '@nestjs/swagger';

export class BlockUserResponse {
    @ApiProperty({ example: 'blocked-uuid' })
    blockedId: string;

    @ApiProperty({ example: 'blocker-uuid' })
    blockerId: string;

    @ApiProperty({ example: 'User blocked.' })
    message: string;

    @ApiProperty({ example: true })
    success: boolean;
}
