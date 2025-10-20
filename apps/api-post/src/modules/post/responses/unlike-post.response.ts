import { ApiProperty } from '@nestjs/swagger';

export class UnlikePostResponse {
    @ApiProperty({ example: true })
    success!: boolean;

    @ApiProperty({ example: 'Post unliked.' })
    message!: string;

    @ApiProperty({ example: 'post-uuid-1234' })
    postId!: string;

    @ApiProperty({ example: 'user-uuid-5678' })
    userId!: string;

    @ApiProperty({ example: 41, description: 'Current number of likes for the post' })
    likesCount!: number;
}
