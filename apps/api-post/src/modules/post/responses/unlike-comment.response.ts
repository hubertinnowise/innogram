import { ApiProperty } from '@nestjs/swagger';

export class UnlikeCommentResponse {
    @ApiProperty({ description: 'Whether the operation succeeded.', example: true })
    success: boolean;

    @ApiProperty({ description: 'Human-readable message.', example: 'Comment unliked.' })
    message: string;

    @ApiProperty({ description: 'ID of the unliked comment.', example: 'c7c5b7f1-6a3b-4f0e-9b3c-2a1d9d2f5a0e' })
    commentId: string;

    @ApiProperty({
        description: 'ID of the user who performed the action.',
        example: '1c2b3a4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
    })
    userId: string;

    @ApiProperty({ description: 'Current number of likes on the comment.', example: 11, minimum: 0 })
    likesCount: number;
}
