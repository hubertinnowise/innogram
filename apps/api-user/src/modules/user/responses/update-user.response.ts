import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserResponse {
    @ApiPropertyOptional({ description: 'User biography (optional)', example: 'Love building stuff!' })
    bio?: string;

    @ApiProperty({ description: 'Date the user account was created', example: '2025-09-04T12:34:56.000Z' })
    createdAt: Date;

    @ApiProperty({ description: 'Email address of the user', example: 'user@example.com' })
    email: string;

    @ApiProperty({ description: 'Number of followers the user has', example: 42 })
    followersCount: number;

    @ApiProperty({ description: 'Number of users this user is following', example: 10 })
    followingCount: number;

    @ApiProperty({ description: 'Unique identifier of the user', example: 'clz123abc456' })
    id: string;

    @ApiPropertyOptional({ description: 'Phone number of the user (nullable)', example: '+48123123123' })
    phoneNumber: null | string;

    @ApiPropertyOptional({ description: 'Username of the user (nullable)', example: 'johndoe' })
    username: null | string;
}
