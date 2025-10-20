import { ApiProperty } from '@nestjs/swagger';

export class RegisterResponse {
    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp...' })
    accessToken: string;

    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp...' })
    refreshToken: string;

    @ApiProperty({ example: 'e7f4b4b0-1a2b-4c3d-9e8f-0123456789ab' })
    userId: string;
}
