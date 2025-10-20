import { ApiProperty } from '@nestjs/swagger';
import { PostCommentDto } from '../dto';

export class GetPostCommentsResponse {
    @ApiProperty({ description: 'Whether the operation succeeded.', example: true })
    success: boolean;

    @ApiProperty({
        description: 'ID of the post the comments belong to.',
        example: 'post_4c7c9b8e-2b2a-4e9b-9f0a-2c1b1f7f3c9a',
    })
    postId: string;

    @ApiProperty({ description: 'Total number of comments returned.', example: 5, minimum: 0 })
    total: number;

    @ApiProperty({ description: 'Current page number.', example: 1, minimum: 1 })
    page: number;

    @ApiProperty({ description: 'Number of items per page.', example: 20, minimum: 1 })
    limit: number;

    @ApiProperty({ description: 'Total number of pages.', example: 1, minimum: 0 })
    totalPages: number;

    @ApiProperty({ type: [PostCommentDto], description: 'List of comments for the post.' })
    comments: PostCommentDto[];
}
