import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { PostMediaType } from '@prisma/client';

export class CreatePostMediaDto {
  @ApiProperty({ enum: PostMediaType, enumName: 'PostMediaType' })
  @IsEnum(PostMediaType)
  type: PostMediaType;

  @ApiProperty({ description: 'Storage bucket (defaults to "posts").', example: 'posts', required: false })
  @IsOptional()
  @IsString()
  bucket?: string;

  @ApiProperty({ description: 'Object key within the bucket.', example: '2025/09/11/uuid/original.jpg' })
  @IsString()
  @IsNotEmpty()
  objectKey: string;

  @ApiPropertyOptional({ description: 'Optional public/CDN URL if resolved at write time.' })
  @IsOptional()
  @IsString()
  url?: string;

  @ApiPropertyOptional({ description: 'Ordering within the post (0..n).', minimum: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  position?: number;

  @ApiPropertyOptional() @IsOptional() width?: number;
  @ApiPropertyOptional() @IsOptional() height?: number;
  @ApiPropertyOptional() @IsOptional() durationMs?: number;
}
