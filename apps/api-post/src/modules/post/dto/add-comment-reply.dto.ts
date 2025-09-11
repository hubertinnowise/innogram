import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class AddCommentReplyDto {
  @ApiProperty({ description: 'Reply content.', example: 'Thanks for the clarification!' })
  @IsString()
  @MinLength(1)
  content: string;
}