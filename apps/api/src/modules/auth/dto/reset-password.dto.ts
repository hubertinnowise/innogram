import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
    @ApiProperty({
        description: 'The new password to set. Must be at least 6 characters long.',
        example: 'NewSecurePass123!',
        minLength: 6,
    })
    @IsString()
    @MinLength(6)
    newPassword!: string;

    @ApiProperty({
        description: 'Token received via email to authorize password reset',
        example: 'reset-token-abc123',
    })
    @IsString()
    token!: string;
}
