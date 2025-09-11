import { ApiProperty } from "@nestjs/swagger";
import { PostCommentReplyDto } from "../dto/post-comment-reply.dto";

export class GetPostCommentRepliesResponse {
  @ApiProperty({ description: 'Whether the operation succeeded.', example: true })
  success: boolean;

  @ApiProperty({ description: 'ID of the post the replies belong to.', example: 'post_7b3f5c9e-1a2b-4c6d-8e9f-0123456789ab' })
  postId: string;

  @ApiProperty({ description: 'ID of the parent comment.', example: 'cmt_2d4e6f8a-0b1c-3d5e-7f9a-0123456789ab' })
  commentId: string;

  @ApiProperty({ description: 'Total number of replies returned.', example: 4, minimum: 0 })
  total: number;

  @ApiProperty({ type: [PostCommentReplyDto], description: 'List of replies for the comment.' })
  replies: PostCommentReplyDto[];
}