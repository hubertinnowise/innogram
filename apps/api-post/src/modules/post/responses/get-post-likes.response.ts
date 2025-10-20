import { ApiProperty } from '@nestjs/swagger';
import { PublicUserLiteDto } from '../dto/public-user-lite.dto';

export class GetPostLikesResponse {
    @ApiProperty({ description: 'Whether the operation succeeded.', example: true })
    success: boolean;

    @ApiProperty({ description: 'ID of the post.', example: 'post_7b3f5c9e-1a2b-4c6d-8e9f-0123456789ab' })
    postId: string;

    @ApiProperty({ description: 'Total number of likes.', example: 3, minimum: 0 })
    total: number;

    @ApiProperty({ description: 'Current page number.', example: 1, minimum: 1 })
    page: number;

    @ApiProperty({ description: 'Number of items per page.', example: 20, minimum: 1 })
    limit: number;

    @ApiProperty({ description: 'Total number of pages.', example: 1, minimum: 0 })
    totalPages: number;

    @ApiProperty({ type: [PublicUserLiteDto], description: 'Users who liked the post.' })
    users: PublicUserLiteDto[];
}
