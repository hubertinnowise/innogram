import { ApiProperty } from '@nestjs/swagger';

export class VerifyEmailResponse {
    @ApiProperty({ example: 'Email verified' })
    message: string;
}
