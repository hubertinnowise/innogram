import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RemoveCommentReplyResponse {
  @ApiProperty({ description: 'Whether the operation succeeded.', example: true })
  success: boolean;

  @ApiProperty({ description: 'Human-readable message.', example: 'Reply removed.' })
  message: string;

  @ApiPropertyOptional({ description: 'ID of the post.', example: 'post_7b3f5c9e-1a2b-4c6d-8e9f-0123456789ab' })
  postId?: string;

  @ApiPropertyOptional({ description: 'ID of the parent comment.', example: 'cmt_2d4e6f8a-0b1c-3d5e-7f9a-0123456789ab' })
  commentId?: string;

  @ApiPropertyOptional({ description: 'ID of the removed reply.', example: 'rpl_1a2b3c4d-5e6f-7a8b-9c0d-0123456789ab' })
  replyId?: string;

  @ApiPropertyOptional({ description: 'ID of the user who performed the removal.', example: 'usr_1c2b3a4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d' })
  userId?: string;

  @ApiPropertyOptional({ description: 'Replies remaining under the parent comment after removal.', example: 2, minimum: 0 })
  repliesCount?: number;
}