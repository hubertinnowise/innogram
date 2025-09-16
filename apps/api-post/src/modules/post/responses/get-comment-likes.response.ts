import { ApiProperty } from "@nestjs/swagger";
import { PublicUserLiteDto } from "../dto/public-user-lite.dto";

export class GetCommentLikesResponse {
  @ApiProperty({ description: 'Whether the operation succeeded.', example: true })
  success: boolean;

  @ApiProperty({ description: 'ID of the comment.', example: 'cmt_2d4e6f8a-0b1c-3d5e-7f9a-0123456789ab' })
  commentId: string;

  @ApiProperty({ description: 'Total number of likes.', example: 5, minimum: 0 })
  total: number;

  @ApiProperty({ description: 'Current page number.', example: 1, minimum: 1 })
  page: number;

  @ApiProperty({ description: 'Number of items per page.', example: 20, minimum: 1 })
  limit: number;

  @ApiProperty({ description: 'Total number of pages.', example: 1, minimum: 0 })
  totalPages: number;

  @ApiProperty({ type: [PublicUserLiteDto], description: 'Users who liked the comment.' })
  users: PublicUserLiteDto[];
}