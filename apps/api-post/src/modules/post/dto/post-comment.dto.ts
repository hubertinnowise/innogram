import { ApiProperty } from '@nestjs/swagger';

export class PostCommentDto {
    @ApiProperty({ description: 'Comment ID.', example: 'cmt_7f8a3be2-0c5d-4e2b-8a9e-1f2a3b4c5d6e' })
    id: string;

    @ApiProperty({ description: 'Author (user) ID.', example: 'usr_1c2b3a4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d' })
    authorId: string;

    @ApiProperty({ description: 'Comment content.', example: 'Nice post!' })
    content: string;

    @ApiProperty({ description: 'Number of likes on this comment.', example: 3, minimum: 0 })
    likesCount: number;

    @ApiProperty({ description: 'When the comment was created.' })
    createdAt: Date;

    @ApiProperty({ description: 'When the comment was last updated.' })
    updatedAt: Date;
}
