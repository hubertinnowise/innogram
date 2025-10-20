import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PublicPostMediaDto } from './public-post-media.dto';

export class PublicPostDto {
    @ApiProperty({ description: 'Post ID.' })
    id: string;

    @ApiProperty({ description: 'Author (user) ID.' })
    authorId: string;

    @ApiProperty({ description: 'Post content.' })
    content: string;

    @ApiProperty({ type: [PublicPostMediaDto], description: 'Ordered media items.' })
    media: PublicPostMediaDto[];

    @ApiProperty({ description: 'Number of likes.', minimum: 0 })
    likesCount: number;

    @ApiProperty({ description: 'Number of comments.', minimum: 0 })
    commentsCount: number;

    @ApiProperty({ description: 'Creation timestamp.' })
    createdAt: Date;

    @ApiProperty({ description: 'Last update timestamp.' })
    updatedAt: Date;

    @ApiPropertyOptional({
        description: 'Single category label (<= 64 chars).',
        example: 'photography',
        maxLength: 64,
    })
    category?: string;
}
