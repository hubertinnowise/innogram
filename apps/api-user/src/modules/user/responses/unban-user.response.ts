import { ApiProperty } from '@nestjs/swagger';

export class UnbanUserResponse {
    @ApiProperty({ example: 'User unbanned.' })
    message: string;

    @ApiProperty({ example: true })
    success: boolean;

    @ApiProperty({ example: 'unbanned-user-uuid' })
    userId: string;
}
