import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, MaxLength, MinLength, ValidateNested } from 'class-validator';
import { CreatePostMediaDto } from './create-post-media.dto';

export class EditPostDto {
  @ApiPropertyOptional({
    description: 'New content; if omitted, content is unchanged.',
    minLength: 1,
    maxLength: 10000,
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(10000)
  content?: string;

  @ApiPropertyOptional({
    type: [CreatePostMediaDto],
    description: 'If provided, **replaces** all existing media for the post.',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMediaDto)
  media?: CreatePostMediaDto[];

  @ApiPropertyOptional({
    description: 'Replace the current category with this value.',
    example: 'photography',
    maxLength: 64,
  })
  @IsOptional()
  @IsString()
  @MaxLength(64)
  category?: string;
}