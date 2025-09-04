import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserResponse {
  @ApiProperty({ example: 'clz123abc456', description: 'Unique identifier of the user' })
  id: string;

  @ApiProperty({ example: 'user@example.com', description: 'Email address of the user' })
  email: string;

  @ApiPropertyOptional({ example: 'johndoe', description: 'Username of the user (nullable)' })
  username: string | null;

  @ApiPropertyOptional({ example: '+48123123123', description: 'Phone number of the user (nullable)' })
  phoneNumber: string | null;

  @ApiPropertyOptional({ example: 'Love building stuff!', description: 'User biography (optional)' })
  bio?: string;

  @ApiProperty({ example: '2025-09-04T12:34:56.000Z', description: 'Date the user account was created' })
  createdAt: Date;

  @ApiProperty({ example: 42, description: 'Number of followers the user has' })
  followersCount: number;

  @ApiProperty({ example: 10, description: 'Number of users this user is following' })
  followingCount: number;
}