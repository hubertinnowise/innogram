import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PublicPostDto } from '../dto';

export class GetPostResponse {
  @ApiProperty({
    description: 'Indicates whether the operation succeeded.',
    example: true,
  })
  success: boolean;

  @ApiPropertyOptional({
    description: 'The post data when found.',
    type: PublicPostDto,
  })
  post?: PublicPostDto;

  @ApiPropertyOptional({
    description: 'Message describing the result (e.g., when not found).',
    example: 'Post not found or deleted.',
  })
  message?: string;
}