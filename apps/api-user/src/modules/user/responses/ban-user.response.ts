import { ApiProperty } from '@nestjs/swagger';

export class BanUserResponse {
    @ApiProperty({ example: 'admin-uuid' })
    adminId: string;

    @ApiProperty({ example: 'User banned.' })
    message: string;

    @ApiProperty({ example: true })
    success: boolean;

    @ApiProperty({ example: 'banned-user-uuid' })
    userId: string;
}
