import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
    @ApiProperty({
        description: 'The email address used to log in',
        example: 'user@example.com',
    })
    @IsEmail()
    email!: string;

    @ApiProperty({
        description: 'The user’s account password',
        example: 'StrongPassword123',
    })
    @IsString()
    password!: string;
}
