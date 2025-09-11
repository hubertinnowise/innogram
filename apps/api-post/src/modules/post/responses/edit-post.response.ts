import { ApiProperty } from '@nestjs/swagger';
import { PublicPostDto } from '../dto/public-post.dto';

export class EditPostResponse {
  @ApiProperty({ example: true }) success: boolean;
  @ApiProperty({ example: 'Post updated.' }) message: string;
  @ApiProperty({ description: 'Post ID.' }) postId: string;
  @ApiProperty({ type: PublicPostDto }) post: PublicPostDto;
}
