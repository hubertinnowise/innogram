import { ApiProperty } from "@nestjs/swagger";
import { PublicUserLiteDto } from "../dto/public-user-lite.dto";

export class GetCommentReplyLikesResponse {
  @ApiProperty({ description: 'Whether the operation succeeded.', example: true })
  success: boolean;

  @ApiProperty({ description: 'ID of the reply.', example: 'rpl_1a2b3c4d-5e6f-7a8b-9c0d-0123456789ab' })
  replyId: string;

  @ApiProperty({ description: 'Total number of likes.', example: 2, minimum: 0 })
  total: number;

  @ApiProperty({ description: 'Current page number.', example: 1, minimum: 1 })
  page: number;

  @ApiProperty({ description: 'Number of items per page.', example: 20, minimum: 1 })
  limit: number;

  @ApiProperty({ description: 'Total number of pages.', example: 1, minimum: 0 })
  totalPages: number;

  @ApiProperty({ type: [PublicUserLiteDto], description: 'Users who liked the reply.' })
  users: PublicUserLiteDto[];
}