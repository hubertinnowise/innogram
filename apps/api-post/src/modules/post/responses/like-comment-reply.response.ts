import { ApiProperty } from '@nestjs/swagger';

export class LikeCommentReplyResponse {
    @ApiProperty({ description: 'Whether the operation succeeded.', example: true })
    success: boolean;

    @ApiProperty({ description: 'Human-readable message.', example: 'Reply liked.' })
    message: string;

    @ApiProperty({ description: 'ID of the liked reply.', example: 'a1b2c3d4-e5f6-47a8-9b0c-1d2e3f4a5b6c' })
    replyId: string;

    @ApiProperty({
        description: 'ID of the user who performed the action.',
        example: '1c2b3a4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
    })
    userId: string;

    @ApiProperty({ description: 'Current number of likes on the reply.', example: 5, minimum: 0 })
    likesCount: number;
}
