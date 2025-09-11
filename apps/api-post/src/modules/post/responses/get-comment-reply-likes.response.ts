import { ApiProperty } from "@nestjs/swagger";
import { PublicUserLiteDto } from "../dto/public-user-lite.dto";

export class GetCommentReplyLikesResponse {
  @ApiProperty({ description: 'Whether the operation succeeded.', example: true })
  success: boolean;

  @ApiProperty({ description: 'ID of the reply.', example: 'rpl_1a2b3c4d-5e6f-7a8b-9c0d-0123456789ab' })
  replyId: string;

  @ApiProperty({ description: 'Total number of likes.', example: 2, minimum: 0 })
  total: number;

  @ApiProperty({ type: [PublicUserLiteDto], description: 'Users who liked the reply.' })
  users: PublicUserLiteDto[];
}