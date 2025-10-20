import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordResponse {
    @ApiProperty({ example: 'Password updated' })
    message: string;
}
