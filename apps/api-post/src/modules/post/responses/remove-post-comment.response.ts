import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RemovePostCommentResponse {
  @ApiProperty({
    description: 'Indicates whether the operation succeeded.',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Human-readable status/message for the operation.',
    example: 'Comment removed.',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'ID of the post the comment belonged to.',
    example: '4c7c9b8e-2b2a-4e9b-9f0a-2c1b1f7f3c9a',
  })
  postId?: string;

  @ApiPropertyOptional({
    description: 'ID of the removed comment.',
    example: '9e1d5a7b-0c34-4f1e-9a9b-1d2c3b4a5f6e',
  })
  commentId?: string;

  @ApiPropertyOptional({
    description: 'ID of the user who performed the removal (comment author or post author).',
    example: '2a6f0b1c-7d8e-4b9f-9c0d-1e2f3a4b5c6d',
  })
  userId?: string;

  @ApiPropertyOptional({
    description: 'Current number of comments on the post after removal.',
    example: 4,
    minimum: 0,
  })
  commentsCount?: number;
}