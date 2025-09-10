import { ApiProperty } from '@nestjs/swagger';

export class LikePostResponse {
  @ApiProperty({ example: true })
  success!: boolean;

  @ApiProperty({ example: 'Post liked.' })
  message!: string;

  @ApiProperty({ example: 'post-uuid-1234' })
  postId!: string;

  @ApiProperty({ example: 'user-uuid-5678' })
  userId!: string;

  @ApiProperty({ example: 42, description: 'Current number of likes for the post' })
  likesCount!: number;
}
