import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class PublicPostMediaDto {
  @ApiProperty({ description: 'Media ID.' })
  id: string;

  @ApiProperty({ description: 'Media type.', enum: ['IMAGE', 'VIDEO', 'GIF', 'OTHER'] })
  type: 'IMAGE' | 'VIDEO' | 'GIF' | 'OTHER';

  @ApiPropertyOptional({ description: 'Public/CDN URL for this media.' })
  url?: string;

  @ApiProperty({ description: 'Order within the post (0..n).', minimum: 0 })
  position: number;

  @ApiPropertyOptional({ description: 'Width in pixels (if image/video).' })
  width?: number;

  @ApiPropertyOptional({ description: 'Height in pixels (if image/video).' })
  height?: number;

  @ApiPropertyOptional({ description: 'Duration in milliseconds (if video/gif).' })
  durationMs?: number;
}