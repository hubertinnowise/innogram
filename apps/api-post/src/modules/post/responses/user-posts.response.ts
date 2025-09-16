import { ApiProperty } from '@nestjs/swagger';
import { PublicPostDto } from '../dto/public-post.dto'; // assuming you already have this

export class UserPostResponse {
  @ApiProperty({ description: 'Whether the operation succeeded.', example: true })
  success: boolean;

  @ApiProperty({ description: 'ID of the author whose posts are returned.', example: 'b9c1b3f0-2a4d-4c6e-8f9a-1b2c3d4e5f6a' })
  userId: string;

  @ApiProperty({ description: 'Total number of posts returned.', example: 3, minimum: 0 })
  total: number;

  @ApiProperty({ description: 'Current page number.', example: 1, minimum: 1 })
  page: number;

  @ApiProperty({ description: 'Number of items per page.', example: 20, minimum: 1 })
  limit: number;

  @ApiProperty({ description: 'Total number of pages.', example: 1, minimum: 0 })
  totalPages: number;

  @ApiProperty({ type: [PublicPostDto], description: 'List of posts authored by the user.' })
  posts: PublicPostDto[];
}