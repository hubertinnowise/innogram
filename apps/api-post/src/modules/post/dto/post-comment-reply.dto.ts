import { ApiProperty } from '@nestjs/swagger';

export class PostCommentReplyDto {
    @ApiProperty({ description: 'Reply ID.', example: 'rpl_1a2b3c4d-5e6f-7a8b-9c0d-0123456789ab' })
    id: string;

    @ApiProperty({ description: 'Parent comment ID.', example: 'cmt_2d4e6f8a-0b1c-3d5e-7f9a-0123456789ab' })
    commentId: string;

    @ApiProperty({ description: 'Author (user) ID.', example: 'usr_1c2b3a4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d' })
    authorId: string;

    @ApiProperty({ description: 'Reply content.', example: 'Totally agree.' })
    content: string;

    @ApiProperty({ description: 'Number of likes on this reply.', example: 2, minimum: 0 })
    likesCount: number;

    @ApiProperty({ description: 'When the reply was created.' })
    createdAt: Date;

    @ApiProperty({ description: 'When the reply was last updated.' })
    updatedAt: Date;
}
