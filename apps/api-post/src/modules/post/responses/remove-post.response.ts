import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RemovePostResponse {
  @ApiProperty({ description: 'Whether the operation succeeded.', example: true })
  success: boolean;

  @ApiProperty({ description: 'Human-readable message.', example: 'Post removed.' })
  message: string;

  @ApiPropertyOptional({ description: 'ID of the removed post.', example: '7b3f5c9e-1a2b-4c6d-8e9f-0123456789ab' })
  postId?: string;

  @ApiPropertyOptional({ description: 'ID of the user who performed the removal.', example: '1c2b3a4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d' })
  userId?: string;

  @ApiPropertyOptional({ description: 'Timestamp when the post was soft-deleted.' })
  deletedAt?: Date;
}