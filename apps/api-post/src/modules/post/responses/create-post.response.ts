import { ApiProperty } from '@nestjs/swagger';
import { PublicPostDto } from '../dto/public-post.dto';

export class CreatePostResponse {
  @ApiProperty({ example: true }) success: boolean;
  @ApiProperty({ example: 'Post created.' }) message: string;
  @ApiProperty({ description: 'Created post ID.' }) postId: string;
  @ApiProperty({ type: PublicPostDto }) post: PublicPostDto;
}