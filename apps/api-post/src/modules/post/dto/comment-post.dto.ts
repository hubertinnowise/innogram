import { IsString, Length, IsUUID } from 'class-validator';

export class CommentPostDto {
    @IsUUID('4')
    userId!: string;

    @IsString()
    @Length(1, 2000)
    content!: string;
}
