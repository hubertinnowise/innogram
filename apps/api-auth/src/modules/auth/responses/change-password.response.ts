import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordResponse {
    @ApiProperty({ example: 'Password changed' })
    message: string;
}
