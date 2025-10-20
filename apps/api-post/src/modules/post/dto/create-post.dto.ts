import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, MaxLength, MinLength, ValidateNested } from 'class-validator';
import { CreatePostMediaDto } from './create-post-media.dto';

export class CreatePostDto {
    @ApiProperty({
        description: 'Post content.',
        minLength: 1,
        maxLength: 10000,
        example: 'Hello world!',
    })
    @IsString()
    @MinLength(1)
    @MaxLength(10000)
    content: string;

    @ApiPropertyOptional({
        type: [CreatePostMediaDto],
        description: 'Optional media list; order is determined by index.',
    })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreatePostMediaDto)
    media?: CreatePostMediaDto[];

    @ApiPropertyOptional({
        description: 'Single category label (<= 64 chars).',
        example: 'photography',
        maxLength: 64,
    })
    @IsOptional()
    @IsString()
    @MaxLength(64)
    category?: string;
}
